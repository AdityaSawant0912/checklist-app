import React, { createContext, useReducer } from 'react';

export const WorkflowsContext = createContext();
export const WorkflowProvider = ({ children }) => {
  //Initial State and Actions
  const initialState = {
    workflows: [],
  };

  const actions = {
    ADD_WORKFLOW_ITEMS: 'ADD_WORKFLOW_ITEMS',
    UPDATE_WORKFLOW_ITEM: 'UPDATE_WORKFLOW_ITEM',
    REMOVE_WORKFLOW_ITEM: 'REMOVE_WORKFLOW_ITEM',
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case actions.ADD_WORKFLOW_ITEMS:
        if (action.replace) {
          return {
            workflows: [...action.workflows],
          };
        }
        return {
          workflows: [...state.workflows, ...action.workflows],
        };
      case actions.REMOVE_WORKFLOW_ITEM: {
        const filteredWorkflows = state.workflows.filter(
          (workflow) => workflow._id !== action.workflowId
        );
        return { workflows: filteredWorkflows };
      }
      case actions.UPDATE_WORKFLOW_ITEM: {
        const updatedWorkflows = state.workflows.map((workflow) =>
          workflow._id === action.workflow._id
            ? { ...action.workflow }
            : workflow
        );
        return { workflows: updatedWorkflows };
      }
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = {
    workflows: state.workflows,
    addWorkflows: (workflows, replace = false) => {
      dispatch({ type: actions.ADD_WORKFLOW_ITEMS, workflows, replace });
    },
    updateWorkflow: (workflow) => {
      dispatch({ type: actions.UPDATE_WORKFLOW_ITEM, workflow });
    },
    removeWorkflow: (workflow) => {
      dispatch({
        type: actions.REMOVE_WORKFLOW_ITEM,
        workflowId: workflow._id,
      });
    },
  };

  return (
    <WorkflowsContext.Provider value={value}>
      {children}
    </WorkflowsContext.Provider>
  );
};
