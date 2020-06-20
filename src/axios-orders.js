import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://wizard-burgers.firebaseio.com/',
})

export default instance
