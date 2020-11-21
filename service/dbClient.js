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

export const getItem = async (UserId) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { 'UserId': UserId }
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

export const deleteItem = async (UserId) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { 'UserId': UserId }
  }
  return db.delete(params).promise()
    .then(() => {
      return { data: {}, status: 204 }
    })
    .catch(err => {
      return { data: err.code, status: err.statusCode }
    })
}

export const queryItems = async (startDate, endDate) => {
  const params = {
    TableName: TABLE_NAME,
    ExpressionAttributeValues: {
      ':start': startDate,
      ':end': endDate,
      ':user': 1
    },
    KeyConditionExpression: 'UserId = :user',
    FilterExpression: 'CreatedAt between :start and :end'
  }
  return db.query(params).promise()
    .then(data => {
      return { data: data.Items, status: 200 }
    })
    .catch(err => {
      return { data: err.code, status: err.statusCode }
    })
}