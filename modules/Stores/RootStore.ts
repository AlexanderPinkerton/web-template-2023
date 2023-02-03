import { ErrorStore } from "./ErrorStore"
import { StoreUtils } from "./StoreUtils";

export class RootStore {
    storeUtils: StoreUtils;
    errorStore: ErrorStore;

    constructor() {
        this.storeUtils = new StoreUtils(this)
        this.errorStore = new ErrorStore()
    }

}
