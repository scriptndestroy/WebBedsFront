export enum ActionTypes {
    LOADING = "LOADING",
    LOADING_CLEAR = "LOADING_CLEAR",
    ALERT_ERROR = "ALERT_ERROR",
    ALERT_CLEAR = "ALERT_CLEAR",
  }

  interface AlertErrorAction {
    type: ActionTypes.ALERT_ERROR;
    payload: any;
  }

  interface AlertClearAction {
    type: ActionTypes.ALERT_CLEAR;
    payload: any;
  }
  
  interface LoadingAction {
    type: ActionTypes.LOADING;
  }
  interface LoadingClearAction {
    type: ActionTypes.LOADING_CLEAR;
  }


  
  export type Actions = LoadingAction | LoadingClearAction | AlertErrorAction | AlertClearAction;
  
  const loading = () => {
    return { type: ActionTypes.LOADING, payload: "" };
  };
  
  const loadingClear = () => {
    return { type: ActionTypes.LOADING_CLEAR, payload: "" };
  };

  const alertError = (error: any): Actions => {
    let message = ""; 
    if (typeof error === 'string'){
      message = error;
    } else if(error.message){
      message = error.message;
    } 
    return { type: ActionTypes.ALERT_ERROR, payload: message };
  };

  const alertClear = () => {
    return { type: ActionTypes.ALERT_CLEAR };
  };
  
  export const UIActions = {
    loading,
    loadingClear,
    alertError,
    alertClear
  };
  