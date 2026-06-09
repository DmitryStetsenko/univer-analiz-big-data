import React, { useMemo } from 'react';
import { Typography, Tooltip } from 'antd';

const { Text } = Typography;

export const Dendrogram = ({ tree, width = 600, height = 300, method = 'single' }) => {
  const layoutData = useMemo(() => {
    if (!tree) return null;

    // Clone tree to avoid mutating state
    const root = JSON.parse(JSON.stringify(tree));

    // Post-order traversal to calculate x-coordinates of leaf nodes and internal nodes
    const assignCoordinates = (node, nextX = 0) => {
      if (node.isLeaf || !node.children) {
        node.x = nextX;
        node.y = 0;
        return nextX + 1;
      }

      let currentX = nextX;
      for (const child of node.children) {
        currentX = assignCoordinates(child, currentX);
      }

      node.x = (node.children[0].x + node.children[1].x) / 2;
      node.y = node.distance;
      return currentX;
    };

    assignCoordinates(root, 0);

    // Get limits to scale SVG coordinates
    let maxX = 0;
    let maxY = 0.0001; // Avoid divide by zero

    const findLimits = (node) => {
      if (node.x > maxX) maxX = node.x;
      if (node.y > maxY) maxY = node.y;
      if (node.children) {
        node.children.forEach(findLimits);
      }
    };
    findLimits(root);

    // Scaling factors with margins
    const padding = { top: 40, right: 40, bottom: 40, left: 65 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const scaleX = (x) => padding.left + (x / maxX) * chartWidth;
    // y = 0 is at the bottom, y = maxY is at the top
    const scaleY = (y) => height - padding.bottom - (y / maxY) * chartHeight;

    // Generate paths and node markers
    const lines = [];
    const nodes = [];
    const gridLines = [];

    // Add horizontal grid lines at specific ticks
    const tickCount = 5;
    for (let i = 0; i <= tickCount; i++) {
      const val = (maxY / tickCount) * i;
      gridLines.push({
        y: scaleY(val),
        value: val.toFixed(3)
      });
    }

    const collectDrawElements = (node) => {
      nodes.push({
        id: node.id,
        name: node.name,
        distance: node.distance,
        cx: scaleX(node.x),
        cy: scaleY(node.y),
        isLeaf: node.isLeaf
      });

      if (node.children && node.children.length === 2) {
        const left = node.children[0];
        const right = node.children[1];

        const parentX = scaleX(node.x);
        const parentY = scaleY(node.y);
        const leftX = scaleX(left.x);
        const leftY = scaleY(left.y);
        const rightX = scaleX(right.x);
        const rightY = scaleY(right.y);

        // Draw lines from children up to merge distance, then horizontal connection
        // 1. Left child vertical line to merge height
        lines.push({
          x1: leftX,
          y1: leftY,
          x2: leftX,
          y2: parentY,
          id: `v_left_${node.id}`
        });

        // 2. Right child vertical line to merge height
        lines.push({
          x1: rightX,
          y1: rightY,
          x2: rightX,
          y2: parentY,
          id: `v_right_${node.id}`
        });

        // 3. Horizontal connection at merge height
        lines.push({
          x1: leftX,
          y1: parentY,
          x2: rightX,
          y2: parentY,
          id: `h_${node.id}`,
          isMergeBar: true,
          distance: node.distance,
          name: node.name
        });

        collectDrawElements(left);
        collectDrawElements(right);
      }
    };

    collectDrawElements(root);

    return { lines, nodes, gridLines, padding, maxY };
  }, [tree, width, height]);

  if (!layoutData) {
    return <div style={{ textAlign: 'center', padding: 20 }}>Немає даних для дендрограми</div>;
  }

  const { lines, nodes, gridLines, padding, maxY } = layoutData;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#fafafa', padding: '16px', borderRadius: 8 }}>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <svg width={width} height={height} style={{ overflow: 'visible' }}>
          {/* Y Axis Grid Lines & Labels */}
          {gridLines.map((grid, idx) => (
            <g key={`grid-${idx}`}>
              <line
                x1={padding.left - 5}
                y1={grid.y}
                x2={width - padding.right}
                y2={grid.y}
                stroke="#f0f0f0"
                strokeWidth={1}
                strokeDasharray={idx === 0 ? "none" : "4 4"}
              />
              <text
                x={padding.left - 10}
                y={grid.y + 4}
                textAnchor="end"
                fontSize={11}
                fill="#8c8c8c"
                fontFamily="monospace"
              >
                {grid.value}
              </text>
            </g>
          ))}

          {/* Left Y-axis line */}
          <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={height - padding.bottom}
            stroke="#d9d9d9"
            strokeWidth={1}
          />
          
          {/* Label for Y-axis */}
          <text
            x={15}
            y={height / 2}
            transform={`rotate(-90 15 ${height / 2})`}
            textAnchor="middle"
            fontSize={12}
            fontWeight="bold"
            fill="#595959"
          >
            Відстань об'єднання
          </text>

          {/* Connecting Lines (Dendrogram Brackets) */}
          {lines.map((line) => (
            <line
              key={line.id}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={line.isMergeBar ? '#722ed1' : '#1890ff'}
              strokeWidth={line.isMergeBar ? 2.5 : 1.5}
            />
          ))}

          {/* Merge Nodes and Leaf Nodes */}
          {nodes.map((node) => {
            if (node.isLeaf) {
              return (
                <g key={node.id}>
                  {/* Leaf Node Circle */}
                  <circle
                    cx={node.cx}
                    cy={node.cy}
                    r={6}
                    fill="#1890ff"
                    stroke="#fff"
                    strokeWidth={1.5}
                  />
                  {/* Label below the leaf */}
                  <text
                    x={node.cx}
                    y={node.cy + 20}
                    textAnchor="middle"
                    fontSize={12}
                    fontWeight="bold"
                    fill="#1d2129"
                  >
                    {node.name}
                  </text>
                </g>
              );
            } else {
              return (
                <Tooltip
                  key={node.id}
                  title={`Кластер: ${node.name} (Відстань: ${node.distance.toFixed(4)})`}
                >
                  <g style={{ cursor: 'pointer' }}>
                    <circle
                      cx={node.cx}
                      cy={node.cy}
                      r={5}
                      fill="#722ed1"
                      stroke="#fff"
                      strokeWidth={1.5}
                    />
                  </g>
                </Tooltip>
              );
            }
          })}
        </svg>
      </div>
      <div style={{ marginTop: 16, textAlign: 'center' }}>
        <Text type="secondary" size="small">
          * Наведіть курсор на фіолетові вузли <span style={{ color: '#722ed1', fontWeight: 'bold' }}>●</span>, щоб переглянути інформацію про об'єднання кластерів.
        </Text>
      </div>
    </div>
  );
};
