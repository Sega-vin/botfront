import  instance  from '@/api/instanse'
import  {getBotMessage}  from '@/api/constructorApi'
import store from '@/store'

export const getConfig = () => {
  return new Promise((resolve, reject) => {
    instance.get(`constructor/bottext/list/${store.getters.project.id}`)
    .then(resp => {
      let question = resp.data.results
      let obj = {} 

      question.forEach(item => {
        obj[item.text_id] = item
      })

      let botConfig = JSON.stringify([
        {
          "id": 1,
          "botAction": [
            {
              "text": obj.hello.text
            },
            {
              "text": obj.add_category.text
            }
          ],
          "userAction": [
            {
              "type": "getSpecialty",
              "text": "Выбрать специализацию",
              "connect": 10
            }
          ]
        },
        {
          "id": 10,
          "botAction": [
            {
              "text": obj.add_service.text
            }
          ],
          "userAction": [
            {
              "type": "getServices",
              "text": "Выбрать услугу",
              "connect": 20
            }
          ]
        },
        {
          "id": 20,
          "botAction": [
            {
              "text": obj.add_staff.text
            }
          ],
          "userAction": [
            {
              "type": "getDoctor",
              "text": "Выбрать врача",
              "connect": 30
            }
          ]
        },
        {
          "id": 30,
          "botAction": [
            {
              "text": obj.add_date.text
            }
          ],
          "userAction": [
            {
              "type": "getDate",
              "text": "Выбрать дату",
              "connect": 40
            }
          ]
        },
        {
          "id": 40,
          "botAction": [
            {
              "text": "Выберите время"
            }
          ],
          "userAction": [
            {
              "type": "getTime",
              "text": "Выбрать время",
              "connect": 50
            }
          ]
        },
        {
          "id": 50,
          "botAction": [
            {
              "text": "Введите ФИО и номер телефона"
            }
          ],
          "userAction": [
            {
              "type": "getName",
              "text": "Ввести имя",
              "connect": 60
            }
          ]
        },
        {
          "id": 60,
          "botAction": [
            {
              "text": "Сохраните запись"
            }
          ],
          "userAction": [
            {
              "type": "saveEvent",
              "text": "Сохранить запись"
            }
          ]
        }
      ])
      const construct = JSON.stringify([[{"id":1,"botAction":[{"text":"Выбери специальность"}],"userAction":[{"type":"getSpecialty","text":"Выбрать специализацию","connect":10}]}],[{"id":10,"botAction":[{"text":"Выбери услугу"}],"userAction":[{"type":"getServices","text":"Выбрать услугу","connect":20}]}],[{"id":20,"botAction":[{"text":"выбери врача"}],"userAction":[{"type":"getDoctor","text":"Выбрать врача","connect":30}]}],[{"id":30,"botAction":[{"text":"выберите дату"}],"userAction":[{"type":"getDate","text":"Выбрать дату","connect":40}]}],[{"id":40,"botAction":[{"text":"выберите время"}],"userAction":[{"type":"getTime","text":"Выбрать время","connect":50}]}],[{"id":50,"botAction":[{"text":"Введите ФИО"}],"userAction":[{"type":"getName","text":"Ввести имя","connect":60}]}],[{"id":60,"botAction":[{"text":"Сохраните запись"}],"userAction":[{"type":"saveEvent","text":"Сохранить запись"}]}]])
      const bot = {
        construct: construct,
        dialog_config: botConfig
      }
      resolve(bot)
    })
    .catch(err => {
      console.log(err)
    })
  })
}


  





