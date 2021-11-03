<template>
  <div class="">
     <header class="header">
        <div class="header-wrapper">
        <nav class="header-nav">
            <div class="header-logo"><router-link to="/">CalendarBot</router-link></div>
            <ul class="header-list">
            <li class="header-item"><a href="#adve">Преимущества</a></li>
            <li class="header-item"><a href="#test">Запись</a></li>
            <li class="header-item"><a href="#contact">Контакты</a></li>
            <li class="header-item">
                <router-link to="/" class="header-item">
                Вернуться в приложения
                </router-link>
            </li>
            </ul>
        </nav>
        </div>
    </header>
    <main>
        <div class="intro" id="home">
        <div class="intro-wrapper">
            <section class="intro-block">
            <h1 class="title intro-title">Каждый достоин 
лучшего</h1>
            <p class="intro-subtitle">«Мой Доктор» - многопрофильная клиника, оказывающая большой спектр медицинских услуг.</p>
            <button class="btn intro-btn">О компании</button>
            <p class="intro-subtext">Мощная диагностическая база, высокотехнологичное оборудование.</p>
            </section>
            <img class="intro-mainImg" src="../assets/lending/img/mainImg.png" alt="">
        </div>  
        </div>
        <div class="work-bg">
            <section class="work" id="adve">
                <h2 class="title">Почему <span>CalendarBot</span> работает?</h2>
                <div class="work-block">
                    <div class="work-item">
                        <div class="work-number">1</div>
                        <p class="work-text">Одно из преимуществ нашей клиники заключается в том, что мы стараемся работать «на опережение». 
                        Обследуясь у нас, Вы можете предотвратить болезнь. Ведь заболевание легче лечить на начальных этапах.</p>
                    </div>
                    <div class="work-item">
                        <div class="work-number">2</div>
                        <p class="work-text">Имеющееся в нашем распоряжении оборудование и квалификация наших врачей позволяют нам проводить раннюю диагностику и профилактику заболеваний.</p>
                    </div>
                    <div class="work-item">
                        <div class="work-number">3</div>
                        <p class="work-text">Будьте уверены – мы знаем своё дело. Окажите нам доверие, и мы сделаем всё для того, чтобы Вы были здоровы..</p>
                    </div>
                </div>
            </section>
        </div>
        <section class="botTest-lending" id="test">
            <h2 class="title">Запишитесь на приём к нашим врачам</h2>
            <div class="botTest-wrapper">
                <botTest />
            </div>          
        </section>
    </main>
    <footer class="footer-bg" id="contact">
        <div class="footer">
        <div class="footer-block">
            <div class="footer-item">
            <p class="footer-bold">Панель навигации:</p>
            <ul class="footer-list">
                <li>CalendarBot - это</li>
                <li>Инструменты</li>
                <li>Визитка</li>
                <li>Landing Page</li>
            </ul>
            </div>
            <div class="footer-item">
            <ul class="footer-list">
                <li>Telegram - бот</li>
                <li>WhatsApp - бот</li>
                <li>Польза от CalendarBot</li>
            </ul>
            </div>
            <div class="footer-item">
            <ul class="footer-list">
                <li>Заявка</li>
                <li>Тариф</li>
                <li>Начало</li>
            </ul>
            </div>
            <div class="footer-item">
            <ul class="footer-contact footer-list">
                <li>Программное обеспечение предоставляется</li>
                <li class="footer-bold">ИП</li>
                <li>support@calendar.ru / +79917771884</li>
                <li class="footer-social">       
                <a href=""><img src="../assets/lending/img/Google.svg" alt=""></a>
                <a href=""><img src="../assets/lending/img/Twitter.svg" alt=""></a>
                <a href=""><img src="../assets/lending/img/Facebook.svg" alt=""></a>                  
                </li>
                <li>© 2021 Calendarbot — конструктор чат ботов 
                для сайта</li>
            </ul>
            </div>
        </div>
        <a class="footer-link" href="">Политика конфиденциальности</a>
        <a class="footer-link" href="">Пользовательское соглашение</a>
        </div>
    </footer>
    <!-- footer area end -->

    <!-- Scripts -->
  </div>
</template> 
<script>
  import botTest from '@/components/BotTest'

  export default {
    name: 'lendingView' ,
    components: {
      botTest
    }
  
  }
</script>
<style scoped lang="less">
  @import '../assets/lending/less/style.less';
</style>
