import  instance  from '@/api/instanse'
import { dbRealTime } from '@/main'
import { cloud } from '@/main'

const botConfigGet = (id) => {
  return new Promise((resolve, reject) => {
    instance.get(`constructor/${id}`)
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
    })
}

export { botConfigGet }