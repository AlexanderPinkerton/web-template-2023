import { RootStore } from "../../modules/Stores/RootStore"

// Mockout the hitAPI function and return a fake stream
jest.mock('../../modules/Utils.ts', () => {
    const actualModule = jest.requireActual('../../modules/Utils.ts');
    return {
        ...actualModule,
        hitAPI: jest.fn((endpoint) => {
            console.log("calling mock hitAPI @ ", endpoint)
            switch(endpoint){
                default:
                    console.warn("No mock implementation for endpoint found. Did you forget to add one???")
                    return []
            }
        }),
    }
})

describe('Root Store Tests', () => {

    test('Test nothing', async () => {
        let rs = new RootStore()
        expect(rs.storeUtils).toBeDefined()
    })

})
