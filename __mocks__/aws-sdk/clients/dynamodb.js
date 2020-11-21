const mockItem = {
  ItemId: '1',
  DateTime: '2020-11-15T09:57:43.306Z',
  Event: 'poop'
}

const getFn = jest.fn().mockImplementation((request) => ({
  promise: jest.fn().mockImplementation(() => {
    if (request.Key.ItemId === '1') {
      return Promise.resolve({ Item: mockItem })
    } else {
      return Promise.reject({ statusCode: 400, code: 'ValidationException'})
    }
  })
})) 

const putFn = jest.fn().mockImplementation(() => ({
  promise: jest.fn().mockImplementation(() => {
    return Promise.resolve({})
  })
})) 


const deleteFn = jest.fn().mockImplementation(() => ({
  promise: jest.fn().mockImplementation(() => {
    return Promise.resolve({})
  })
}))

export class DocumentClient {
  get = getFn 
  put = putFn;
  delete = deleteFn;
}