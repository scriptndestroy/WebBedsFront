import axios from "axios";
import { store } from "../../app/store";
import { UIActions } from "../../app/ui/ui.action";
import config from "../../config";

export default class ApiServices<T> {
  URL: string;

  constructor() {
    this.URL = config.webbeds_external;
  }

  setLoading() {
    store.dispatch(UIActions.loading());
  }

  clearLoading() {
    store.dispatch(UIActions.loadingClear());
  }

  onInit() {
    this.setLoading();
  }

  onFinish(result: any, noLoading?: boolean) {
    if (!noLoading) {
      this.clearLoading();
    }
    return result.data;
  }

  onFinishError(error: any, noLoading?: boolean) {
    if (!noLoading) {
      this.clearLoading();
    }
    store.dispatch(UIActions.alertError(error));
    throw error;
  }

  async search(filter: any) {    
    this.onInit();
    return axios
      .post<T>(`${this.URL}/search`, filter)
      .then((result) => {
        return this.onFinish(result);
      })
      .catch((error) => {
        return this.onFinishError(error);
      });
  }
}
