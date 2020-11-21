const getFn = jest.fn().mockImplementation((request) => ({
  promise: jest.fn().mockImplementation(() => {
    if (request.Key.ItemId === '1') {
      return Promise.resolve({ Item: mockItem })
    } else {
      return Promise.reject({ statusCode: 400, code: 'ValidationException'})
    }
  })
})) 


const putFn = jest.fn().mockImplementation(() => ({ promise: awsSdkPromiseResponse }));

const deleteFn = jest.fn().mockImplementation(() => ({ promise: awsSdkPromiseResponse }));

export class DocumentClient {
  get = getFn 
  put = putFn;
  delete = deleteFn;
}