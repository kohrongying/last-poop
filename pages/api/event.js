// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import ddb from 'aws-sdk/clients/dynamodb';

const client = new ddb({
  apiVersion: '2012-08-10',
  region: 'ap-southeast-1',
  credentials: {
    accessKeyId: process.env.AWS_LP_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_LP_SECRET_ACCESS_KEY
  }
})

const TABLE_NAME = process.env.AWS_DDB_TABLE_NAME

const get_items = (req, res) => {
  const params = {
    TableName: TABLE_NAME,
    ExpressionAttributeValues: {
      ':topic' : {S: 'poop'}
    },
    FilterExpression: 'contains (EventType, :topic)',
  }
  client.scan(params, (err, data) => {
    if (err) {
      res.statusCode = 404
      res.json({ name: 'not found' })
    } else {
      res.statusCode = 200
      res.json({ data: data.Items })
    }
  })
}

export default (req, res) => {
  switch (req.method) {
    case 'GET': {
      get_items(req,res)
    }
  }
  
  
}
