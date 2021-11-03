<template>
  <div class="windowAdd__body">
    <p class="simpleCon__label">Дни недели</p>
    <div class="calendarForStaff__checkbox">
      <div class="calendarForStaff__checkboxWrap" v-for="(item, index) in activeDays" :key="index" @click="setDay(item, index)">
        <div 
          class="calendarForStaff__day"
          :class="activeClass(item)"
        >{{item.title}}</div>
      </div>                           
    </div>
    <div class="calendarForStaff__timewrapper"
      :class="checkWork ? 'calendarForStaff__timewrapper--disabled' : ''">
      <p class="simpleCon__label">Время работы</p>
      <label class="calendarForStaff__timelabel" for="timeStart">с</label>
      <v-menu
        ref="menu"
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="10"
        :return-value.sync="time"
        transition="scale-transition"
        offset-x
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <input 
          v-model="timeStart" 
          type="time" 
          id="timeStart" 
          class="calendarForStaff__time" 
          :disabled="activeDay.disabled"
          @click.prevent=""
          v-bind="attrs"
          v-on="on"
          >
        </template>
        <v-time-picker
          format="24hr"
          v-if="menu2"
          v-model="timeStart"
          full-width
          @click:minute="$refs.menu.save(time)"
          @input="setTimeStart()"
        ></v-time-picker>
      </v-menu>
      <label class="calendarForStaff__timelabel" for="timeEnd">до</label>
      <v-menu
        ref="menu"
        v-model="menu3"
        :close-on-content-click="false"
        :nudge-right="10"
        :return-value.sync="time"
        transition="scale-transition"
        offset-x
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <input 
          v-model="timeEnd" 
          type="time" 
          id="timeEnd" 
          class="calendarForStaff__time" 
          @click.prevent=""
          :disabled="activeDay.disabled"
          v-bind="attrs"
          v-on="on"
          >
        </template>
        <v-time-picker
          format="24hr"
          v-if="menu3"
          v-model="timeEnd"
          full-width
          @click:minute="$refs.menu.save(time)"
          @input="setTimeEnd()"
        ></v-time-picker>
      </v-menu>
      <p class="simpleCon__label">Время обеда</p>
      <label class="calendarForStaff__timelabel" for="timelunchStart">с</label>
      <v-menu
        ref="menu"
        v-model="menu4"
        :close-on-content-click="false"
        :nudge-right="10"
        :return-value.sync="time"
        transition="scale-transition"
        offset-x
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <input 
          v-model="dinnerStart" 
          type="time" 
          id="timelunchStart" 
          class="calendarForStaff__time" 
          :disabled="activeDay.disabled"
          @click.prevent=""
          v-bind="attrs"
          v-on="on"
          >
        </template>
        <v-time-picker
          format="24hr"
          v-if="menu4"
          v-model="dinnerStart"
          full-width
          @click:minute="$refs.menu.save(time)"
          @input="setDinnerStart()"
        ></v-time-picker>
      </v-menu>
      <label class="calendarForStaff__timelabel" for="timelunchEnd">до</label>
      <v-menu
        ref="menu"
        v-model="menu5"
        :close-on-content-click="false"
        :nudge-right="10"
        :disabled="activeDay.disabled"
        :return-value.sync="time"
        transition="scale-transition"
        offset-x
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <input 
          v-model="dinnerEnd" 
          type="time" 
          id="timelunchEnd" 
          class="calendarForStaff__time" 
          :disabled="activeDay.disabled"
          @click.prevent=""
          v-bind="attrs"
          v-on="on"
          >
        </template>
        <v-time-picker
          format="24hr"
          v-if="menu5"
          v-model="dinnerEnd"
          full-width
          @click:minute="$refs.menu.save(time)"
          @input="setDinnerEnd()"
        ></v-time-picker>
      </v-menu>
    </div>
    <div class="calendarForStaff__checkboxWrap calendarForStaff__checkboxWrap--solo">
      <input class="calendarForStaff__radio" type="checkbox" id="activeCheck" v-model="checkWork" @change="setStatus()">
      <div class="calendarForStaff__radioView">
        <v-icon dense>mdi-check-bold</v-icon>
      </div>
      <label class="calendarForStaff__label calendarForStaff__label--solo" for="activeCheck">Не рабочий день</label>
    </div>  
    <button class="appBtn appBtn--small calendarForStaff__appBtn" @click="setWatched()">Сохранить</button>
</div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'MiniCalendar',
  props: {
    days: {
      type: Array,
      required: true
    },
    activeStaff: {
      type: Object,
      required: true
    },
    disabled: Boolean
  },
  data: () => ({
    timeStart: null,
    timeEnd: null,
    dinnerStart: null,
    dinnerEnd: null,
    activeDay: {},
    activeDays: [],
    checkWork: false,
    time: null,
    watched: false,
    menu2: false,
    menu3: false,
    menu4: false,
    menu5: false,
  }),
  watch: {
    activeStaff(){
      this.activeDays = this.days.find(item => item.id == this.activeStaff.id).calendar
      if(Object.keys(this.activeDay).length == 0){
        this.activeDay = {
          ...this.activeDays[0],
          id: 0
        }
      }
      console.log(this.days)

      this.setTime()  
    },  
  },
  methods: {
    setDay(obj, index){
      this.activeDay = {
        ...obj,
        id: index,
      }
      this.activeDays[this.activeDay.id].status = 'active'
      this.activeDays.forEach((item, i) => {
        if(this.activeDay.value !== item.value){
          if(this.activeDays[i].status !== 'watched'){
            this.activeDays[i].status = 'new'
          }
        }
      })
      this.setTime()
    },
    setTimeStart(){
      this.activeDays[this.activeDay.id].timeStart = this.timeStart
      this.changeSetting()
      this.setTime()
    },
    setTimeEnd(){
      this.activeDays[this.activeDay.id].timeEnd = this.timeEnd
      this.changeSetting()
      this.setTime()
    },
    setDinnerStart(){
      this.activeDays[this.activeDay.id].dinnerStart = this.dinnerStart
      this.changeSetting()
      this.setTime()
    },
    setDinnerEnd(){
      this.activeDays[this.activeDay.id].dinnerEnd = this.dinnerEnd
      this.changeSetting()
      this.setTime()
    },
    setTime(){
      this.checkWork = this.activeDays.find(item => item.value == this.activeDay.value).disabled
      if(this.checkWork){
        this.timeStart = null
        this.timeEnd = null
        this.dinnerStart = null
        this.dinnerEnd = null
      }else{
        this.timeStart = this.activeDays.find(item => item.value == this.activeDay.value).timeStart
        this.timeEnd = this.activeDays.find(item => item.value == this.activeDay.value).timeEnd
        this.dinnerStart = this.activeDays.find(item => item.value == this.activeDay.value).dinnerStart
        this.dinnerEnd = this.activeDays.find(item => item.value == this.activeDay.value).dinnerEnd
      }
      this.$emit('EventsObj', this.days)
    },
    setStatus(){
      this.activeDays[this.activeDay.id].disabled = this.checkWork
      this.changeSetting()
      this.setTime()
    },
    setWatched(){
      this.activeDays[this.activeDay.id].watched = true
    },
    changeSetting(){
      this.activeDays[this.activeDay.id].watched = false
    },
    activeClass(item){
      let styles = '';
      styles += item.disabled ? 'calendarForStaff__day--disabled ' : ''
      styles += item.watched ? 'calendarForStaff__day--watched ' : ''
      styles += item.status == 'active' ? 'calendarForStaff__day--active ' :  ''
      return styles
    },
  },
  computed:{
    
  }
}
</script>

<style lang="less">
@import '../../assets/css/miniCalendar.less';

</style>