import { getItem, putItem, deleteItem, queryItems } from '../../service/dbClient'

export default (req, res) => {
  switch (req.method) {
    case 'GET': {
      const startDate = req.query.startDate;
      const endDate = req.query.endDate
      queryItems(startDate, endDate)
        .then(response => {
          res.status(response.status).json(response.data)
        })
      break;
    }
    case 'POST': {
      putItem(req.body)
        .then(response => {
          res.status(response.status).json(response.data)
        })
      break;
    }
    // case 'DELETE': {
    //   deleteItem(req)
    // }
    default:
      res.json({ data: 'hello world' })
  }
}
