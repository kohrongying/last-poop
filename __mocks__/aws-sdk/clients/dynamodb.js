import { mockItem, mockItems } from '../../../tests/constants/item'

const getFn = jest.fn().mockImplementation((request) => ({
  promise: jest.fn().mockImplementation(() => {
    if (request.Key.EventDate === mockItem.EventDate) {
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

const queryFn = jest.fn().mockImplementation(() => ({
  promise: jest.fn().mockImplementation(() => {
    return Promise.resolve({ Items: mockItems })
  })
}))

export class DocumentClient {
  get = getFn 
  put = putFn;
  delete = deleteFn;
  query = queryFn;
}