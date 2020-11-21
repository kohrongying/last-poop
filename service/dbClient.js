import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const USER_ID = '1'

const db = new DocumentClient({
  apiVersion: '2012-08-10',
  region: 'ap-southeast-1',
  credentials: {
    accessKeyId: process.env.AWS_LP_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_LP_SECRET_ACCESS_KEY
  }
})

const TABLE_NAME = process.env.AWS_DDB_TABLE_NAME

export const getItem = async (eventDate) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { 
      'UserId': USER_ID,
      'EventDate': eventDate
    }
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
    Item: item,
  }
  return db.put(params).promise()
    .then(() => {
      return { data: item, status: 201 }
    })
    .catch(err => {
      return { data: err.code, status: 400 }
    })
}

export const deleteItem = async (eventDate) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { 
      'UserId': USER_ID,
      'EventDate': eventDate
    }
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
      ':user': USER_ID
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