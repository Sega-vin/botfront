<template>
    <div class="login__wrapper">
        <validation-observer
        ref="observer"
        v-slot="{ invalid }"
        >
        <form @submit.prevent="submit()">
        <validation-provider
            v-slot="{ errors }"
            name="Имя"
            rules="required|max:255|min:6"
            >
            <v-text-field
            v-model="name"
            :error-messages="errors"
            :label="firstName"
            required
            ></v-text-field>
        </validation-provider>
        <validation-provider
            v-slot="{ errors }"
            name="Фамилия"
            rules="required|max:255|min:6"
            >
            <v-text-field
            v-model="last_name"
            :error-messages="errors"
            :label="lastName"
            required
            ></v-text-field>
        </validation-provider>
        <validation-provider
            v-slot="{ errors }"
            name="email"
            rules="required|email|max:255|min:6"
            >
            <v-text-field
            v-model="email"
            :error-messages="errors"
            label="E-mail"
            required
            ></v-text-field>
        </validation-provider>
        <validation-provider
            v-slot="{ errors }"
            name="Пароль"
            rules="required|max:68|min:6"
            >
            <v-text-field
            v-model="password"
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
            {{ $t('Send') }}
        </v-btn>
        <v-btn @click="clear">
            {{ $t('Clear') }}
        </v-btn>
        </form>
        </validation-observer>
        <div class="login__redirect-reg">{{ $t('alreadyReg') }}<router-link to="/">{{ $t('Login')}}</router-link></div>
    </div>
</template>
<script>
  import { required, digits, email, max, regex, min } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

  setInteractionMode('eager')

 
  extend('required', {
    ...required,
    message: '{_field_} не может быть пустым',
  })

  extend('max', {
    ...max,
    message: '{_field_} не может быть больше {length} символов',
  })

 extend('min', {
    ...min,
    message: '{_field_} не может быть меньше {length} символов',
  })

  extend('email', {
    ...email,
    message: 'Введите правильный Email',
  })

  export default {
    name: 'Register',
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
      name: '',
      password: '',
      email: '',
      errors: '',
      last_name: ''
    }),

    methods: {
      async submit (event) {
        const res = await this.$refs.observer.validate()
        if(res){ 
            const email = this.email
            const first_name = this.name
            const last_name = this.last_name
            const password = this.password
           try{
            await this.$store.dispatch('register', {email, first_name, last_name, password})
            this.$router.push('/login')
         } catch (err) {
           if(err.response){
             this.errors = err.response.data
           }
         }
          
        }
      },
      clear () {
        this.name = ''
        this.password = ''
        this.email = ''
        this.select = null
        this.checkbox = null
        this.$refs.observer.reset()
      },
    },
    computed: {
      pass(){
        return this.$t('Pass')
      },
      firstName(){
        return this.$t('firstName')
      },
      lastName(){
        return this.$t('lastName')
      },
    }
  }
</script>
<style lang="less" scoped>
  @import '../assets/css/login.less';
</style>