import { ReadableStream } from "web-streams-polyfill/ponyfill";

import { TextEncoder, TextDecoder } from 'util'
//@ts-ignore
global.TextEncoder = TextEncoder
//@ts-ignore
global.TextDecoder = TextDecoder

import { insertBetween } from "../../modules/Utils";

export function iteratorToStream(iterator: Iterator<any>) {
    return new ReadableStream({
        async pull(controller) {
            const { value, done } = await iterator.next();
            if (done) {
                controller.close();
            } else {
                controller.enqueue(value);
            }
        },
    });
}

export function create_ndjson_stream(objects: Array<object>) {

    const txtEncoder = new TextEncoder()

    const data_objects = objects.map((obj) => {
        return txtEncoder.encode(JSON.stringify(obj))
    })

    const ndjson_data = insertBetween(txtEncoder.encode('\n'), data_objects)
    const fakeStream = iteratorToStream(ndjson_data.values())

    return fakeStream
}
