import  instance  from '@/api/instanse'

const Project = () => {
  return new Promise((resolve, reject) => {
   instance.get('constructor/all/')
    .then(resp => {
      resolve(resp.data.results[0])
    })
    .catch(err => {
      reject(err)
    })
  })
}


const ConstructDifGet = (id) => {
  return new Promise((resolve, reject) => {
    instance.get(`constructor/detail/${id}/`)
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
    })
}

const ConstructDifPost = (data) => {
  return new Promise((resolve, reject) => {
    instance.post(`constructor/create/`, data)
      .then(resp => {
        resolve(resp )
      })
      .catch(err => {
        reject(err)
      })
    })
}

const ConstructDifPatchId = (data, id) => {
  return new Promise((resolve, reject) => {
    instance.patch(`constructor/update/${id}/`, data)
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
    })
}

const ConstructDifDeleteId = (id) => {
  return new Promise((resolve, reject) => {
    instance.delete(`constructor/delete/${id}/`)
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
    })
}


const CreateImage = (data) => {
  return new Promise((resolve, reject) => {
   instance.post('constructor/image/create/', data)
    .then(resp => {
      resolve(resp)
    })
    .catch(err => {
      reject(err)
    })
  })
}

export { Project, ConstructDifGet, ConstructDifPost, ConstructDifPatchId, ConstructDifDeleteId, CreateImage }

