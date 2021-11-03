import axios from 'axios'

const instance = axios.create({
  //local
  // baseURL: 'http://localhost:8000/api/',
  // dev
  // baseURL: 'http://localhost/api/',
  // prod
  baseURL: 'http://85.214.76.64:7000/api/',
  headers: {
    accept: 'application/json',
  }
})
export default instance
