// Utility to calculate Euclidean distance between two objects
export const calculateEuclideanDistance = (objA, objB, keys = ['x', 'y']) => {
  let sumSq = 0;
  for (const key of keys) {
    const valA = objA[key] !== undefined ? objA[key] : objA[key.replace('x', 'x1').replace('y', 'x2')];
    const valB = objB[key] !== undefined ? objB[key] : objB[key.replace('x', 'x1').replace('y', 'x2')];
    sumSq += Math.pow((valA || 0) - (valB || 0), 2);
  }
  return Math.sqrt(sumSq);
};

// Calculate distance based on specific metric
export const calculateDistanceByMetric = (objA, objB, metric, keys = ['x1', 'x2']) => {
  const dx1 = (objA[keys[0]] ?? 0) - (objB[keys[0]] ?? 0);
  const dx2 = (objA[keys[1]] ?? 0) - (objB[keys[1]] ?? 0);
  const absDx1 = Math.abs(dx1);
  const absDx2 = Math.abs(dx2);

  switch (metric) {
    case 'Euclidean':
      return Math.sqrt(dx1 * dx1 + dx2 * dx2);
    case 'Squared Euclidean':
      return dx1 * dx1 + dx2 * dx2;
    case 'Manhattan':
      return absDx1 + absDx2;
    case 'Chebyshev':
      return Math.max(absDx1, absDx2);
    case 'Power Distance':
      // Power distance with default p=2, r=1
      return Math.pow(Math.pow(absDx1, 2) + Math.pow(absDx2, 2), 1 / 1);
    default:
      return Math.sqrt(dx1 * dx1 + dx2 * dx2);
  }
};


// Main function to run Hierarchical Agglomerative Clustering
// objects: Array of { id, x, y }
// method: 'single' (nearest neighbor) or 'complete' (furthest neighbor)
export const runHierarchicalClustering = (objects, method = 'single') => {
  const N = objects.length;
  if (N === 0) return { steps: [], dendrogram: null };

  // Helper to deep copy matrices
  const copyMatrix = (m) => m.map(row => [...row]);

  // Initial step setup
  // We represent clusters as objects with:
  // - id: unique identifier (string)
  // - items: array of original object indices/IDs
  // - label: string label of the cluster (e.g., "(1,2)")
  // - dNode: reference to its node in the dendrogram tree
  let currentClusters = objects.map((obj, index) => ({
    id: `c_${obj.id}`,
    label: `${obj.id}`,
    items: [obj.id],
    dNode: {
      name: `${obj.id}`,
      id: `node_${obj.id}`,
      distance: 0,
      isLeaf: true,
      x: index,
      y: 0,
      children: null
    }
  }));

  // Initial distance matrix
  let initialMatrix = [];
  for (let i = 0; i < N; i++) {
    initialMatrix[i] = [];
    for (let j = 0; j < N; j++) {
      if (i === j) {
        initialMatrix[i][j] = 0;
      } else {
        initialMatrix[i][j] = calculateEuclideanDistance(objects[i], objects[j]);
      }
    }
  }

  const steps = [
    {
      stepNumber: 0,
      matrix: copyMatrix(initialMatrix),
      labels: currentClusters.map(c => c.label),
      merged: null,
      mergeDistance: 0,
      clusters: currentClusters.map(c => ({ label: c.label, items: [...c.items] }))
    }
  ];

  let activeMatrix = copyMatrix(initialMatrix);
  let activeClusters = [...currentClusters];

  // Run iterations (N - 1 merges)
  for (let step = 1; step < N; step++) {
    const K = activeClusters.length;
    let minDist = Infinity;
    let mergeI = -1;
    let mergeJ = -1;

    // Find the pair of clusters with the minimum distance
    for (let i = 0; i < K; i++) {
      for (let j = i + 1; j < K; j++) {
        const dist = activeMatrix[i][j];
        if (dist < minDist) {
          minDist = dist;
          mergeI = i;
          mergeJ = j;
        }
      }
    }

    if (mergeI === -1 || mergeJ === -1) break;

    const cI = activeClusters[mergeI];
    const cJ = activeClusters[mergeJ];

    // Create the merged cluster
    const mergedLabel = `(${cI.label},${cJ.label})`;
    const mergedItems = [...cI.items, ...cJ.items].sort((a, b) => a - b);
    
    // Create new dendrogram node
    const newDNode = {
      name: mergedLabel,
      id: `node_step_${step}`,
      distance: minDist,
      isLeaf: false,
      children: [cI.dNode, cJ.dNode]
    };

    const newCluster = {
      id: `c_merge_${step}`,
      label: mergedLabel,
      items: mergedItems,
      dNode: newDNode
    };

    // Calculate new distance matrix row/col
    const nextClusters = [];
    const nextMatrix = [];

    // Push the unchanged clusters (except i and j) and then the new merged cluster
    for (let k = 0; k < K; k++) {
      if (k !== mergeI && k !== mergeJ) {
        nextClusters.push(activeClusters[k]);
      }
    }
    nextClusters.push(newCluster);

    const nextK = nextClusters.length;
    for (let r = 0; r < nextK; r++) {
      nextMatrix[r] = [];
      for (let c = 0; c < nextK; c++) {
        if (r === c) {
          nextMatrix[r][c] = 0;
        } else {
          // If either is the new merged cluster (index nextK - 1)
          const isRMerged = (r === nextK - 1);
          const isCMerged = (c === nextK - 1);

          if (isRMerged || isCMerged) {
            // Find the other cluster index
            const otherIdx = isRMerged ? c : r;
            const otherCluster = nextClusters[otherIdx];

            // Get indices of merged components in activeClusters
            // Calculate distance between otherCluster and (cI and cJ)
            const distI = activeMatrix[activeClusters.indexOf(cI)][activeClusters.indexOf(otherCluster)];
            const distJ = activeMatrix[activeClusters.indexOf(cJ)][activeClusters.indexOf(otherCluster)];

            if (method === 'single') {
              // Minimum distance (nearest neighbor)
              nextMatrix[r][c] = Math.min(distI, distJ);
            } else {
              // Maximum distance (furthest neighbor)
              nextMatrix[r][c] = Math.max(distI, distJ);
            }
          } else {
            // Both are original remaining clusters
            const origR = activeClusters.indexOf(nextClusters[r]);
            const origC = activeClusters.indexOf(nextClusters[c]);
            nextMatrix[r][c] = activeMatrix[origR][origC];
          }
        }
      }
    }

    // Save this step
    steps.push({
      stepNumber: step,
      matrix: copyMatrix(nextMatrix),
      labels: nextClusters.map(c => c.label),
      merged: [cI.label, cJ.label],
      mergeDistance: minDist,
      clusters: nextClusters.map(c => ({ label: c.label, items: [...c.items] }))
    });

    activeClusters = nextClusters;
    activeMatrix = nextMatrix;
  }

  // The final remaining cluster contains the full dendrogram
  const dendrogram = activeClusters[0]?.dNode || null;

  return { steps, dendrogram };
};
