<template>
  <div> 
    <v-container><Calendar/></v-container>
    
  </div> 
</template>

<script>
// @ is an alias to /src
import Calendar from '../components/Calendar.vue';

export default {
  name: "CalendarView",
  components: {
    Calendar
  }
};
</script>
