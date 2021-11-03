<template>
  <div class="appSelect simpleCon__input">
    <p class="appSelect__title appInput" @click="showSelect()">
      {{selected.name}}
    </p>
    <ul v-if="visible" class="appSelect__list" @click="hideSelect()">
      <li 
        class="appSelect__listitem"
        v-for="(item, index) in items" 
        :key="index"
        @click="selectOption(item)"
      >{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        default() {
          return []
        }
      },
      selected: {
        type: Object,
        default: {}
      },
      visible: {
        type: Boolean,
        default: false
      }
    },
    name: 'AppSelect',
    data: () => ({
    }),
    methods: {
     selectOption(item){
       this.$emit('select', item)
     },
     hideSelect(){
       this.$emit('update:visible', false)
     },
     showSelect(){
       this.$emit('update:visible', true)
     }
    },
    mounted(){
      document.addEventListener('click', this.hideSelect.bind(this), true)
    },
    beforeDestroy() {
      document.removeEventListener('click', this.hideSelect)
    }
  }
</script>

<style lang="less">
  .appSelect{
    position: relative;
    cursor: pointer;
    &__title{
      min-height: 42px;
    }
    &__list{
      position: absolute;
      top: 0;
      left: 0;
      z-index: 5;
      background-color: var(--meduim-1-color);
      width: 100%;
      border-radius: 4px;
      box-shadow: 0px 0px 8px var(--main-color);
    }
    &__listitem{
      padding: 8px !important;
      transition: all .3s;
      &:hover{
        background-color: var(--neutral-color);
        transition: all .3s;
      }
    }
  }
</style>