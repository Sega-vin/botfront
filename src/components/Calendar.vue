<template>
  <v-row class="fill-height">
    <v-col cols="12" lg="2"  class="sidebar-calendar-wrapper">
      <div class="sidebar-calendar" >
        <ul class="list-group" >
            <li class="list-item" :key="index" v-for="(value, index) in typeCalendar">
                <v-checkbox
                v-model="selected"
                :label="value.name"
                :value="value.id"
                @change="getCalendarHandler()"
              ></v-checkbox>
              <v-icon class="delete-cal" @click="deleteCalendar(value.id)">mdi-delete</v-icon>
            </li>
        </ul>
        <button @click.stop="dialogCalendar = true" class="sidebar__btn btn-add-calendar appBtn" >Добавить календарь</button>
      </div>
    </v-col>
    <v-col cols="12" lg="10" class="calendar-wrapper">
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <button class="appBtn appBtn--small calendar__btn" @click.stop="dialog = true">
            New Event
          </button>
          <button class="appBtn appBtn--small" @click="setToday">
            Today
          </button>
          <v-btn fab text small @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-menu bottom right>
            <template v-slot:activator="{ on }">
              <v-btn outlined v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>

      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-container>
            <v-form @submit.prevent="addEvent">
              <v-text-field v-model="name" type="text" label="event name (required)"></v-text-field>
              <v-text-field v-model="details" type="text" label="detail"></v-text-field>
              <v-text-field v-model="price" type="text" label="Price"></v-text-field>
              <v-text-field v-model="phone" type="tel" label="Phone"></v-text-field>
              <v-select
                :items="typeCalendar"
                item-text="name"
                item-value="id"
                label="Calendar"
                v-model="SelectNow"
              ></v-select>
              <div class="time-group">
                <v-text-field v-model="start" type="date" label="start (required)"></v-text-field>
                <v-text-field v-model="end" type="date" label="end (required)" :min="start"></v-text-field>
              </div>
              <div class="time-group">
                <v-text-field v-model="timeStart" type="time" label="Time Start"></v-text-field>
                <v-text-field v-model="timeEnd" type="time" label="Time End"></v-text-field>
              </div>
              <v-text-field v-model="color" type="color" label="color (click to open color menu)"></v-text-field>
              <v-switch
                v-model="switch1"
                :label="switch1 ? 'FR' : 'BS'"
                :color="switch1 ? 'green' : ''"
              ></v-switch>
              <button type="submit" class="mr-4 appBtn appBtn--small" @click.stop="dialog = false">
                Создать событие
              </button>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogCalendar" max-width="500">
        <v-card>
          <v-container>
            <v-form @submit.prevent="addCalendar">
              <v-text-field v-model="calendarName" type="text" label="calendar name (required)"></v-text-field>
              <v-text-field v-model="calendarColor" type="color" label="color (click to open color menu)"></v-text-field>
              <v-btn type="submit" color="primary" class="mr-4" @click.stop="dialog = false">
                create event
              </v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>

<v-sheet height="88vh">
  <v-calendar
  ref="calendar"
  v-model="focus"
  color="primary"
  :events="events"
  :event-color="getEventColor"
  :event-margin-bottom="3"
  :now="today"
  :type="type"
  locale="ru" 
  :interval-format="intervalFormat"  
  @click:event="showEvent"
  @click:more="viewDay"
  @click:date="viewDay"
  @click:day="setDialogDate"
  @change="updateRange" 
  @mousedown:event="startDrag"  
  @mousemove:day="mouseMove"
  @mouseup:day="endDrag"
  @mouseleave.native="cancelDrag"
  > 
  </v-calendar>
  <v-menu
  v-model="selectedOpen"
  :close-on-content-click="false"
  :activator="selectedElement"
  full-width
  offset-x
  >
  <v-card color="grey lighten-4" :width="400" flat>
    <v-toolbar :color="selectedEvent.color" dark>
      <v-btn @click="deleteEvent(selectedEvent.id)" icon>
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-toolbar>

    <v-card-text>
      <form v-if="currentlyEditing !== selectedEvent.id">
        {{ selectedEvent.details }}
        <p class="">Price: {{ selectedEvent.price }}</p>
        <p class="">Phone: {{ selectedEvent.phone }}</p>
        <p class="">Status: {{ selectedEvent.switch1 ? 'FR' : 'BS' }}</p>
        
      </form>
      <form v-else>
        <div class="time-group">
          <v-text-field v-model="selectedEvent.start" type="date" label="start (required)"></v-text-field>
          <v-text-field v-model="selectedEvent.end" type="date" label="end (required)" :min="start"></v-text-field>
        </div>
        <div class="time-group">
          <v-text-field v-model="timeStart" type="time" label="Time Start"></v-text-field>
          <v-text-field v-model="timeEnd" type="time" label="Time End"></v-text-field>
        </div>
        <v-text-field 
        v-model="selectedEvent.details" 
        type="text" label="details" 
        :min-height="100"
        style="width: 100%"
        ></v-text-field>
        <v-text-field 
        v-model="selectedEvent.price" 
        type="text" label="price" 
        :min-height="100"
        style="width: 100%"
        ></v-text-field>
        <v-text-field 
        v-model="selectedEvent.phone" 
        type="text" label="phone" 
        :min-height="100"
        style="width: 100%"
        ></v-text-field>
        <v-switch
          v-model="selectedEvent.switch1"
          :label="selectedEvent.switch1 ? 'FR' : 'BS'"
          :color="selectedEvent.switch1 ? 'green' : ''"
        ></v-switch>
        <v-text-field v-model="selectedEvent.color" type="color" label="color (click to open color menu)"></v-text-field>
    </form>
  </v-card-text>

  <v-card-actions>
    <v-btn text color="secondary" @click="selectedOpen = false">
      close
    </v-btn>
    <v-btn v-if="currentlyEditing !== selectedEvent.id" text @click.prevent="editEvent(selectedEvent), dateStartEdit">
      edit
    </v-btn>
    <v-btn text v-else type="submit" @click.prevent="updateEvent(selectedEvent)">
      Save
    </v-btn>
  </v-card-actions>
</v-card>
</v-menu>
</v-sheet>
</v-col>
</v-row>
</template>

<script>
import { db } from '@/main'
import { dbRealTime } from '@/main'
import { DateTime } from 'luxon'
import { addCalendar, getCalendar, addEvent, getEvent, deleteCalendar, deleteEvent, updateEvent } from '@/api/calendarApi'
import { Project, ConstructDifPost } from "@/api/constructorApi";
import {mapGetters} from "vuex"
function Random(){
  return Math.random().toString(36).slice(2) 
}

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  return {
    'h': hours,
    'm': minutes
   }
}
export default {
  data: () => ({
    today: new Date().toISOString().substr(0, 10),
    focus: new Date().toISOString().substr(0, 10),
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',
    },
    selected: [],
    switch1: true,
    dialogCalendar: false,
    calendarName: null,
    calendarColor: '#000',
    name: null,
    details: null,
    phone: '',
    price: '',
    start: '',
    end: null,
    timeStart: '',
    timeEnd: '',
    days: 0,
    color: '#000', // default event color
    currentlyEditing: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    dialog: false,
    dialogDate: false,
    typeCalendar: [],
    SelectNow: '',
    dragEvent: null,
    dragStart: false,
    beforeDrag: null,
    afterDrag: null,
    extendOriginal: null,
    timedDrag: false,
    checkTimed: null,
  }),
  async mounted () {
    await this.getCalendarHandler() 
  },
  methods: {
    intervalFormat(interval){ 
      return interval.time
    },
    async getCalendarHandler () {
      // get calendar
      console.log('hello')
      this.calendar = (await getCalendar(this.$store.getters.project.id)).data.results
      let nameCalendar = this.calendar
      this.typeCalendar = []
      //add to calendar list  
      nameCalendar.forEach(item => {
        this.typeCalendar.push({
          name: item.name,
          id: item.id
        });
      })
      
      let EventsObj = []
      if(this.selected.length > 0){
        try{
          this.selected.forEach(async item => {  
            const event = await getEvent(item)
            const newTimeEvent = event.data.results.map(item => ({
              ...item,
              start: item.start.split('Z')[0],
              end: item.end.split('Z')[0],
            }))
  
            EventsObj = [
              ...EventsObj,
              ...newTimeEvent
            ]
             this.events = EventsObj
            console.log(this.events) 

          })
        }catch(e){
          console.log(e)
        }
      }else{
        this.events = []
      }
    },
    async addEvent () {
      if (this.name && this.start && this.end && this.SelectNow) {
        const id = this.SelectNow
        let diff = new Date(this.end).getTime() - new Date(this.start).getTime()
          try{
            if(this.timeStart && this.timeEnd){
            diff = (diff / 86400000) + 1
            for(let i = 0; i < diff; i++){
              let it = 86400000 * i
              let dates = new Date(new Date(this.start).getTime() + it).toISOString().split('T')[0]
              let timeStart = this.timeStart ? dates + 'T' + this.timeStart : this.start
              let timeEnd = this.timeEnd ? dates + 'T' + this.timeEnd : this.end
              await addEvent({
                name: this.name,
                details: this.details,
                start: timeStart,
                end: timeEnd,
                price: this.price,
                status: 'FR',
                phone: this.phone,
                color: this.color,
                staff: id
              })
            }
          }else{
            await addEvent({
              name: this.name,
              details: this.details,
              start: this.start,
              end: this.end,
              price: this.price,
              status: this.switch1,
              phone: this.phone,
              color: this.color,
              staff: id
            })
          }
        }catch(e){
          console.log(e)
        }
              
        this.getCalendarHandler()
        this.name = '',
        this.details = '',
        this.start = '',
        this.end = '',
        this.timeStart = '',
        this.timeEnd = '',
        this.SelectNow = ''
        
      } else {
        alert('You must enter event name, start, and end time')
      }
    },
    async addCalendar(){
      if (this.calendarName) {
        try{
          await addCalendar({
            name: this.calendarName,
            constructor:  this.$store.getters.project.id    
          })
          this.getCalendarHandler()
          this.calendarName = ''
          this.dialogCalendar = false
        }catch(err){
          console.log(err)
        }  
      } else {
        alert('Введите название календаря')
      }
    },
    async deleteCalendar(id){
      if(this.typeCalendar.length > 1){
        await deleteCalendar(id)
        this.getCalendarHandler()
      }else{
        alert('вы не можете удалить свой последний календарь')
      }
      
    },
    editEvent (ev) {
      this.currentlyEditing = ev.id
    },
    async updateEvent (ev) {
      this.currentlyEditing = ev.id
      let timeStart = this.timeStart ? 'T' + this.timeStart : ''
      let timeEnd = this.timeEnd ? 'T' + this.timeEnd : ''
      await updateEvent(ev.id, {
        details: ev.details,
        calendar: ev.calendar,
        color: ev.color,
        end: ev.end + timeEnd,
        id: ev.id,
        name: ev.name,
        phone: ev.phone,
        price: ev.price,
        start: ev.start + timeStart,
        status: ev.status
      })
      this.getCalendarHandler()
      this.timeStart = '',
      this.timeEnd = '',
      this.selectedOpen = false,
      this.currentlyEditing = null
    },
    async deleteEvent (id) {
      await deleteEvent(id)
      this.selectedOpen = false
      this.getCalendarHandler()
    },
    setDialogDate( { date }) {
     this.dialog = true
      this.start = date
    }, 
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = this.today
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    
    showEvent ({ nativeEvent, event }) {
      this.$refs.calendar.days[0].hasTime = true
      console.log(this.$refs.calendar)
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => this.selectedOpen = true, 10)
      }
      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }
      nativeEvent.stopPropagation()
    },
    updateRange ({ start, end }) {
      this.start = start
      this.end = end
    },
    nth (d) {
      return d > 3 && d < 21
      ? 'th'
      : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
    },
    startDrag({ event, timed }){
      this.dragStart = true
      this.dragEvent = event
      const start = new Date(this.dragEvent.start.split('T')[0])
      const end = new Date(this.dragEvent.end.split('T')[0])
      this.days =  end - start
      this.beforeDrag = end.getTime() + start.getTime() 
      this.timedDrag = timed
      if(timed){
        this.checkTimed =  msToTime(Date.parse(this.dragEvent.end) - Date.parse(this.dragEvent.start)) 
      }
      
    },
    mouseMove(event){
      if(this.dragStart){
        const dateStart = event.date
        const start = new Date(this.dragEvent.start)
        const end = new Date(this.dragEvent.end)
        this.afterDrag = end.getTime() + start.getTime() 
        const dateEnd = new Date(new Date(this.dragEvent.start.split('T')[0]).getTime() + this.days).toISOString().split('T')[0] 
        let timeEnd = end.toLocaleTimeString()
        let timeStart = start.toLocaleTimeString()

       // console.log(start)
        
          if(this.checkTimed !== null){
            let startNew = start
            startNew.setMinutes(startNew.getMinutes() +  this.checkTimed.m )
            startNew.setHours(startNew.getHours() +  this.checkTimed.h )
            
            if(new Date(this.dragEvent.start) > new Date(new Date(this.dragEvent.start.split('T')[0]).getTime() - 17300000)){
              timeStart = event.time
            }else{
              timeStart = "00:15"
              this.dragStart = false
              
            }
            timeEnd = startNew.toLocaleTimeString()
          }  
          this.dragEvent.start = dateStart  + 'T' + timeStart
          this.dragEvent.end =  dateEnd + 'T' + timeEnd
      }
      
          
          
          // && (event.time.split(':')[0] !== '00' || event.time.split(':')[1] !== '00') && (start.getHours() !== 0 || start.getMinutes() !== 0)
    },
    endDrag(){
      if(this.dragEvent !== null &&  this.beforeDrag !== this.afterDrag && this.afterDrag !== null){
        console.log('yes')
          this.updateEvent(this.dragEvent)
          this.dragEvent = null
          this.afterDrag = null 
          this.beforeDrag = null

      }
      this.dragStart = false
    },
    cancelDrag(){

    },
  },
  computed: {
    title () {
      const { start, end } = this
      if (!start || !end) {
        return ''
      }
      const startMonth = this.monthFormatter(start)
      const endMonth = this.monthFormatter(end)
      const suffixMonth = startMonth === endMonth ? '' : endMonth
      const startYear = start.year
      const endYear = end.year
      const suffixYear = startYear === endYear ? '' : endYear
      const startDay = start.day + this.nth(start.day)
      const endDay = end.day + this.nth(end.day)
      switch (this.type) {
        case 'month':
        return `${startMonth} ${startYear}`
        case 'week':
        case '4day':
        return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
        case 'day':
        return `${startMonth} ${startDay} ${startYear}`
      }
      return ''
    },
    monthFormatter () {
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC', month: 'long',
      })
    },
    dateStartEdit(){
      this.timeStart = this.selectedEvent.start.split('T')[1]
      this.timeEnd = this.selectedEvent.end.split('T')[1]
      this.selectedEvent.start = this.selectedEvent.start.split('T')[0]
      this.selectedEvent.end = this.selectedEvent.end.split('T')[0]
      return ''
    },
  }, 
}
</script>
<style lang="less">
@import '../assets/css/calendar.less';
.v-event-draggable {
  padding-left: 6px;
}

.v-event-timed {
  user-select: none;
  -webkit-user-select: none;
}

.v-event-drag-bottom {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4px;
  height: 4px;
  cursor: ns-resize;

  &::after {
    display: none;
    position: absolute;
    left: 50%;
    height: 4px;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    width: 16px;
    margin-left: -8px;
    opacity: 0.8;
    content: '';
  }

  &:hover::after {
    display: block;
  }
}
</style>