export async function process_ndjson_stream(stream: ReadableStream, proccessorFunc: Function, errorFunc: Function = () => {}): Promise<void> {
    // Use the default stream reader 
    const reader = stream.getReader()
    // We need to use an async generator to consume the stream object by object
    let async_generator = ndjson_generator(reader)

    // Loop over the async generator and process each object
    for await (let jsObject of async_generator) {
        if (jsObject.error) {
            if (errorFunc !== undefined) {
                errorFunc(jsObject.error)
            }
            continue
        }
        proccessorFunc(jsObject)
    }

    // console.log('NDJSON stream fully processed');
}

export async function* ndjson_generator(reader: ReadableStreamDefaultReader): AsyncGenerator<any, void> {
    const matcher = /\r?\n/;
    const decoder = new TextDecoder();
    let buf = '';

    let next = reader.read();
    while (true) {
        const { done, value } = await next;

        if (done) {
            if (buf.length > 0) {
                yield JSON.parse(buf);
            }
            return;
        }

        const chunk = decoder.decode(value, { stream: true });
        // debug(`chunk=${chunk}`);
        buf += chunk;

        const parts = buf.split(matcher);
        buf = parts.pop()!;
        for (const i of parts) {
            yield JSON.parse(i);
        }

        next = reader.read();
    }
}

export function awaitableSleep(timeMS: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        }, timeMS)
    })
}

export const insertBetween = (ele: any, array: Array<any>) => {
    return array.flatMap((x) => [ele, x]).slice(1);
};

export function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
}

export function getFirstQueryVal(value: string | string[]) {
    return Array.isArray(value) ? value[0] : value
}