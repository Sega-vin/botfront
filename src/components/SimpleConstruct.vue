<template>
  <div class="simpleCon simpleCon__wrapper" >
    <v-stepper
      v-model="e6"
      vertical
    >
      <v-stepper-step
        :complete="e6 > 1"
        step="1"
      >
        {{ $t('Staffers')}}
        <small>{{ $t('addStaffers')}}</small>
      </v-stepper-step>

      <v-stepper-content step="1" class="simpleCon__step">
        <div class="simpleCon__content">
          <v-expansion-panels class="simpleCon__list">
              <v-expansion-panel
                v-for="(item, i) in staffers"
                :key="i"
              >
              <v-expansion-panel-header>
                {{item.name}}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div class="range">   
                <p class="range__day">Пн.</p>
                  <v-range-slider
                    v-model="range"
                    :max="max"
                    :min="min"
                    step="300000"
                    hide-details
                    class="align-center"
                  >
                    <template v-slot:prepend>
                      <v-text-field
                        :value="startTime"
                        class="mt-0 pt-0"
                        hide-details
                        single-line
                        type="time"
                        style="width: 60px"
                        @input="changeStart($event)"
                      ></v-text-field>
                    </template>
                    <template v-slot:append>
                      <v-text-field
                        :value="endTime"
                        class="mt-0 pt-0"
                        hide-details
                        single-line
                        type="time"
                        style="width: 60px"
                        @input="changeEnd($event)"
                      ></v-text-field>
                    </template>
                  </v-range-slider>
                </div> 
                <input type="checkbox" id="la"><label for="la">Продублировать график на год</label>
              </v-expansion-panel-content>
              </v-expansion-panel>
          </v-expansion-panels>
          <v-text-field
            class="simpleCon__field"
            v-model="stafferName"
            label="Введите имя сотрудника"
          ></v-text-field>
          <v-btn color="primary" @click="addStaffer()" class="simpleCon__btnAdd">{{$t('Add')}}</v-btn>
        </div>
        <v-btn
          color="primary"
          @click="e6 = 2"
        >
          {{$t('Continue')}}
        </v-btn>
      </v-stepper-content>
 
      <v-stepper-step
        :complete="e6 > 2"
        step="2"
      >
        {{$t('Specials')}}
      </v-stepper-step>

      <v-stepper-content step="2">
        <div class="simpleCon__content">
          <v-list class="simpleCon__list">
              <v-list-group
                :value="true"
                no-action
                sub-group
                v-for="(item, i1) in specialists"
                :key="i1"
              >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                    
                  </v-list-item-content>
                </template>
              </v-list-group>
              <v-text-field
                class="simpleCon__field"
                v-model="serviceName"
                label="Введите специализацию сотрудника"
              ></v-text-field>
              <v-btn color="primary" @click="addSpecialization()" class="simpleCon__btnAdd">{{$t('Add')}}</v-btn>
          </v-list>
        </div>
        <v-btn
          color="primary"
          @click="e6 = 1"
          class="simpleCon_btnBack"
        >
        {{$t('Back')}}
        </v-btn>
        <v-btn
          color="primary"
          @click="e6 = 3"
        >
          {{$t('Continue')}}
        </v-btn>
      </v-stepper-content>

      <v-stepper-step
        :complete="e6 > 3"
        step="3"
      >
        {{$t('Services')}}
      </v-stepper-step>

      <v-stepper-content step="3">
        <div class="simpleCon__content">
          <v-list class="simpleCon__list">
              <v-list-group
                :value="true"
                no-action
                sub-group
                v-for="(item, i1) in services"
                :key="i1"
              >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.name }} {{ item.price }}</v-list-item-title>
                    
                  </v-list-item-content>
                </template>
                
              </v-list-group>
              <div class="subService__fields">
                  <v-text-field
                    class="subService__field"
                    v-model="subServiceName"
                    label="Введите название услуги"
                  ></v-text-field>
                  <v-text-field
                    class="subService__field"
                    v-model="subServicePrice"
                    type="number"
                    label="Введите стоимость услуги"
                  ></v-text-field>
                </div>
                <v-btn color="primary" class="btn-service" @click="addServices()">{{$t('addService')}}</v-btn>
          </v-list>
        </div>
        <v-btn
          class="simpleCon_btnBack"
          color="primary"
          @click="e6 = 2"
        >
        {{$t('Back')}}
        </v-btn>
        <v-btn
          color="primary"
          @click="e6 = 4"
        >
          {{$t('Continue')}}
        </v-btn>
      </v-stepper-content>

      <v-stepper-step
        :complete="e6 > 4"
        step="4"
      >
        {{ $t('Connections')}}
        <small>{{ $t('ConnectStaffers')}}</small>
      </v-stepper-step>

      <v-stepper-content step="4">
        <div class="simpleCon__content">
          <v-row>
            <v-col
              v-for="(item, i) in staffers"
              :key="i"
              cols="2"
            >      
              <div class="simpleCon__staffer">
                <p>{{item.name}}</p>
                  <v-btn 
                    color="white"
                    class="dark--text simpleCon__addStaffer"
                    fab
                    small
                    @click="showMenu($event, item.id)"
                  >  
                  <v-icon dark>mdi-paperclip</v-icon>
                </v-btn>
              </div>
              
          </v-col>
          </v-row>
        </div>
          <v-btn
            class="simpleCon_btnBack"
            color="primary"
            @click="e6 = 3"
          >
            {{$t('Back')}}
          </v-btn>
          <v-btn
            color="primary"
            @click="save()"
          >
            {{$t('Continue')}}
          </v-btn>
      </v-stepper-content>
    </v-stepper>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :close-on-click="false"
      :nudge-width="250"
      offset-x
      :activator="selectedElement"
    >
      <v-card>
        <v-btn @click="menu = false">закрыть</v-btn>
        <v-divider></v-divider>
        <p>Специализации</p>
        <ul class="list-group" >
            <li 
              class="list-item list-item-flex" 
              :key="index" 
              v-for="(value, index) in specialists" 
            > 
                <v-btn 
                  color="primary" 
                  v-if="selectedSpecialist.indexOf(value.id) == -1" 
                  @click="addSpecializationInStaff(value.id)"
                >
                  добавить
                </v-btn>
                
                <v-btn 
                  color="error" 
                  v-if="selectedSpecialist.indexOf(value.id) !== -1"
                  @click="deleteSpecializationInStaff(value.id)"
                >
                  удалить
                </v-btn>
                <p>{{ value.title }}</p>
              <v-btn 
                color="white"
                class="dark--text"
                small
                right
                top
                @click="showSubMenu($event, value.id)"
                >  
                <v-icon dark>mdi-plus</v-icon>
              </v-btn>
            </li>
        </ul>
      </v-card>
    </v-menu>
    <v-menu
      v-model="subMenu"
      :close-on-content-click="false"
      :nudge-width="230"
      offset-x
      :activator="selectedSubElement"
    >
      <v-card>
        <v-divider></v-divider>

        <p>Услуги</p>
        <ul class="list-group" >
            <li class="list-item" :key="index" v-for="(value, index) in services">
                <v-btn 
                  color="primary" 
                  v-if="selectedServices.indexOf(value.id) == -1" 
                  @click="addServicesInSpecialists(value.id)"
                >
                  добавить
                </v-btn>
                
                <v-btn 
                  color="error" 
                  v-if="selectedServices.indexOf(value.id) !== -1"
                  @click="deleteServicesInSpecialists(value.id)"
                >
                  удалить
                </v-btn>
                <p>{{ value.name }}</p>
            </li>
        </ul>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { addCalendar, getCalendar, updateCalendar, addServices, getServices, patchServices, getServicesToSpecialization, getSpecializationToServices, addSpecialization, getSpecialization, patchConstructor, getSpecializationToStaff, patchSpecialization, getStaffToSpecialization } from '@/api/calendarApi'
import { ConstructDifPatchId } from '@/api/constructorApi'
import  { bot }  from '@/jsonData/botConfig'

function timeToMs(time){
    const hours = time.split(":")[0] * 60000 * 60;
    const minutes = time.split(":")[1] * 60000;
    return hours + minutes;
}

export default {
  name: "SimpleConstruct",
  data: () => ({
    selected: [],
    selectedElement: null,
    selectedSubElement: null,
    selectedCalendar: null,
    menu: false,
    subMenu: false,
    e6: 1,
    staffers: [],
    staffersObj: [],
    stafferName: null,
    serviceName: null,
    subServiceName: null,
    subServicePrice: null,
    ServicesToSpecialists: [],
    dragStart: false,
    min: 68400900,
    max: 154799000,
    range: [68400900, 154799000],
    services: [],
    specialists: [],
    specialistsToStaff: [],
    selectedSpecialist: [],
    selectedServices: [],
    selectedId: null,
    selectedIdServices: null,
  }),
  async mounted(){
    await this.getStaffer()
    await this.getSpecialization()
    await this.getServices()
  },
  methods: {
    async save(){
      try{
        await ConstructDifPatchId(bot, this.$store.getters.project.id)
        this.$router.push(`/`)
      }catch(e){
        console.log(e)
      }
    },
    async addStaffer(){
      if(this.stafferName){
        await addCalendar({
            name: this.stafferName,
            constructor:  this.$store.getters.project.id     
        })
        this.stafferName = ''
        this.getStaffer()
      }
    },
    async getStaffer(){
      try{
        this.staffers = (await getCalendar(this.$store.getters.project.id)).data
      }catch(e){
        throw e
      }
    },

    // Services actions:

    async getServices(){
      try{
        this.services = (await getServices(this.$store.getters.project.id)).data
      }catch(e){
        throw e
      }
    },
    async addServices(){
      try{
        await addServices({
          name: this.subServiceName, 
          price: this.subServicePrice,
          constructor: this.$store.getters.project.id
        })
      }catch(e){
        throw e
      }
      this.subServicePrice = ''
      this.subServiceName = ''
      this.getServices()
    },
    async showSubMenu(event, id){

      this.selectedSubElement = event.target
      this.selectedIdServices = id

      this.upgrateSelectedServices(this.selectedIdServices)
      this.subMenu = true
    },
    async addServicesInSpecialists(id){
      let specialization = (await getSpecializationToServices(id)).data
    
      specialization = specialization.length > 0 ?  specialization.specialization : []

      await patchServices(id, {
        specialization: [this.selectedIdServices, ...specialization], 
      })
      this.upgrateSelectedServices(this.selectedIdServices)
    },
    async deleteServicesInSpecialists(id){
      let specialization = (await getSpecializationToServices(id)).data.specialization
   
      // specialization = specialization.length > 0 ?  specialization.specialization : []
      
      specialization = specialization.filter(item => item !== this.selectedIdServices)
      await patchServices(id, {
        specialization: [...specialization], 
      })
      this.upgrateSelectedServices(this.selectedIdServices)
    },
    async upgrateSelectedServices(id){
      this.selectedServices = []  

      this.ServicesToSpecialists = (await getServicesToSpecialization(id)).data

      this.ServicesToSpecialists.forEach(item => {
        this.selectedServices.push(item.id)
      })
    },

    // Specializations actions:

    async getSpecialization(){
      try{
        this.specialists = (await getSpecialization(this.$store.getters.project.id)).data
      }catch(e){
        throw e
      }
    },
    async addSpecialization(){
      await addSpecialization({
        title: this.serviceName, 
        constructor: this.$store.getters.project.id
      })
      this.getSpecialization()
    },
    async showMenu(event, id){
      this.selectedElement = event.target
      this.selectedId = id
      this.upgrateSelectedSpecialist(this.selectedId)
      this.menu = true
    },
    async upgrateSelectedSpecialist(id){
      this.selectedSpecialist = []  

      this.specialistsToStaff = (await getSpecializationToStaff(id)).data

      this.specialistsToStaff.forEach(item => {
        this.selectedSpecialist.push(item.id)
      })
    },
    async addSpecializationInStaff(id){
      let staffs = (await getStaffToSpecialization(id)).data.staff
      await patchSpecialization(id, {
        staff: [this.selectedId, ...staffs], 
      })
      this.upgrateSelectedSpecialist(this.selectedId)
    },
    async deleteSpecializationInStaff(id){
      let staffs = (await getStaffToSpecialization(id)).data.staff
      staffs = staffs.filter(item => item !== this.selectedId)
      await patchSpecialization(id, {
        staff: [...staffs], 
      })
      this.upgrateSelectedSpecialist(this.selectedId)
    },
    changeStart(val){
      this.range[0] = timeToMs(val)
      console.log(this.range)
    },
    changeEnd(val){
      this.range[1] = timeToMs(val)
      console.log(this.range)
    },
  },
  computed: {
    startTime(){
      return new Date(this.range[0]).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    },
    endTime(){
      return new Date(this.range[1]).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    },
  },
  components: {
 
  }
};
</script>
<style lang="less">
@import '../assets/css/simpleConstruct.less';
</style>