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

export const getItem = async (itemId) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { 'ItemId': itemId}
  }
  return db.get(params).promise()
    .then(data => {
      return { data: data.Item, status: 200 }
    })
    .catch(err => {
      return { data: err.code, status: err.statusCode }
    })
}

export const putItem = async (item) => {
  const params = {
    TableName: TABLE_NAME,
    ...item,
  }
  return db.put(params).promise()
    .then(() => {
      return { data: item, status: 201 }
    })
    .catch(err => {
      return { data: err.code, status: err.statusCode }
    })
}