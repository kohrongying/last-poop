import { DocumentClient, awsSdkPromiseResponse } from 'aws-sdk/clients/dynamodb';
import { getItem } from '../../service/dbClient'

const db = new DocumentClient();

describe('getItem', () => {
  test('should return item', async () => {
    const mockItem = {
      ItemId: '1',
      DateTime: '2020-11-15T09:57:43.306Z',
      Event: 'poop'
    }
    awsSdkPromiseResponse.mockReturnValueOnce({ Item: mockItem })
    const response = await getItem(mockItem.ItemId)
    expect(db.get).toHaveBeenCalledWith({ Key: { ItemId: mockItem.ItemId } })
    expect(response.status).toEqual(200)
    expect(response.data).toEqual(mockItem)
  })

  test('should return 404 if does not exist', async () => {
    awsSdkPromiseResponse.mockReturnValueOnce({})
    const response = await getItem('abc')
    expect(db.get).toHaveBeenCalledWith({ Key: { ItemId: 'abc' } })
    expect(response.status).toEqual(404)
  })
})