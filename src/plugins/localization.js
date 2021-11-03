import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'ru',
  fallbackLocale: 'en',
  messages: {
    en: {
      // construct
      'selectBotAct': 'Select the bot action',
      'displayText': 'display the text',
      "actionBot": 'The action of the bot',
      "actionUser": 'The action of the user',
      "addAction": 'Add an action',
      "Save": 'Save',
      "Clear": 'Clear',
      'Lending': 'Lending',
      'TestBot': 'bot test',
      'SimplCon': 'Simple construct',
      // sidebar
      "Menu": 'Menu',
      "Project": 'Project',
      "Profile": 'Profile',
      "TestBot": 'Testing bot',
      "Calendar": 'Calendar',
      "Logout": 'Logout',
      // login page and reg page
      "Send": 'Send',
      "Pass": 'Password',
      'notAccount?': 'haven`t account?',
      'Register': 'Register',
      'validEmail': 'Email must be valid',
      'emptyField': 'can not be empty',
      'alreadyReg': 'already registered?',
      'Login': 'Login',
      'firstName': 'First name',
      'lastName': 'Last name',
      /// simple con
      'Staffers': 'Staffers',
      'addStaffers': 'add staffers to your organization',
      'Continue': 'Continue',
      'Cancel': 'Cancel',
      'Services': 'Services',
      'Specials': 'Specializations',
      'addService': 'Add service',
      'Back': 'Back',
      'Connections': 'Connections',
      'ConnectStaffers': 'connect staffers to services',
      // project page
      'Open': 'Open',
      'CreateProj': 'Create Project'
    },
    ru: {
      // construct
      'selectBotAct': 'Выберите действие бота',
      'displayText': 'Вывести текст',
      "actionBot": 'Действие бота',
      "actionUser": 'Действие пользователя',
      "addAction": 'Добавить действие',
      "Save": 'Сохранить',
      "Clear": 'Очистить',
      'Lending': 'Лендинг',
      'TestBot': 'Тест бота',
      'SimplCon': 'Простой конструктор',
      // sidebar
      "Menu": 'Меню',
      "Project": 'Проекты',
      "Profile": 'Мой профиль',
      "TestBot": 'Тест бота',
      "Calendar": 'Календарь',
      "Logout": 'Выйти',
      // login page
      "Send": 'Отправить',
      "Pass": 'Пароль',
      'notAccount?': 'Нет аккаунта?',
      'Register': 'Зарегистрироваться',
      'validEmail': 'Введите правильный E-mail',
      'emptyField': 'не может быть пустым',
      'alreadyReg': 'Уже зарегистрированы?',
      'Login': 'Войти',
      'firstName': 'Имя',
      'lastName': 'Фамилия',
      /// simple con
      'Staffers': 'Сотрудники',
      'addStaffers': 'добавьте сотрудников вашей организации',
      'Add': 'Добавить',
      'Continue': 'Далее',
      'Cancel': 'Отмена',
      'Services': 'Услуги',
      'Specials': 'Специализации',
      'addService': 'Добавить услугу',
      'Back': 'Назад',
      'Connections': 'Связи',
      'ConnectStaffers': 'свяжите сотрудников с услугами',
      // project page
      'Open': 'Открыть',
      'CreateProj': 'Создать проект'
    }
  } 
})
export default i18n