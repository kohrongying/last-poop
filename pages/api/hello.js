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

export default (req, res) => {
  const params = {
    TableName: process.env.AWS_DDB_TABLE_NAME,
    ExpressionAttributeValues: {
      ':topic' : {S: 'poop'}
    },
    // ProjectionExpression: 'ItemId, EventType',
    FilterExpression: 'contains (EventType, :topic)',
  }
  client.scan(params, (err, data) => {
    if (err) {
      console.log(err)
      res.statusCode = 404
      res.json({ name: 'not found' })
    } else {
      res.statusCode = 200
      res.json({ data: data.Items })
    }
  })
  
}
