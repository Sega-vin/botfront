<template>
<v-container>
  <div class="profile">
    <h2 class="profile__title">Мой профиль</h2>
    <ul class="profile__list">
      <li>Имя: <span class="ml">{{name}}</span></li>
      <li>Фамилия: <span class="ml">{{last_name}}</span></li>
      <li>Email: <span class="ml">{{email}}</span></li>
    </ul>
  </div>
</v-container>
</template>
<script>
export default {
  name: "Profile",
  computed: {
    name () {
      return this.$store.getters.user.first_name
    },
    last_name(){
      return this.$store.getters.user.last_name
    },
    email () {
      return this.$store.getters.user.email
    }
  }
}
</script>
<style lang="less">
  @import '../assets/css/profile.less';
</style>