import "fake-indexeddb/auto";

import { IDBStorage } from "../../modules/IDBStorage"

describe('IndexedDB Tests', () => {
    test('On success new should return a handle to the connection for a given store', async () => {
        const newConn = await IDBStorage.new('fakeName', 'fakeStore', ['fakeStore'], 1)

        expect(!!newConn.conn).toBeTruthy()
        expect(newConn.databaseName).toEqual('fakeName')
    })

    test('Set should add a value to the store and it should be retrievable with its key', async () => {
        const newConn = await IDBStorage.new('fakeName', 'fakeStore', ['fakeStore'], 1)
        await newConn.set(1, 'fakeValue')
        const keyExists = await newConn.has(1)
        const valueFromDB = await newConn.get(1)
        expect(keyExists).toBeTruthy()
        expect(valueFromDB).toEqual('fakeValue')
    })

    test('Delete should remove 1 value from a store', async () => {
        const newConn = await IDBStorage.new('fakeName', 'fakeStore', ['fakeStore'], 1)
        await newConn.set(1, 'fakeValue')
        await newConn.set(2, 'fakeValue2')
        let key1Exists = await newConn.has(1)
        let key2Exists = await newConn.has(2)
        expect(key1Exists).toBeTruthy()
        expect(key2Exists).toBeTruthy()
        await newConn.delete(2)
        key1Exists = await newConn.has(1)
        key2Exists = await newConn.has(2)
        expect(key1Exists).toBeTruthy()
        expect(key2Exists).toBeFalsy()
    })

    test('Clear should remove all values from a store', async () => {
        const newConn = await IDBStorage.new('fakeName', 'fakeStore', ['fakeStore'], 1)
        await newConn.set(1, 'fakeValue')
        await newConn.set(2, 'fakeValue2')
        let key1Exists = await newConn.has(1)
        let key2Exists = await newConn.has(2)
        expect(key1Exists).toBeTruthy()
        expect(key2Exists).toBeTruthy()
        await newConn.clear()
        key1Exists = await newConn.has(1)
        key2Exists = await newConn.has(2)
        expect(key1Exists).toBeFalsy()
        expect(key2Exists).toBeFalsy()
    })


    test('Failure to connect should throw an error', async () => {
        const originalImp = indexedDB.open
        indexedDB.open = jest.fn(() => { throw new Error() });
        try {
            const newConn = await IDBStorage.new('fakeName', 'fakeStore', ['fakeStore'], 1)
        } catch (error) {
            expect(error.message).toEqual('Failed to connect to IndexedDB Database')
        } finally {
            indexedDB.open = originalImp
        }
    })

    test('Errors on setting should be thrown', async () => {
        const newConn = await IDBStorage.new('fakeName', 'fakeStore', ['fakeStore'], 1)
        await expect(newConn.set(NaN, 'test')).rejects.toThrow(Error);
        await expect(newConn.has(NaN)).rejects.toThrow(Error);
        await expect(newConn.get(NaN)).rejects.toThrow(Error);
    })
})