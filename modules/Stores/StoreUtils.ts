import { RootStore } from "../../modules/Stores/RootStore"
import { process_ndjson_stream } from "../../modules/Utils"
import { ALERT_SEVERITY } from "../../Enums"

export class StoreUtils {
    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }

    public async process_ndjson_stream_and_alert(stream: ReadableStream, proccessorFunc: Function): Promise<void> {
        const errorFunc = (error: string) => { this.rootStore.errorStore.addError(error, ALERT_SEVERITY.error, 5) }
        await process_ndjson_stream(stream, proccessorFunc, errorFunc)
    }
}