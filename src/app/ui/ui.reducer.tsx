import { Actions, ActionTypes } from "./ui.action";

export interface UIState {
  message: string;
  showLoading: boolean;
  showMessage: boolean;
  type?: "success" | "info" | "warning" | "error";
}

const initialState = {
  showLoading: false,
  showMessage: false,
  message: "",
};

export const uiReducer = (state: UIState = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.LOADING:
      return {
        ...state,
        showLoading: true,
      };
    case ActionTypes.LOADING_CLEAR:
      return {
        ...state,
        showLoading: false,
      };
      case ActionTypes.ALERT_ERROR:
      return {
        ...state,
        type: "error",
        message: action.payload,
        showMessage: true,
      };
    case ActionTypes.ALERT_CLEAR:
      return {
        ...state,
        showMessage: false,
      };
    default:
      return state;
  }
};
