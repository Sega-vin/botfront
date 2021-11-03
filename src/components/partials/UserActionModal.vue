<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialogUser"
      max-width="500px"
      @click:outside="hide()"
    >
      <v-card class="dialogUser">
        <v-card-title>
          <span class="headline">Выберите действие пользователя</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-btn
                class="ma-2"
                outlined
                color="primary"
                :key="index"
                v-for="(value, index) in btnAction"
                @click="createAction(value.type)"
                :class="{'activeAction': value.type == actionType}"
              >
                {{value.text}}
                </v-btn>
              </v-col>
              <v-row 
                v-if="actionType == 'VariableBtn'"
              >
                <v-col cols="12" >
                  <v-text-field
                    v-model="info"
                    solo
                    label="Введите текст кнопки"
                    clearable
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="hide()"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="saveAction()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  export default {
    props: {
      dialogUser: Boolean,
    },
    name: 'userActionModal',
    data: () => ({
      btnAction: [
        {type: 'VariableBtn', text: 'Кнопки'},
        {type: 'TextInput', text: 'Произвольный текст'},
        {type: 'getSpecialty', text: 'Выбрать специализацию'},
        {type: 'getServices', text: 'Выбрать услугу'},
        {type: 'getDoctor', text: 'Выбрать врача'},
        {type: 'getDate', text: 'Выбрать дату'},
        {type: 'getTime', text: 'Выбрать Время'},
        {type: 'getName', text: 'Ввести имя'},
        {type: 'saveEvent', text: 'Сохранить запись'},
      ],
      actionType: null,
      info: '' 
    }),
    methods: {
      hide(){
        this.$emit('update:dialogUser', false)
      },
      createAction(type){
        this.actionType = type
        switch (type) {
          case ('getSpecialty'):
            this.info = 'Выбрать специализацию'
            break;

          case ('getServices'):
            this.info = 'Выбрать услугу'
            break;

          case ('getDoctor'):
            this.info = 'Выбрать врача'
            break;

          case ('getDate'):
            this.info = 'Выбрать дату'
            break;

          case ('getTime'):
            this.info = 'Выбрать время'
            break;

          case ('getName'):
            this.info = 'Ввести имя'
            break;

          case ('saveEvent'):
            this.info = 'Сохранить запись'
            break;
            
          default:
            break;
        }
      },
      saveAction(actionType){
        if(this.info.trim() !== ''){
          this.$emit('userActionInfo', 
          {
            type: this.actionType,
            text: this.info.trim()
          })
          this.hide()
          this.info = ''
          this.actionType = null
        }
      }
    }
  }
</script>