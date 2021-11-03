<template>
  <div class="main-layout-wrapper">
    <Sidebar />
    <!-- <v-container> -->
      <v-main class="view-container">  
        <router-view />
      </v-main>
    <!-- </v-container>  -->
  </div>
</template> 
<script>
  import Sidebar from '@/components/partials/Sidebar'
  import { Project } from "@/api/constructorApi";
  export default { 
    name: 'main-layout',   
    components: {
      Sidebar
    }
  }
</script>