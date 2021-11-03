<template>
  <v-app class="main-back">
    <v-select
      class="lang-select"
      :items="states"
      menu-props="auto"
      label="Select"
      hide-details
      prepend-icon="mdi-map"
      single-line
      v-model="lang"
      @change="setLocale()"
    ></v-select>
    <component :is="layout">  
      <router-view /> 
    </component> 
    </v-app> 
</template>
<script>

import EmptyLayout from '@/layouts/EmptyLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import { flagIcon } from 'vue-flag-icon'
import { Project, ConstructDifPost } from "@/api/constructorApi";

export default {
  name: 'App',
  async mounted(){
    if(!Object.keys(this.$store.getters.user).length){
      try{
        await this.$store.dispatch('getUser')
        await this.$store.dispatch('getProject', this.$store.state.auth.user.id)
        this.setColor()
      }catch{
        this.$store.dispatch('logout')
        this.$router.push('login')
      }
    }
  },
  data: () => ({
    states: [
      'ru', 'en'
    ],
    lang: 'ru',
    colors: []
  }),
  computed: {
    layout() {
      console.log(this.$route.meta)
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  },
  methods: {
    setLocale(){
      this.$i18n.locale = this.lang
    },
    setColor(){
      if(this.$store.getters.project.color){
        console.log('i setting')
      let colors = this.$store.getters.project.color
      let bodyStyles = document.body.style;
      bodyStyles.setProperty('--superdark-color', colors[0].value)
      bodyStyles.setProperty('--dark-color', colors[1].value)
      bodyStyles.setProperty('--main-color', colors[2].value)
      bodyStyles.setProperty('--main-1-color', colors[3].value)
      bodyStyles.setProperty('--neutral-color', colors[4].value) 
      bodyStyles.setProperty('--meduim-color', colors[5].value)
      bodyStyles.setProperty('--meduim-1-color', colors[6].value)
      bodyStyles.setProperty('--lite-color', colors[7].value)

      this.colors = { 
       superdark: {
          name: "superdark",
          value: colors[0],
        },
        dark: {
          name: "dark",
          value: colors[1],
        },
        brand: {
          name: "main",
          value: colors[2],
        },
        main1: {
          name: "main-1",
          value: colors[3],
        },
        main2: {
          name: "main-2",
          value: colors[4],
        },
        meduim: {
          name: "meduim",
          value: colors[5]
        },
        meduim1: {
          name: "meduim1",
          value: colors[6],
        },
        lite: {
          name: "lite",
          value: colors[7],
        },
      };
      }
    }
  },
  components: {
    EmptyLayout, 
    MainLayout
  }
}
</script>
<style lang="less">
#nav {
  padding: 30px;
  text-align: center;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

@import './assets/css/main.less';
</style>
