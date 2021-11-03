<template>
  <div class="project project__wrapper">
    <v-row class="project__row">
      <v-col
        xl="2"
        lg="3" 
        md="3"
        sm="6"
        xs="12"
        :key="index"
        v-for="(item, index) in constructors"
      >
        <v-card
          class="project__item"
        >
          <v-icon color="grey" class="project__delete" @click="deleteProject(item.id)">mdi-delete</v-icon>
          <v-card-text>
            <div>{{ item.name }}</div>
          </v-card-text>
          <v-card-actions>
            <router-link :to = "{name: 'construct', params: {id: item.id}}" >
            <v-btn
              text
              color="teal accent-4"
            >
              {{ $t('Open') }}
            </v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col
        xl="2"
        lg="3" 
        md="3"
        sm="6"
        xs="12"
        
      >
        <v-card 
          class="project__add"
          @click="showModal = true"
        >
          <v-btn
            text
            color="teal accent-4"
            class="btn-add" 
            
          >
            {{ $t('CreateProj') }}
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
    <ProjectModal :showModal.sync="showModal" @projectInfo="createProject($event)"></ProjectModal>
  </div>
</template>

<script>
import ProjectModal from "@/components/partials/ProjectModel"
import {Project, ConstructDifPost, ConstructDifDeleteId} from '@/api/constructorApi'
export default {
  name: "Project",
  data: () => ({
    constructors: [],
    showModal: false,
    error: ''
  }),
  mounted(){
    this.getProject()
  },
  methods: {
    async getProject(){
      try{
        const config = await Project() 
        this.constructors = config.data.results
        console.log(config) 
      } catch (err) {
        console.log(err.response)  
      } 
    },
    async createProject(name){
      const data = {
        name: name
      }
      try{
        await ConstructDifPost(data)
        this.getProject()
      } catch (err) {
        console.log(err.response) 
      }
    },
    async deleteProject(id){
      try{
        await ConstructDifDeleteId(id)
        this.getProject()
      } catch (err) {
        console.log(err.response) 
      }
    }
  },
  components: {
    ProjectModal
  }
};
</script>
<style lang="less" scoped>
  @import '../assets/css/project.less';
  
</style>