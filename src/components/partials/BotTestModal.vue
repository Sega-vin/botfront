<template>
  <v-dialog
    v-model="show"
    @click:outside="hide()"
    max-width="700px"
  >
    <botTest />
  </v-dialog>
</template> 
<script>
  import botTest from '@/components/BotTest'
 export default{
   props: {
      show: Boolean,
    },
    methods: {
      hide(){
        this.$emit('update:show', false)
      },
    },
    components: {
      botTest
    }
      
 }
</script>