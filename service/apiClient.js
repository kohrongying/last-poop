const axios = require('axios');

const api = {
  getItems: async (startDate, endDate) => {
    const response = await axios.get(`/api/item?startDate=${startDate}&endDate=${endDate}`)
    return response.data
  },

  putItem: async (createdAt) => {
    const body = {
      UserId: '1',
      Event: 'P',
      CreatedAt: createdAt
    }
    const response = await axios.post('/api/item', body)
    return response.data
  }
}

export default api;