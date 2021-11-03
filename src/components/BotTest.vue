<template>
    <div class="botTest">
      <svg class="botTest__dotsVertical botTest__dotsVertical--left">
        <use href="../assets/dotsVertival.svg#dotsver"></use>
      </svg>
      <svg class="botTest__dotsVertical botTest__dotsVertical--right">
        <use href="../assets/dotsVertival.svg#dotsver"></use>
      </svg>
      <div class="botTest__wrapper">
        <header class="botTest__header">
          <div class="botTest__logo">
            <img v-if="!logoPatch" src='../assets/mainlogo.png' class="calendarBot__logo">
            <img v-else :src='logoPatch' class="calendarBot__logo">
          </div>
          <div class="botTest__name">
              <p class="botTest__botname">{{botName ? botName : 'CalendarBot'}}</p>
              <p class="botTest__status">Online</p>
          </div>
        </header>
        <div class="test-wrapper">
          <div class="bot-test-wrapper" :key="index + 'a'"  v-for="(bot, index) in history" >
            <template v-if="bot.type == 'bot'">
              <img v-if="!logoPatch" src='../assets/mainlogo.png' class="calendarBot__logo">
              <img v-else :src='logoPatch' class="calendarBot__logo">
            </template>          
            <div :class="bot.type == 'bot' ? 'bot-test-action test-action' : 'user-test-action test-action '">{{bot.text}}</div>
          </div>
            <div class=""></div>
            <div class="user-button-wrapper">
              <div 
                :key="index"   
                v-for="(user, index) in userElements"
                class="user-wrapper"
              >         
                <div v-if="user.type == 'getName'" class="user-field">
                    <input
                      v-model="name"
                      type="text"
                      placeholder="ФИО"
                      required
                      class="appInput"
                    /> 
                    <input
                      v-model="phone"
                      type="tel"
                      placeholder="Телефон"
                      required
                      class="appInput"
                    /> 
                    <button 
                      class="user-button"             
                      @click="setId(user.connect, {text: name}, user.type)"
                    >
                    {{user.text}}
                  </button>
                </div>
                <div v-else-if="user.type == 'saveEvent'" class="user-field">
                  <div class="user-save">
                    <p>
                      ФИО клиента: {{name}}
                    </p>
                    <p>
                      Номер клиента: {{phone}}
                    </p>
                    <p>
                      Дата: {{datetime}}
                    </p>
                    <p>
                      Время: {{time}}
                    </p>
                    <p>
                      Врач: {{staffName}}
                    </p>
                    <p>
                      Специализация: {{specializationName}}
                    </p>
                    <p>
                      Услуга: {{servicesName}}
                    </p>
                    <p>
                      Цена: {{price}}
                    </p>
                  </div>
                    <button
                      v-if="user.type == 'saveEventBtn'"   
                      class="user-button"             
                      @click="setId(user.connect, {text: 'сохранить'}, user.type)"
                    >
                    {{user.text}}
                  </button>
                </div>
                <button 
                  v-else 
                  class="user-button"             
                  @click="setId(user.connect, user, user.type)"
                >
                  {{user.text}}
                </button>
              </div>
              
            </div> 
        </div> 
    </div>
      <!-- <div class="inputarea">
        <input 
          type="text" 
          class="appInput inputarea__input"
          placeholder="Введите свой ответ "
        >
        <button class="inputarea__send" type="button">
          <svg style="fill: var(--lite-color)" width="21" height="18"> 
            <use href="../assets/send.svg#send"></use>
          </svg>
        </button>
      </div> -->
      <!-- <button  
        color="#22d641"   
        class="appBtn reload" 
        @click="reload()"
      >
        Перезапустить
      </button>  -->
  </div>
</template> 
<script>
import { ConstructDifGet } from '@/api/constructorApi'
import { getCalendar, updateCalendar, getCalendarOne, getServices, getServicesToSpecialization, getSpecializationToServices, addSpecialization, getSpecialization, patchConstructor, getSpecializationToStaff, getFreeTime, addEvent } from '@/api/calendarApi'

function myDate(date){

  if(date.month < 10){
    date.month = '0' + date.month
  }
  if(date.day < 10){
    date.day = '0' + date.day
  }
  return date.year + '-' + date.month + '-' + date.day 
}
  export default {
    name: 'botTest',
    data: () => ({
      botConfig: [],
      actionId: 1,
      actionType: null,
      action: null,
      userElements: [],
      botElements: [],
      history: [],
      lastAnswer: null,
      staffId: null,
      specializationId: null,
      servicesId: null,
      specialization: [],
      staff: [],
      services: [],
      datetime: null,
      time: null,
      name: null,
      price: null,
      logoPatch: null,
      botName: "",
      phone: ''
    }),
    async mounted(){
      await this.getConfig()
      let project = this.$store.getters.project
      this.logoPatch = project.logo.length ? project.logo[0].image.full_size : null
      this.botName = project.name ? project.name : null
    },
    methods: {  
      scrollDown(){
        let el = document.querySelector('.test-wrapper')
        setTimeout(() => {
          el.scrollTo({
              top: el.scrollHeight,
              behavior: "smooth"
          })
        }, 500)
        
      },
      async getConfig(){
        try{
          this.botConfig = JSON.parse(this.$store.getters.project.dialog_config) 
          this.doAction()
        }catch(err){
          console.log(err)
        }
      },
      reload(){
        this.history = [],
        this.userElements = []
        this.botElements = [],
        this.actionId = 1,
        this.actionType = null,
        this.lastAnswer= null,
        this.action = null,
        this.staffId = null,
        this.specializationId = null,
        this.servicesId = null,
        this.staffName = null,
        this.specializationName = null,
        this.servicesName = null,
        this.datetime = null,
        this.time = null,
        this.name = null,
        this.price = null
        this.getConfig() 
      },
      async doAction(){
        console.log()
        if(this.actionId !== undefined){
          this.action = this.botConfig.find(item => item.id == this.actionId) 
          this.botAction(this.action.botAction)
          await this.userAction(this.action.userAction)
          .then(() => {
            this.scrollDown()
          })
        }else{
          this.history.push({text: 'Спасибо за визит', type: 'bot'})
        }
        
      }, 
      botAction(action){
        action.forEach(item => {
          this.botElements.push(item)
          this.history.push({text: item.text, type: 'bot'})
        });   
      },
      async userAction(action){
       await  action.forEach(async item => {
 
          switch (item.type) {
            case ('getSpecialty'):
              await this.getSpecialty(item.connect)
              break;
            case ('getServices'):
              await this.getServices(item.connect)
              break;

            case ('getDoctor'):
              await this.getDoctor(item.connect)
              break;

            case ('getDate'):
              await this.getDate(item.connect)
              break;

            case ('getTime'):
              await this.getTime(item.connect)
              break;

            case ('getName'):
              await this.getName(item.connect)
              break;

            case ('saveEvent'):
              await this.saveEvent(item.connect)
              break;

            // case ('saveEventBtn'):
            //   this.saveEventCalendar()
            //   break;

            default:
              this.userElements.push(item)
              break;
          }
          
        }); 
      },
      setId(id, lastAnswer, type){
        this.history.push({text: lastAnswer.text, type: 'user'})
        this.userElements = []
        this.botElements = []
        this.actionId = id
        this.actionType = type
        switch (type) {
            case ('getSpecialty'):
              console.log('Specialty')
              this.specializationId = lastAnswer.id
              this.specializationName = lastAnswer.text
              console.log(lastAnswer)
              break;

            case ('getServices'):
              console.log('getServices')
              this.servicesId = lastAnswer.id
              this.servicesName = lastAnswer.nameServices
              this.price = lastAnswer.price
              console.log(lastAnswer)
              break

            case ('getDoctor'):
              console.log('getDoctor')
              this.staffId = lastAnswer.id
              this.staffName = lastAnswer.text
              break

            case ('getDate'):
              console.log('getDate')
              this.datetime = lastAnswer.text
              break
            
            case ('getTime'):
              console.log('getTime')
              this.time = lastAnswer.text
              break

            case ('getName'):
              console.log('getName')
              console.log(this.name)
              break

            case ('saveEventBtn'):
              this.saveEventCalendar()
              break

            default:
           //   this.userElements.push(item)
              break;
          }
        this.doAction()
      },
      //api
      async getSpecialty(connect){
        try{
          this.specialization =  (await getSpecialization(this.$store.getters.project.id)).data.results

          this.specialization.forEach(item => {
            let obj = {
              id: item.id,
              text: item.title,
              connect: connect,
              type: 'getSpecialty'
            }
            this.userElements.push(obj)
          })
        }catch(err){
          console.log(err)
        }
      },
      async getServices(connect){
         try{
          let index = this.specialization.findIndex(item => item.id == this.specializationId)
          this.services =  this.specialization[index].service
  
          this.services.forEach(item => {
            let obj = {
              id: item.id,
              text: item.name + " " + item.price,
              price: item.price,
              nameServices: item.name,
              connect: connect,
              type: 'getServices'
            }
            this.userElements.push(obj)
          })
        }catch(err){
          console.log(err)
        }
      },
      async getDoctor(connect){
         try{
          let index = this.services.findIndex(item => item.id == this.servicesId)
          this.staff =  this.services[index].staff
          this.staff.forEach(async item => {
            let doctor = (await getCalendarOne(item)).data
            let obj = {
              id: doctor.id,
              text: doctor.name,
              connect: connect,
              type: 'getDoctor'
            }
            this.userElements.push(obj)
          })
      
        }catch(err){
          console.log(err)
        }
      },
      async getDate(connect){
        for (let i = 0; i < 7; i++) {
          let day = 86400000 * i
          let date =  new Date(new Date().getTime() + day)

          let newDate = myDate({
            year: date.getFullYear(),
            month: date.getMonth(),
            day: date.getDate()
          })
          let obj = {
            text: newDate,
            connect: connect,
            type: 'getDate'
          }

          this.userElements.push(obj)

        }
      },
      async getDate(connect){
        for (let i = 0; i < 7; i++) {
          let day = 86400000 * i
          let date =  new Date(new Date().getTime() + day)
          let newDate = myDate({
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
          })


          let obj = {
            text: newDate,
            connect: connect,
            type: 'getDate'
          }

          this.userElements.push(obj)
        }
      },
      async getTime(connect){

        try{
          const time = (await getFreeTime(this.datetime, this.staffId)).data
          time.forEach(item => {
            let obj = {
              text: item.h + ':' + item.m,
              connect: connect,
              type: 'getTime'
            }
            this.userElements.push(obj)
          })
        }catch(e){
          this.history.push({text: 'В эту дату врач не работает', type: 'bot'})
          this.datetime = null
          this.actionId = 30
          this.doAction()
          console.log(e)
        }    
      },
      getName(connect){
        this.userElements.push({
          text: 'Отправить',
          connect: connect,
          type: 'getName'
        })
      },
      saveEvent(connect){
        this.userElements.push({
          text: {
            date: this.datetime,
            time: this.time,
          },
          connect: connect,
          type: 'saveEvent'
        })
        this.userElements.push({
          text: 'Сохранить',
          connect: connect,
          type: 'saveEventBtn'
        })
      },
      async saveEventCalendar(){
        let dateStart = this.datetime + 'T' + this.time
        let tiemEnd = new Date(Date.parse(this.datetime + 'T' + this.time) + 1800000).toLocaleTimeString()
        let DateEnd =  this.datetime + 'T' + tiemEnd
  
        await addEvent({
          name: this.name,
          details: `Запись на ${this.servicesName} к доктору ${this.specializationName} ${this.staffName}`,
          start: dateStart,
          end: DateEnd,
          phone: this.phone,
          price: this.price,
          status: 'BS',
          staff: this.staffId,
          color: '#C70F0F'
        })
      }
    }
  }
</script>
<style lang="less">
  @import '../assets/css/bot-test.less';
</style>>

