import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { getItem, putItem, deleteItem, queryItems } from '../../service/dbClient'
import { mockItem } from '../constants/item'

const db = new DocumentClient();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('getItem', () => {
  test('should return item', async () => {
    const response = await getItem(mockItem.EventDate)
    expect(db.get.mock.calls[0][0]).toHaveProperty('Key', { UserId: mockItem.UserId, EventDate: mockItem.EventDate })
    expect(response.status).toEqual(200)
    expect(response.data).toEqual(mockItem)
  })

  test('should return 404 if does not exist', async () => {
    const response = await getItem('abc')

    expect(db.get.mock.calls[0][0]).toHaveProperty('Key', { UserId: '1', EventDate: 'abc' })
    expect(response.status).toEqual(400)
    expect(response.data).toEqual('ValidationException')
  })
})

describe('putItem', () => {
  test('should create item', async () => {
    const response = await putItem(mockItem)

    expect(db.put.mock.calls[0][0]).toHaveProperty('Item', mockItem)
    expect(response.status).toEqual(201)
    expect(response.data).toEqual(mockItem)
  })
})

describe('deleteItem', () => {
  test('should delete item', async () => {
    const response = await deleteItem(mockItem.EventDate)

    expect(db.delete.mock.calls[0][0]).toHaveProperty('Key', { UserId: mockItem.UserId, EventDate: mockItem.EventDate })
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