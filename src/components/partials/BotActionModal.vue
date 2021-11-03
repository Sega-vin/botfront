<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialogBot"
      max-width="500px"
      @click:outside="hide()"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Выберите действие бота</span>
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
              >
                {{value.text}}
                </v-btn>
              </v-col>
              <v-col cols="12" v-if="actionType == 'info'">
                <v-textarea
                  solo
                  name="input-7-4"
                  label="Сообщение чат-бота"
                  v-model="botInfo"
                ></v-textarea>
              </v-col>
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
  import i18n from '@/plugins/localization'
  export default {
    props: {
      dialogBot: Boolean,
      BotActionVar: String
    },
    name: 'botActionModal',
    data: () => ({
      btnAction: [{type: 'info', text: i18n.t('displayText')}], 
      actionType: null,
      botInfo: ''
    }),
    methods: {
      hide(){
        this.$emit('update:dialogBot', false)
      },
      createAction(type){
        this.actionType = type
      },
      saveAction(){
        if(this.botInfo.trim() !== ''){
          this.$emit('botActionInfo', this.botInfo.trim())
          this.hide()
          this.botInfo = ''
          this.actionType = null
        }
      },
    },
    computed: {
      displayText(){
        return this.$t('displayText')
      }
    }
  }
</script>