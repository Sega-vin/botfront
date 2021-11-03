<template>
    <div class="lending">
        <div class="lending__intro">
            <h1 class="lending__title">Запишитесь в {{companyType.name}} <span>«{{companyName}}».</span></h1>
            <p class="lending__text">Тысячи человек уже записались к нам, через нашего чат-бота и рады выполненной работе.</p>
        </div>
        <div class="lending__widget widget">
          <div class="widget__figure widget__figure1" >
              <svg class="ellipseBig">
                <use href="../assets/ellipseBig.svg#ellipseBig"></use>
              </svg>
              <svg class="dotsVertical">
                <use href="../assets/dotsVertival.svg#dotsver"></use>
              </svg>
          </div>
          <div class="widget__figure widget__figure2">
              <svg class="ellipseBig">
                <use href="../assets/ellipseBig.svg#ellipseBig"></use>
              </svg>
          </div>
          <div class="widget__figure widget__figure3">
              <svg class="ellipseBig">
                <use href="../assets/ellipseBig.svg#ellipseBig"></use>
              </svg>
              <svg class="dotsVertical">
                <use href="../assets/dotsVertival.svg#dotsver"></use>
              </svg>
          </div>
          <botTest />  
          <div class="widget__figure widget__figure4">
              <svg class="ellipseBig">
                <use href="../assets/ellipseBig.svg#ellipseBig"></use>
              </svg>
          </div>
          <div class="widget__figure widget__figure5">
              <svg class="ellipseBig">
                <use href="../assets/ellipseBig.svg#ellipseBig"></use>
              </svg>
          </div>
          <div class="widget__figure widget__figure6">
              <svg class="ellipseBig">
                <use href="../assets/ellipseBig.svg#ellipseBig"></use>
              </svg>
              <svg class="dotsVertical">
                <use href="../assets/dotsVertival.svg#dotsver"></use>
              </svg>
          </div>
        </div>
    </div>
</template>

<script>
  import botTest from '@/components/BotTest'
  import {  getCompanyType } from '@/api/calendarApi'
  export default {
    name: 'lendingView' ,
    data: () => ({
      items: [],
      companyName: '',
      companyType: {},
    }),
    async mounted(){
      let project = this.$store.getters.project
      this.companyName = project.company_name ? project.company_name : null
      await this.getCompanyItems()
    },
    methods: {
      async getCompanyItems(){
        if(this.$store.getters.project.custom_company_type){ 
          this.companyType.name = this.$store.getters.project.custom_company_type
        }else{
          this.items = (await getCompanyType()).data.results
          this.companyType = this.items.find(item => item.id == this.$store.getters.project.company_type.id)
        }
        
      },
    },
    components: {
      botTest
    }
  
  }
</script>

<style lang="less">
@import '../assets/css/lending.less';

</style>