import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { getItem, putItem, deleteItem, queryItems } from '../../service/dbClient'

const db = new DocumentClient();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('getItem', () => {
  test('should return item', async () => {
    const mockItem = {
      UserId: '1',
      CreatedAt: '2020-11-15T09:57:43.306Z',
      Event: 'poop'
    }

    const response = await getItem(mockItem.UserId)
    expect(db.get.mock.calls[0][0]).toHaveProperty('Key', { UserId: mockItem.UserId })
    expect(response.status).toEqual(200)
    expect(response.data).toEqual(mockItem)
  })

  test('should return 404 if does not exist', async () => {
    const response = await getItem('abc')

    expect(db.get.mock.calls[0][0]).toHaveProperty('Key', { UserId: 'abc' })
    expect(response.status).toEqual(400)
    expect(response.data).toEqual('ValidationException')
  })
})

describe('putItem', () => {
  test('should create item', async () => {
    const mockItem = {
      UserId: '12',
      CreatedAt: '2020-11-18T09:57:43.306Z',
      Event: 'poop'
    }
    const response = await putItem(mockItem)

    expect(db.put.mock.calls[0][0]).toHaveProperty('Item', mockItem)
    expect(response.status).toEqual(201)
    expect(response.data).toEqual(mockItem)
  })
})


describe('deleteItem', () => {
  test('should delete item', async () => {
    const mockItem = {
      UserId: '12',
      CreatedAt: '2020-11-18T09:57:43.306Z',
      Event: 'poop'
    }
    const response = await deleteItem(mockItem.UserId)

    expect(db.delete.mock.calls[0][0]).toHaveProperty('Key', { UserId: mockItem.UserId })
    expect(response.status).toEqual(204)
  })
})

describe('queryItems by month', () => {
  test('should return list of item', async () => {
    const startDate = '2020-11-01'
    const endDate = '2020-11-30'
    const response = await queryItems(startDate, endDate)

    expect(response.status).toEqual(200)
    expect(response.data.length).toEqual(2)
  })
})