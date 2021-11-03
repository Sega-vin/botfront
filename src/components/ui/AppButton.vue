<template>
  <button class="AppBtn" :class="color">

  </button>
</template>

<script>
export default {
 props: {
   color: {
     type: String,
     default: '#C4C4C4'
   }
 }
}
</script>

<style>

</style>