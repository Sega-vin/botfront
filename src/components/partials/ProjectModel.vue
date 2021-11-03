<template>
  <v-row justify="center">
    <v-dialog
      v-model="showModal"
      max-width="500px"
      @click:outside="hide()"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Создание проекта</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" >
                <v-text-field
                  v-model="projectName"
                  solo
                  label="Введите название проекта"
                  clearable
                ></v-text-field>
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
  export default {
      props: {
        showModal: Boolean,
        error: Array
      },
      name: 'projectModal',
      data: () => ({
        projectName: ''
      }),
      methods: {
        hide(){
          this.$emit('update:showModal', false)
        },
        saveAction(){
          if(this.projectName.trim() !== ''){
            this.$emit('projectInfo', 
            this.projectName.trim())
            this.hide()
            this.projectName = ''
        }
      }
    }
  }
</script>