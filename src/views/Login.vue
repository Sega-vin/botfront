<template>
    <div class="login__wrapper">
        <validation-observer
        ref="observer"
        v-slot="{ invalid }"
        >
            <form @submit.prevent="submit">
                <validation-provider
                    v-slot="{ errors }"
                    name="email"
                    rules="required|email"
                    mode="aggressive"
                    >
                    <v-text-field
                    type="email"
                    v-model="email"
                    :error-messages="errors"
                    label="E-mail"
                    required
                    ></v-text-field>
                </validation-provider>
                <validation-provider
                    v-slot="{ errors }"
                    name="password"
                    rules="required"
                    mode="aggressive"
                    >
                    <v-text-field
                    v-model="password"
                    :counter="15"
                    type="password"
                    :error-messages="errors"
                    :label="pass"
                    required
                    ></v-text-field> 
                </validation-provider>
                <div class="errors" v-for="(error, index) in errors" :key="index">
                  <div class="" v-for="(err, index1) in error" :key="index1" color="red">
                    {{ err }}
                  </div>
                </div>
                <v-btn
                    class="mr-4"
                    type="submit"
                    :disabled="invalid"
                    >
                    {{ $t('Send')}}
                </v-btn>
                <v-btn @click="clear">
                    {{ $t('Clear')}}
                </v-btn>
            </form>
        </validation-observer>
        <div class="login__redirect-reg">{{ $t('notAccount?')}}<router-link to="/register">{{ $t('Register')}}</router-link></div>
    </div>
</template>
<script>
  import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

  setInteractionMode('eager')

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })



  extend('email', {
    ...email,
    message: 'Email must be valid',
  })

  export default {
    name: 'Login',
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
      password: '',
      email: '',
      errors: []
    }),

    methods: {
      async submit (event) {
        const res = await this.$refs.observer.validate()
        if(res){ 
         let email = this.email
         let password = this.password
         try{
            await this.$store.dispatch('login', {email, password})
            await this.$store.dispatch('getUser')
            this.$router.push('/')
         } catch (err) {
           if(err.response){
             this.errors = err.response.data
           }
         }
         
      
     
        }
      },
      clear () {
        this.password = ''
        this.email = ''
        this.$refs.observer.reset()
      },
    },
    computed: {
      pass(){
        return this.$t('Pass')
      },
      emptyField(){
        return this.$t('emptyField')
      },
      validEmail(){
        return this.$t('validEmail')
      },
    }
  }
</script>
<style lang="less" scoped>
  @import '../assets/css/login.less';
</style>