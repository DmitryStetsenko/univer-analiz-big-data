import { create } from 'zustand';
import { datasets } from '../data/datasets';
import { runHierarchicalClustering } from '../utils/clustering';

export const useStore = create((set, get) => {
  // Run initial clustering for Lab 2 and 3 so steps are cached
  const initialLab2 = runHierarchicalClustering(datasets.labs2_3.objects, 'single');
  const initialLab3 = runHierarchicalClustering(datasets.labs2_3.objects, 'complete');

  return {
    // === Lab 1 State ===
    lab1Data: {
      task1: {
        objects: [...datasets.lab1.task1.objects],
        p: 2, // power distance parameters
        r: 1
      },
      task2: {
        objects: [...datasets.lab1.task2.objects]
      }
    },
    
    updateLab1Task1Object: (index, field, value) => {
      set((state) => {
        const nextObjects = [...state.lab1Data.task1.objects];
        nextObjects[index] = {
          ...nextObjects[index],
          [field]: parseFloat(value) || 0
        };
        return {
          lab1Data: {
            ...state.lab1Data,
            task1: {
              ...state.lab1Data.task1,
              objects: nextObjects
            }
          }
        };
      });
    },

    updateLab1Task1Params: (param, value) => {
      set((state) => ({
        lab1Data: {
          ...state.lab1Data,
          task1: {
            ...state.lab1Data.task1,
            [param]: parseFloat(value) || 1
          }
        }
      }));
    },

    updateLab1Task2Object: (index, field, value) => {
      set((state) => {
        const nextObjects = [...state.lab1Data.task2.objects];
        nextObjects[index] = {
          ...nextObjects[index],
          [field]: parseFloat(value) || 0
        };
        return {
          lab1Data: {
            ...state.lab1Data,
            task2: {
              ...state.lab1Data.task2,
              objects: nextObjects
            }
          }
        };
      });
    },

    // === Lab 2 & 3 State ===
    labsData: {
      objects: [...datasets.labs2_3.objects],
      singleLinkage: {
        steps: initialLab2.steps,
        dendrogram: initialLab2.dendrogram,
        currentStepIndex: 0
      },
      completeLinkage: {
        steps: initialLab3.steps,
        dendrogram: initialLab3.dendrogram,
        currentStepIndex: 0
      }
    },

    updateLabsObject: (index, field, value) => {
      set((state) => {
        const nextObjects = [...state.labsData.objects];
        nextObjects[index] = {
          ...nextObjects[index],
          [field]: parseFloat(value) || 0
        };

        // Recalculate clustering steps for both methods on data change
        const singleClustering = runHierarchicalClustering(nextObjects, 'single');
        const completeClustering = runHierarchicalClustering(nextObjects, 'complete');

        return {
          labsData: {
            objects: nextObjects,
            singleLinkage: {
              steps: singleClustering.steps,
              dendrogram: singleClustering.dendrogram,
              currentStepIndex: Math.min(state.labsData.singleLinkage.currentStepIndex, singleClustering.steps.length - 1)
            },
            completeLinkage: {
              steps: completeClustering.steps,
              dendrogram: completeClustering.dendrogram,
              currentStepIndex: Math.min(state.labsData.completeLinkage.currentStepIndex, completeClustering.steps.length - 1)
            }
          }
        };
      });
    },

    setStepIndex: (method, index) => {
      set((state) => {
        const target = method === 'single' ? 'singleLinkage' : 'completeLinkage';
        const stepsCount = state.labsData[target].steps.length;
        const validIndex = Math.max(0, Math.min(index, stepsCount - 1));
        
        return {
          labsData: {
            ...state.labsData,
            [target]: {
              ...state.labsData[target],
              currentStepIndex: validIndex
            }
          }
        };
      });
    },

    nextStep: (method) => {
      const target = method === 'single' ? 'singleLinkage' : 'completeLinkage';
      const currentIndex = get().labsData[target].currentStepIndex;
      get().setStepIndex(method, currentIndex + 1);
    },

    prevStep: (method) => {
      const target = method === 'single' ? 'singleLinkage' : 'completeLinkage';
      const currentIndex = get().labsData[target].currentStepIndex;
      get().setStepIndex(method, currentIndex - 1);
    }
  };
});
