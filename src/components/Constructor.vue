<template>
  <div class="construct">
    <div class="btn-wrapper">
      <router-link :to = "{name: 'SimpleConstructView', params: {id: $route.params.id}}" >
        <v-btn class="save-btn" color="primary">{{ $t('SimplCon') }}</v-btn>
      </router-link>
      <router-link :to = "{name: 'LendingView', params: {id: $route.params.id}}" >
        <v-btn class="save-btn" color="primary">{{ $t('Lending') }}</v-btn>
      </router-link>
      <v-btn class="save-btn" color="primary" @click="show = true">{{ $t('TestBot') }}</v-btn>
      <v-btn class="save-btn" color="primary" @click="saveProject()">{{ $t('Save') }}</v-btn>
      <v-btn class="save-btn" color="primary" @click="clearProject()">{{ $t('Clear') }}</v-btn>
    </div>
    <v-row>
      <v-col 
        xl="2"
        lg="3" 
        md="3"
        sm="6"
        xs="12"
        :key="indexSection"  
        v-for="(panels, indexSection)  in sections"  
        class="section"
      > 
        <div class="main-wrapper"> 
          <section 
            class="section-panel" 
            :key="indexPanel"   
            v-for="(panel, indexPanel) in panels" 
          >
            <div 
              class="panel" 
              @click="addConnectEnd(indexSection, indexPanel)"
              :data-panel="panel.id"
              ref="panelName"
            > 
                          
              <!-- <v-btn            

                fab
                small
                right
                top
                class="delete-btn"
                @click="deletePanel(indexSection, indexPanel)"
              >  
                <v-icon >mdi-delete</v-icon>

              </v-btn> -->

         
              <div class="botAction action">
                <p>{{ $t('actionBot') }}</p>
                <div class="botActionWrapper action-item" 
                  :key="indexBot" 
                  v-for="(value, indexBot) in panel.botAction"
                  @click="editAction(panel.id + 'bot')"
                >
                  <v-btn 
                  fab
                  small
                  class="action-delete"
                  color="red"
                  @click="deleteAction(indexSection, indexPanel, indexBot, 'botAction')"
                  >
                  </v-btn>
                  <template v-if="editActive !== (panel.id + 'bot')"><strong>{{value.text}}</strong></template>
                    <template v-else>
                      <input
                        class="edit-field"
                        v-model="value.text"
                        @change="editActive = null"
                        type="text"
                      >
                      
                    </template> 
                </div>
                <v-btn 
                  color="primary" 
                  @click="dialogBot = true, setBotActivePanel(indexSection, indexPanel)"
                >
                  {{ $t('addAction') }}
                </v-btn>
              </div> 
              <div class="userAction action">
                <p>{{ $t('actionUser') }}</p>
                <div class="userActionWrapper action-item" 
                  :key="indexUser" 
                  v-for="(value, indexUser) in panel.userAction"                  
                  :ref="'connect'"
                  :data-connect="value.connect"
                >
                  <v-btn 
                  fab
                  small
                  class="action-delete"
                  color="red"
                  @click="deleteAction(indexSection, indexPanel, indexUser, 'userAction')"
                  >
                  </v-btn>
                  <v-btn 
                  @click="addConnectStart(indexSection, indexPanel, indexUser)"
                  :class="{'connectActive': connectStart == sections[indexSection][indexPanel].userAction[indexUser]}"
                  fab 
                  small 
                  color="primary"
                  class="connect-btn"
                  >
                  </v-btn>
                  <v-btn 
                    small 
                    color="primary"
                    class="action-btn-user action-item"
                    @click="editAction(panel.id + 'user')"
                  >
                    <template v-if="editActive !== (panel.id + 'user')">{{value.text}}</template>
                    <template v-else>
                      <input
                        class="edit-field"
                        v-model="value.text"
                        @change="editActive = null"
                        type="text"
                      >
                      
                    </template> 
                  </v-btn>  
                </div>
                <v-btn 
                  color="primary" 
                  @click="dialogUser = true, setUserActivePanel(indexSection, indexPanel)"
                >
                  {{ $t('addAction') }}
                </v-btn>
              </div>
            </div>
            <v-btn 
              v-if="panels[panels.length - 1] == panels[indexPanel]"
              color="white"
              class="dark--text button-center"
              fab
              small
              right
              top
              @click="addPanel(indexSection, panel.id)"
              >  
              <v-icon dark>mdi-plus</v-icon>
          </v-btn>
          </section>
        </div>
        <v-btn 
        v-if="sections[sections.length - 1] == sections[indexSection]"
          color="white"
          class="dark--text button-absolute"
          fab
          small
          right
          top
          @click="addSection(indexSection)"
          >  
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <botActionModal :dialogBot.sync="dialogBot" @botActionInfo="addActionBot($event)"></botActionModal>
    <userActionModal :dialogUser.sync="dialogUser" @userActionInfo="addActionUser($event)"></userActionModal>
    <botTestModal :show.sync="show"></botTestModal>
  </div>
</template>

<script>
  import botActionModal from  './partials/BotActionModal'
  import userActionModal from './partials/UserActionModal'
  import botTestModal from './partials/BotTestModal'
  import  { getConfig }  from '@/jsonData/botConfig'
  
  import LeaderLine from '@/plugins/leader-line-vue';
  import { ConstructDifGet, ConstructDifPatchId } from '@/api/constructorApi'

export default {
  name: "Constructor",
  data: () => ({
    sections: [
      [
        {
          id: 1,
          botAction: [],
          userAction: []
        }
      ]
    ],
    canvas: [],
    dialogBot: false,
    dialogUser: false,
    activePanel: null,
    connectStart: null,
    connectEnd: null,
    panelStart: null,
    canvasDom: null,
    editActive: false,
    show: false
  }),
  mounted(){
    this.getProject()
  },
  methods: {
    // fetch 
    async saveProject(){
      let botConfig = []
      this.sections.forEach(item => {
        item.forEach(items => {
          botConfig.push(items)
        })
      })
      let construct = JSON.stringify(this.sections)
      botConfig = JSON.stringify(botConfig)
      console.log(construct)

      const data = {
        construct: construct,
        dialog_config: botConfig
      }
      try{
        await ConstructDifPatchId(data, this.$store.getters.project.id)
      }catch(err){
        console.log(err)
      }    
    },
    async getProject(){
      try{
        // let construct = await ConstructDifGet(this.$route.params.id)
        const bot = await getConfig()
        if(bot.construct !== null){
          this.sections = JSON.parse(bot.construct)
        }
        this.$nextTick(()=>{
          this.addCanvas()
        })
      }catch(err){
        console.log(err)
      }     
    },
    clearProject(){
      this.sections = [
        [
          {
            id: 1,
            botAction: [],
            userAction: []
          }
        ]
      ]
      let line = document.querySelectorAll('.leader-line')
      line.forEach(item => {
        item.parentNode.removeChild(item)
      })
    },
    // add panels
    addSection(indexSection){
      const newIndex = indexSection + 1
      this.sections.push([{
        id: Number(newIndex + '0'),
        botAction: [],
        userAction: []
      }])
      
    },
    addPanel(indexSection, PanelId){   
      const newIndex = PanelId + 1
      this.sections[indexSection].push({
        id: newIndex,
        botAction: [],
        userAction: []
      })
    },
    // crud panel
    deletePanel(indexSection, indexPanel){
      //console.log(this.sections[indexSection])
      //this.sections[indexSection].splice([indexPanel], 1)
      //console.log(this.sections[indexSection])
    },
    deleteAction(indexSection, indexPanel, indexAction, typeAction){
     this.sections[indexSection][indexPanel][typeAction].splice([indexAction], 1)
      
    },
    editAction(id){
      this.editActive = id
    },
    // add actions
    setBotActivePanel(indexSection, indexPanel){
      this.activePanel = this.sections[indexSection][indexPanel].botAction
    },
    addActionBot(info){
     this.activePanel.push({text: info}) 
     this.activePanel = null
    },
    setUserActivePanel(indexSection, indexPanel){
      this.activePanel = this.sections[indexSection][indexPanel].userAction
    },
    addActionUser(obj){
      console.log(obj)
      this.activePanel.push(obj) 
      this.activePanel = null
    },
    // add connects 
    addConnectStart(indexSection, indexPanel, idAction){
      this.connectStart =  this.sections[indexSection][indexPanel].userAction[idAction]
      this.panelStart = this.sections[indexSection][indexPanel]
    },
    addConnectEnd(indexSection, indexPanel){
      if(this.connectStart !== null && this.panelStart !== this.sections[indexSection][indexPanel]){
        this.connectStart.connect = this.sections[indexSection][indexPanel].id  
        this.connectStart = null
      }
      this.$nextTick(()=>{
        this.addCanvas()
      })
    },
    // add canvas
    addCanvas(){
      if(this.$refs.connect){
        let line = document.querySelectorAll('.leader-line')
        line.forEach(item => {
          item.parentNode.removeChild(item)
        })
        this.$refs.connect.forEach(connect => {
            this.$refs.panelName.forEach(panels => { if(connect.dataset.connect == panels.dataset.panel){
              this.canvas.push({connect, panels})
              LeaderLine.setLine(connect, panels);
            } })    
        })
      } 
    }, 
  },
  computed: {
   hoverMenu () {
     switch (this.$vuetify.breakpoint.name) {
       case 'sm': return 'expand-on-hover'
     }
   }
  },
  components: {
    botActionModal,
    userActionModal,
    botTestModal
  },
  directives: {

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
   
</style>
