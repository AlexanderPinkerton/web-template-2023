export class Storage {
    constructor(databaseName: string, storeName: string) {
        if (this.constructor === Storage) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    clear() {
        throw new Error("Method 'clear()' must be implemented.");
    }

    delete(key: any) {
        throw new Error("Method 'delete()' must be implemented.");
    }

    get(key: any) {
        throw new Error("Method 'get()' must be implemented.");
    }

    getAll() {
        throw new Error("Method 'getAll()' must be implemented")
    }

    getAllKeys() {
        throw new Error("Method 'getAllKeys()' must be implemented")
    }

    has(key: any) {
        throw new Error("Method 'has()' must be implemented.");
    }

    set(key: any, value: any) {
        throw new Error("Method 'set()' must be implemented.");
    }
}

export class IDBStorage extends Storage {
    conn: IDBDatabase
    databaseName: string
    storeName: string

    constructor(conn: IDBDatabase, databaseName: string, storeName: string) {
        super(databaseName, storeName)
        this.conn = conn
        this.databaseName = databaseName
        this.storeName = storeName
    }

    static async new(databaseName: string, storeName: string, storeNames: string[], version: number) {
        try {
            let conn: IDBDatabase = await new Promise((resolve, reject) => {
                const request = indexedDB.open(databaseName, version)
                request.onupgradeneeded = ((event: IDBVersionChangeEvent) => {
                    for (const name of storeNames) {
                        request.result.createObjectStore(name, { keyPath: "key" })
                    }
                })
                request.onsuccess = () => resolve(request.result)
                request.onerror = () => reject(request.error)
                request.onblocked = () => { console.log('blocked') }
            })

            return new IDBStorage(conn, databaseName, storeName)
        } catch (error) {
            throw new Error('Failed to connect to IndexedDB Database')
        }
    }

    async clear(): Promise<undefined> {
        return await new Promise((resolve, reject) => {
            const tx = this.conn.transaction(this.storeName, "readwrite")
            const store = tx.objectStore(this.storeName)
            const request = store.clear()
            request.onsuccess = () => resolve(request.result)
            request.onerror = () => reject(request.error)
        })
    }

    async delete(key: any): Promise<undefined> {
        return await new Promise((resolve, reject) => {
            const tx = this.conn.transaction(this.storeName, "readwrite")
            const store = tx.objectStore(this.storeName)
            const request = store.delete(key)
            request.onsuccess = () => resolve(request.result)
            request.onerror = () => reject(request.error)
        })
    }

    async get(key: any): Promise<any> {
        return await new Promise((resolve, reject) => {
            const tx = this.conn.transaction(this.storeName)
            const store = tx.objectStore(this.storeName)
            const request = store.get(key)
            request.onsuccess = () => {
                // get is not an error for not exists
                // TODO (oren): check if it's also not an error for delete etc
                if (request.result) {
                    resolve(request.result.value)
                } else {
                    resolve(request.result)
                }
            }
            request.onerror = () => reject(request.error)
        })
    }

    async getAll(): Promise<any> {
        return await new Promise((resolve, reject) => {
            const tx = this.conn.transaction(this.storeName)
            const store = tx.objectStore(this.storeName)
            const request = store.getAll()
            request.onsuccess = () => resolve(request.result)
            request.onerror = () => reject(request.error)
        })
    }

    async getAllKeys(): Promise<any> {
        return await new Promise((resolve, reject) => {
            const tx = this.conn.transaction(this.storeName)
            const store = tx.objectStore(this.storeName)
            const request = store.getAllKeys()
            request.onsuccess = () => resolve(request.result)
            request.onerror = () => reject(request.error)
        })
    }

    async has(key: any): Promise<boolean> {
        const count: number = await new Promise((resolve, reject) => {
            const tx = this.conn.transaction(this.storeName)
            const store = tx.objectStore(this.storeName)
            const request = store.count(key)
            request.onsuccess = () => resolve(request.result)
            request.onerror = () => reject(request.error)
        })
        // TODO: What if there is an error? In general need better error handling in this class
        return count > 0
    }

    async set(key: any, value: any) {
        return await new Promise((resolve, reject) => {
            const tx = this.conn.transaction(this.storeName, "readwrite")
            const store = tx.objectStore(this.storeName)
            const request = store.put({key,value})
            request.onsuccess = () => resolve(request.result)
            request.onerror = () => reject(request.error)
        })
    }
}