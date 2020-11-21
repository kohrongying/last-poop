import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const db = new DocumentClient({
  apiVersion: '2012-08-10',
  region: 'ap-southeast-1',
  credentials: {
    accessKeyId: process.env.AWS_LP_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_LP_SECRET_ACCESS_KEY
  }
})

const TABLE_NAME = process.env.AWS_DDB_TABLE_NAME

const RESPONSE = {
  NOT_FOUND: { data: 'NOT FOUND', status: 404 }
}

export const getItem = async (itemId) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { 'ItemId': itemId}
  }
  const response = await db.get(params).promise()
  if (response?.Item) {
    return { data: response.Item, status: 200 }
  }
  return RESPONSE.NOT_FOUND
}