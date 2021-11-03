import  instance  from '@/api/instanse'
import { dbRealTime } from '@/main'
import { cloud } from '@/main'

const updateCalendar = async (data, services = []) => {
  try{
    console.log(services)
    await dbRealTime.ref(`Calendars/${data}`).update({
      services: services
    }) 
  }catch(e){
    throw e
  }
}

const getCalendar = id => {
  return new Promise((resolve, reject) => {
   instance.get(`constructor/staff/list/${id}/`)
    .then(resp => {
      resolve(resp)
    })
    .catch(err => {
      reject(err)
    })
  })
}

const getCalendarOne = id => {
  return new Promise((resolve, reject) => {
   instance.get(`constructor/staff/detail/${id}/`)
    .then(resp => {
      resolve(resp)
    })
    .catch(err => {
      reject(err)
    })
  })
}

const addCalendar = (data) => {
  return new Promise((resolve, reject) => {
    instance.post(`/constructor/staff/create/`, data)
     .then(resp => {
       resolve(resp)
     })
     .catch(err => {
       reject(err)
     })
   })
}

const patchCalendar = (id, data) => {
  return new Promise((resolve, reject) => {
    instance.patch(`constructor/staff/update/${id}/`, data)
     .then(resp => {
       resolve(resp)
     })
     .catch(err => {
       reject(err)
     })
   })
}

const patchConstructor = (id, data) => {
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

const deleteCalendar = (id) => {
  return new Promise((resolve, reject) => {
    instance.delete(`constructor/staff/delete/${id}/`)
     .then(resp => {
       resolve(resp)
     })
     .catch(err => {
       reject(err)
     })
   })
}

const deleteSpecialization = (id) => {
  return new Promise((resolve, reject) => {
    instance.delete(`constructor/category/delete/${id}/`)
     .then(resp => {
       resolve(resp)
     })
     .catch(err => {
       reject(err)
     })
   })
}

const deleteService = (id) => {
  return new Promise((resolve, reject) => {
    instance.delete(`constructor/service/delete/${id}/`)
     .then(resp => {
       resolve(resp)
     })
     .catch(err => {
       reject(err)
     })
   })
}

const getFreeTime = (date, id) => {
  return new Promise((resolve, reject) => {
    instance.get(`constructor/event/${date}/${id}/`)
     .then(resp => {
       resolve(resp)
     })
     .catch(err => {
       reject(err)
     })
   })
}


const addEvent = (data) => {
  return new Promise((resolve, reject) => {
    instance.post(`constructor/event/`, data)
     .then(resp => {
       resolve(resp)
     })
     .catch(err => {
       reject(err)
     })
   })
}

const getEvent = (id) => {
  return new Promise((resolve, reject) => {
    instance.get(`constructor/event/staff/list/${id}/`)
     .then(resp => {
       resolve(resp)
     })
     .catch(err => {
       reject(err)
     })
   })
}

const deleteEvent = (id) => {
  return new Promise((resolve, reject) => {
    instance.delete(`constructor/event/${id}/`)
     .then(resp => {
       resolve(resp)
     })
     .catch(err => {
       reject(err)
     })
   })
}

const updateEvent = (id, data) => {
  return new Promise((resolve, reject) => {
    instance.patch(`constructor/event/${id}/`, data)
     .then(resp => {
       resolve(resp)
     })
     .catch(err => {
       reject(err)
     })
   })
}

const addServices = data => {
  return new Promise((resolve, reject) => {
    instance.post(`constructor/service/create/`, data)
     .then(resp => {
       resolve(resp)
     })
     .catch(err => {
       reject(err)
     })
  })
}

const getServices = id => {
  return new Promise((resolve, reject) => {
    instance.get(`constructor/service/list/${id}`)
    .then(resp => {
      resolve(resp)
    })
    .catch(err => {
      reject(err)
    })
  })
}

const addFullServices = (staffId, categoryId) => {
  return new Promise((resolve, reject) => {
    instance.post(`constructor/category/staff/add/${staffId}/${categoryId}`)
    .then(resp => {
      resolve(resp)
    })
    .catch(err => {
      reject(err)
    })
  })
}

const deleteFullServices = (staffId, categoryId) => {
  return new Promise((resolve, reject) => {
    instance.post(`constructor/category/staff/del/${staffId}/${categoryId}`)
    .then(resp => {
      resolve(resp)
    })
    .catch(err => {
      reject(err)
    })
  })
}

const addServiceInCategory = (idServices, idSpec) => {
  return new Promise((resolve, reject) => {
    instance.post(`constructor/category/service/add/${idServices}/${idSpec}`)
    .then(resp => {
      resolve(resp)
    })
    .catch(err => {
      reject(err)
    })
  })
}

const getUncategorizedServices = id => {
  return new Promise((resolve, reject) => {
    instance.get(`constructor/service/uncategorized/${id}/`)
    .then(resp => {
      resolve(resp)
    })
    .catch(err => {
      reject(err)
    })
  })
}


const patchServices = (id, data) => {
  return new Promise((resolve, reject) => {
    instance.patch(`constructor/service/update/${id}/`, data)
    .then(resp => {
      resolve(resp)
    })
    .catch(err => {
      reject(err)
    })
  })
}
const getServicesToSpecialization = id => {
  return new Promise((resolve, reject) => {
    instance.get(`constructor/service-category/${id}/`)
    .then(resp => {
      resolve(resp)
    })
    .catch(err => {
      reject(err)
    })
  })
}

const getServicesId = id => {
  return new Promise((resolve, reject) => {
    instance.get(`constructor/service/detail/${id}/`)
    .then(resp => {
      resolve(resp)
    })
    .catch(err => {
      reject(err)
    })
  })
}

const addSpecialization = (data) => {
  return new Promise((resolve, reject) => {
    instance.post(`constructor/category/create/`, data)
     .then(resp => {
       resolve(resp)
     })
     .catch(err => {
       reject(err)
     })
  })
}

const getSpecialization = id => {
  return new Promise((resolve, reject) => {
    instance.get(`constructor/category/list/${id}/`)
    .then(resp => {
      resolve(resp)
    })
    .catch(err => {
      reject(err)
    })
  })
}

const getSpecializationToStaff = id => {
  return new Promise((resolve, reject) => {
    instance.get(`constructor/category-staff/${id}/`)
    .then(resp => {
      resolve(resp)
    })
    .catch(err => {
      reject(err)
    })
  })
}

const addServiceToStaff = (servId, staffId) => {
  return new Promise((resolve, reject) => {
    instance.post(`constructor/service/staff/add/${servId}/${staffId}`)
     .then(resp => {
       resolve(resp)
     })
     .catch(err => {
       reject(err)
     })
  })
}

const deleteServiceToStaff = (servId, staffId) => {
  return new Promise((resolve, reject) => {
    instance.post(`constructor/service/staff/delete/${servId}/${staffId}`)
     .then(resp => {
       resolve(resp)
     })
     .catch(err => {
       reject(err)
     })
  })
}

const getSpecializationId = id => {
  return new Promise((resolve, reject) => {
    instance.get(`constructor/category/${id}/`)
    .then(resp => {
      resolve(resp)
    })
    .catch(err => {
      reject(err)
    })
  })
}

const patchSpecialization = (id, data) => {
  return new Promise((resolve, reject) => {
    instance.patch(`constructor/category/update/${id}/`, data)
    .then(resp => {
      resolve(resp)
    })
    .catch(err => {
      reject(err)
    })
  })
}

const getCompanyType = id => {
  return new Promise((resolve, reject) => {
    instance.get(`constructor/companytype/all/`)
    .then(resp => {
      resolve(resp)
    })
    .catch(err => {
      reject(err)
    })
  })
}

const getBotMessage = id => {
  return new Promise((resolve, reject) => {
    instance.get(`constructor/bottext/list/${id}`)
    .then(resp => {
      resolve(resp)
    })
    .catch(err => {
      reject(err)
    })
  })
}

const patchBotMessage = (id, data) => {
  return new Promise((resolve, reject) => {
    instance.patch(`constructor/bottext/${id}/`, data)
    .then(resp => {
      resolve(resp)
    })
    .catch(err => {
      reject(err)
    })
  })
}

export { patchConstructor, addCalendar, getCalendar, updateCalendar, addServices, getServices, getServicesToSpecialization, getCalendarOne, getServicesId, patchServices, addEvent, getEvent, deleteCalendar, deleteEvent, updateEvent, addSpecialization, getSpecialization, getSpecializationToStaff, patchSpecialization, getSpecializationId, getFreeTime, deleteSpecialization, deleteService, patchCalendar, getUncategorizedServices, getCompanyType, addFullServices, deleteFullServices, getBotMessage, patchBotMessage, addServiceInCategory, addServiceToStaff, deleteServiceToStaff }

