<template>
  <div class="simpleCon">
    <div class="simpleCon__wrapper">
      <header class="simpleCon__header">
        <nav class="simpleCon__stepnav">
          <ul class="simpleCon__list">
            <li class="simpleCon__itemlist">
              <button 
                class="simpleCon__stepBtn" 
                :class="step == 1 ? 'simpleCon__stepBtn--active' : ''" 
                @click="step = 1"
              >
                Начало работы
              </button>
            </li>
            <li class="simpleCon__itemlist">
              <button 
                class="simpleCon__stepBtn" 
                :class="step == 2 ? 'simpleCon__stepBtn--active' : ''" 
                @click="step = 2"
              >Данные компании</button>
            </li>
            <li class="simpleCon__itemlist"> 
              <button 
                class="simpleCon__stepBtn" 
                :class="step == 3 ? 'simpleCon__stepBtn--active' : ''" 
                @click="step = 3"
              >Услуги и цены</button>
            </li>
            <li class="simpleCon__itemlist">
              <button 
                class="simpleCon__stepBtn" 
                :class="step == 4 ? 'simpleCon__stepBtn--active' : ''" 
                @click="step = 4"
              >Услуги и категории</button>
            </li>
            <li class="simpleCon__itemlist">
              <button 
                class="simpleCon__stepBtn" 
                :class="step == 5 ? 'simpleCon__stepBtn--active' : ''" 
                @click="step = 5"
              >Сотрудники</button>
            </li>
            <li class="simpleCon__itemlist">
              <button 
                class="simpleCon__stepBtn" 
                :class="step == 6 ? 'simpleCon__stepBtn--active' : ''" 
                @click="step = 6"
              >Сотрудники и 
                услуги</button>
            </li>
          </ul>
        </nav>
      </header>
        <div class="simpleCon__stepwrapper">
          <div class="simpleCon__step" v-show="step == 1">
            <div class="stepWelcome">
              <h2 class="stepWelcome__title">Добро пожаловать в <b>CalendarBot</b></h2>
              <img src="../assets/welcome.png" alt="">
              <p class="stepWelcome__text">Мы очень рады видеть Вас и не можем дождаться начала создания бота. Давайте начнем настройку бота и достигним всех поставленных целей вместе.</p>
              <button class="appBtn stepWelcome__btn" @click="step = 2">
                Давайте начнем
                <v-icon class="iconBtn" :color="colors.lite.value">mdi-chevron-right</v-icon> 
              </button>
            </div>
          </div>
          <div class="simpleCon__step" v-show="step == 2">
            <div class="stepTheme">
              <validation-observer
                ref="staffForm"
                v-slot="{ invalid }"
              >
                <form @submit.prevent="setName()">
                  <div class="stepTheme__row">
                    <div class="stepTheme__choose">
                      <h2 class="simpleCon__title">Введем основные данные о компании</h2>
                      <p class="simpleCon__text">Давайте введем данные о вашей компании и приблизим чат-бота к вашему фирменному стилю.</p>
                      <h4 class="simpleCon__label">Наименование организации</h4>
                      <label for="companyType" class="simpleCon__labelgrey">Введите наименование вашей организации</label>
                      <validation-provider
                        v-slot="{ errors }"
                        name="Наименование вашей организации"
                        rules="required|max:26"
                        mode="aggressive"
                      >
                        <input 
                          type="text" 
                          id="companyType" 
                          class="appInput simpleCon__input" 
                          placeholder="Prodoctorov"
                          v-model.trim="companyName"
                          :error-messages="errors"
                          required
                          max="26"
                        >
                        <p class="errorText" v-for="(err, index) in errors" :key="index">
                          {{err}}
                        </p>
                      </validation-provider>
                      <h4 class="simpleCon__label">Вид деятельности</h4>
                      <label for="companyName" class="simpleCon__labelgrey">Введите вид деятельности вашей организации</label>
                      <div @click="warningCompanyType()" >
                        <app-select 
                          :items="items" 
                          @select="saveCompanyType($event)" :selected="companyType" 
                          :visible.sync="visibleCompanyType"                 
                        />
                      </div>
                        <div v-show="showInputCompany">
                          <label for="inputCompany" class="simpleCon__label stepTheme__labeltop">Свой вид деятельности</label>
                          <input 
                            type="text" 
                            v-model="inputCompany"              
                            ref="inputCompany"
                            id="inputCompany"
                            class="appInput simpleCon__input"
                            placeholder="Введите свой вид деятельности"
                          >
                        </div>
                      
                      <label for="botName" class="simpleCon__label stepTheme__labeltop">Имя бота</label>
                      <validation-provider
                        v-slot="{ errors }"
                        name="Имя бота"
                        rules="required|max:26"
                        mode="aggressive"
                      >
                        <input 
                          type="text" 
                          id="botName" 
                          class="appInput simpleCon__input" 
                          placeholder="CalendarBot"
                          v-model.trim="botName"
                          :error-messages="errors"
                          required
                        >
                        <p class="errorText" v-for="(err, index) in errors" :key="index">
                          {{err}}
                        </p>
                    </validation-provider>
                      <h3 class="simpleCon__subtitle">Логотип бренда</h3>
                      <p class="simpleCon__text">Загрузите свой логотип, чтобы повысить ценность вашего бренда, а затем выберите цвет для бота</p>
                      <div class="stepTheme__colors stepTheme__colors--logo" >
                        <label 
                          class="stepTheme__color stepTheme__color--selectlogo" 
                          for="logoFile"
                          :style="logoPatch ? `background-image: url(${logoPatch})` : ''"
                        >
                          <v-icon 
                            :size="40" 
                            :color="colors.superdark.value"
                            v-if="!logoPatch"
                          >mdi-plus</v-icon>
                          <div class="stepTheme__iconEdit" v-else>
                            <v-icon
                              :size="15"
                              :color="colors.lite.value"
                            >mdi-pencil</v-icon>
                          </div>
                          
                        </label>
                        <input type="file" name="" id="logoFile" hidden @change="onFileSelected($event)">
                        <div class="stepTheme__color" :style="{ backgroundColor: item.value }" v-for="(item, index) in colors" :key="index">    
                          <span 
                            v-if="index == 'superdark'" 
                            class="stepTheme__colorPick"
                            @click="showMenu($event)"
                          >
                            <v-icon class="stepTheme__iconCenter" :color="colors.lite.value">mdi-playlist-edit</v-icon>
                          </span>
                        </div>
                      </div>                 
                    </div>
                    <div class="stepTheme__calendarBot">
                      <div class="calendarBot">
                        <header class="calendarBot__header">
                          <div class="calendarBot__logoWrapper">
                            <img v-if="!logoPatch" src='../assets/mainlogo.png' class="calendarBot__logo">
                            <img v-else :src='logoPatch' class="calendarBot__logo">
                            <p>{{botName ? botName : 'CalendarBot'}}</p>
                          </div>
                          <div class="close"></div>
                        </header>
                        <div class="calendarBot__body">
                          <div class="calendarBot__message">
                            <img v-if="!logoPatch" src='../assets/mainlogo.png' class="calendarBot__messageImage">
                            <img v-else :src='logoPatch' class="calendarBot__messageImage">
                            <div class="calendarBot__messageText calendarBot__messageText--friend">
                              <input 
                                type="text" 
                                v-show="onEdit"
                                :value="welcomeMessage" 
                                class="simpleCon__inputEdit"
                                @blur="onEdit = null"
                                ref="botMessInput"
                                @change="editBotMessage($event)"
                              >
                              <template v-if="!onEdit">
                                {{welcomeMessage}}
                                <div 
                                  class="stepTheme__iconEdit"
                                  @click="editBotMessageStart()"
                                >
                                  <v-icon
                                    :size="13"
                                    :color="colors.lite.value"
                                  >mdi-pencil</v-icon>
                                </div>
                              </template>
                              
                            </div>
                          </div>
                          <div class="calendarBot__message">
                            <img v-if="!logoPatch" src='../assets/mainlogo.png' class="calendarBot__messageImage">
                            <img v-else :src='logoPatch' class="calendarBot__messageImage">
                            <div class="calendarBot__messageText calendarBot__messageText--friend">
                              Чем я могу вам  помочь?
                            </div>
                          </div>
                          <div class="calendarBot__message">
                            <div class="calendarBot__messageText calendarBot__messageText--me">
                              Хочу записаться на прием к врачу
                            </div>
                          </div>
                        </div>
                        <footer class="calendarBot__footer">
                          <input type="text" placeholder="Введите свой ответ">
                          <div class="calendarBot__button">
                            <button class="calendarBot__setting" type="button">
                              <svg :stroke="colors.brand.value" width="17" height="17"> 
                                <use href="../assets/setting.svg#setting"></use>
                              </svg>
                            </button> 
                            <button type="button" class="calendarBot__send">
                              <svg style="fill: var(--main-color)" width="21" height="18"> 
                                <use href="../assets/send.svg#send"></use>
                              </svg>
                            </button>
                          </div>
                        </footer>
                      </div>
                    </div>
                  </div>
                  <div class="simpleCon__buttonNav">
                    <button 
                      class="appBtn appBtn--lite"
                      @click="step--"
                    >
                      <v-icon class="iconBtn-left" :color="colors.lite.value">mdi-chevron-left</v-icon> 
                      Назад 
                    </button>
                    
                    <button 
                      class="appBtn"
                      type="submit"
                      :disabled="invalid"
                    >
                      Далее 
                      <v-icon class="iconBtn-right" :color="colors.lite.value">mdi-chevron-right</v-icon>
                    </button>
                  </div>
                </form>
              </validation-observer>
            </div>
          </div>
          <div class="simpleCon__step" v-show="step == 3">
            <div class="StepService">
              <div class="StepService__row">
                <div class="StepService__add">
                  <h2 class="simpleCon__title">Добавим названия услуг, их время и стоимость</h2>
                  <p class="simpleCon__text">Давайте добавим услуги, их время выполнения и стоимость для всех ваших сотрудников.</p>
                    <validation-observer
                      ref="observer"
                      v-slot="{ invalid }"
                    >
                      <transition 
                        name="add"
                        @leave="showAnimate = true"
                      >
                      <form 
                        v-if="showAnimate"
                        @submit.prevent="addServices()" 
                        class="StepService__form"  
                        :class="onEdit ? 'StepService__form--edit' : ''"
                        
                      >
                        <label for="serviceName" class="simpleCon__label">Введите название услуги</label>
                          <validation-provider
                            v-slot="{ errors }"
                            name="Название услуги"
                            rules="required"
                            mode="aggressive"
                            >
                            <input 
                              type="text" 
                              id="serviceName" 
                              class="appInput simpleCon__input" 
                              placeholder="Диагностика"
                              v-model.trim="ServiceName"
                              :error-messages="errors"
                              ref='ServiceName'
                              required
                            > 
                            <p class="errorText" v-for="(err, index) in errors" :key="index">
                              {{err}}
                            </p>

                          </validation-provider>

                          <label for="serviceTime" class="simpleCon__label">Время выполнения</label>
                          <validation-provider
                            v-slot="{ errors }"
                            name="Время"
                            rules="required"
                            mode="aggressive"
                            >
                          <vue-timepicker 
                            placeholder="1ч.30мин."
                            v-model="ServiceTime"
                            :minute-interval="5"
                            format="HH:mm"
                            :hour-range="[[0, 12]]"
                            hide-disabled-hours
                            manual-input
                            :error-messages="errors"
                          ></vue-timepicker>
                            <p class="errorText" v-for="(err, index) in errors" :key="index">
                              {{err}}
                            </p>
                          </validation-provider>
                          <label for="ServicePrice" class="simpleCon__label">Введите её стоимость (₽)</label>
                          <validation-provider
                            v-slot="{ errors }"
                            name="Стоимость услуги"
                            rules="required"
                            mode="aggressive"
                          >
                          <div class="StepService__inputWrap">     
                            <input 
                              type="text" 
                              id="ServicePrice" 
                              class="appInput simpleCon__input" 
                              placeholder="790"
                              v-model.trim="ServicePrice"
                              required
                              :error-messages="errors"
                            > 
                            <button 
                              class="appBtn StepSpec__btn"
                              @click="ServicePrice = 0"
                              type="button"
                            >Бесплатно</button>
                       </div>
                          <p class="errorText" v-for="(err, index) in errors" :key="index">
                            {{err}}
                          </p>
                          </validation-provider>  
                          <div class="StepSpec__btnWrapper">
                            <button 
                              type="submit"
                              class="appBtn StepSpec__btn"
                              :disabled="invalid"
                              v-if="!onEdit"
                            >Добавить</button>
                            <button 
                              type="button"
                              class="appBtn StepSpec__btn"
                              :disabled="invalid"
                              @click="updateServices()"
                              v-else
                            >Сохранить</button>
                            <button            
                              type="button"
                              class="appBtn StepSpec__btn"
                              @click="clearServices()"
                            >Отменить</button>
                            <p class="StepSpec__canceltext" v-if="onEdit">(нажмите для отмены редактирования)</p>
                          </div>                  
                        </form>
                        </transition>

                      </validation-observer>
                </div>
                <div class="StepService__view">
                  <h2 class="simpleCon__title">Добавленные услуги их время и стоимость</h2>
                  <ul class="StepSpec__list">
                    <li 
                      class="StepSpec__listitem" 
                      :key="index" 
                      v-for="(value, index) in services"         
                    >
                    <span class="StepSpec__name">{{ value.name }}</span>
                    <div class="StepSpec__timeprice"> 
                      <span class="StepSpec__price">{{ value.price }} ₽</span>
                      <span>
                        {{value.duration.split(':')[0]}}ч.
                        {{value.duration.split(':')[1]}}мин.
                      </span>
                    </div>
                    <button 
                      class="StepStaff__staffdelete" 
                      @click="startEditService(value)"
                    >
                      <v-icon :color="colors.lite.value" size="18">mdi-pencil</v-icon>
                    </button>
                    <button class="StepStaff__staffdelete">
                      <v-icon :color="colors.lite.value" size="18" @click="deleteServ(value.id)">mdi-trash-can-outline</v-icon>
                    </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="simpleCon__buttonNav">
                <button 
                  class="appBtn appBtn--lite"
                  @click="step--"
                >
                  <v-icon class="iconBtn-left" :color="colors.lite.value">mdi-chevron-left</v-icon> 
                  Назад 
                </button>
                 
                <button 
                  class="appBtn"
                  @click="step++"
                >
                  Далее 
                  <v-icon class="iconBtn-right" :color="colors.lite.value">mdi-chevron-right</v-icon>
                </button>
              </div>
            </div>
          </div>
          
          <div class="simpleCon__step" v-show="step == 4" >
            <div class="StepServConnect">
              <div class="StepServConnect__row">
                <div class="StepServConnect__content">
                  <h2 class="simpleCon__title">Добавим категории и объединим услуги</h2>
                  <p class="simpleCon__text">Давайте добавим категории сотрудников и объединим их с услугами, которые они предоставляют.</p>
                  <p class="simpleCon__label  StepServConnect__subtitle">Добавление категорий</p>
                  <p class="simpleCon__text">Добавьте окно категории, а затем из окна “Услуги” перетащите туда все необходимые услуги.</p>
                  <p class="simpleCon__label StepServConnect__textWidth">
                    (данный шаг является необязательным, вы можете его пропустить просто нажав кнопку “Далее”)
                  </p>
                  <div class="windowAdd">
                    <header class="windowAdd__header">
                      <p class="simpleCon__title windowAdd__title windowAdd__title--center">Услуги</p>  
                    </header>
                    <div class="windowAdd__body">
                      <ul class="windowAdd__list windowAdd__list--row">
                        <li 
                        class="windowAdd__listitem windowAdd__listitem--col6"
                        :key="index" 
                         v-for="(value, index) in uncategorizedServices"
                         @dragstart="onDragStart($event, value.id)"
                         draggable="true"
                        > 
                          {{value.name}}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <h2 class="simpleCon__title StepServConnect__titleCategory">Категории</h2>
                  <div class="StepServConnect__windowAddrow">
                    <div 
                      class="windowAdd StepServConnect__windowAdd" 
                      v-for="(item, i) in specialists" 
                      :key="i" 
                      v-if="item.title !== 'Без категории'"
                      @drop="onDrop($event, item.id)"
                      @dragover.prevent
                      @dragenter.prevent
                    >
                      <header class="windowAdd__header">
                        <p 
                          class="simpleCon__title windowAdd__title"
                          v-if="onEdit !== (item.id + 'spec')"
                        >{{item.title}}</p>  
                        <input 
                          type="text"
                          v-show="item.new"    
                          placeholder="Введите название категории"
                          class="simpleCon__inputEdit simpleCon__inputEdit--title"
                          v-model="SpecName"
                          @keyup.enter="addSpecialization()"
                        >                 
                        <input 
                          type="text"
                          :value="item.title" 
                          @blur="onEdit = null"
                          @change="editSpec(item.id, $event)"
                          v-show="onEdit == (item.id + 'spec')"    
                          ref="specInput"
                          class="simpleCon__inputEdit simpleCon__inputEdit--title"
                        >               
                        <div class="windowAdd__headericon" v-if="!item.new">
                          <v-icon 
                            :color="colors.lite.value" 
                            size="18"
                            @click="editSpecStart(item.id, i)"
                          >mdi-pencil</v-icon>
                          <v-icon 
                            :color="colors.lite.value" 
                            size="18" 
                            @click="deleteSpec(item.id)"
                          >mdi-trash-can-outline</v-icon>        
                        </div>                        
                      </header>
                      <div class="windowAdd__body">
                        <template v-if="item.new">
                          <p class="windowAdd__placeholderText">
                            Введите название категории, а затем нажмите кнопку “Сохранить”
                          </p>
                          <div class="windowAdd__btnWrapper">
                            <button 
                              class="appBtn appBtn--small"
                              @click="addSpecialization()"
                            >Сохранить</button>
                            <button 
                              class="appBtn appBtn--small"
                              @click="deleteSpecInArray()"
                            >отменить</button>
                          </div>
                          
                        </template>
                        <ul class="windowAdd__list"
                        >
                          <li 
                          class="windowAdd__listitem"
                          v-for="(subitem, i2) in item.service" :key="i2"
                          @dragstart="onDragStart($event, subitem.id)"
                          draggable="true"
                          >
                            {{subitem.name}}  
                            <button 
                              class="StepStaff__staffdelete"
                              @click="deleteServicesInSpecialists(subitem.id, item.id)"
                            >
                              <v-icon :color="colors.lite.value" size="18" >mdi-trash-can-outline</v-icon>       
                            </button>               
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div 
                      class="windowAdd StepServConnect__windowAdd StepServConnect__windowAdd--add" 
                      @click="addSpecInArray()"
                    >
                      <button class="stepTheme__color stepTheme__color--selectlogo">
                        <v-icon size="40">mdi-plus</v-icon>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="simpleCon__buttonNav">
                <button 
                  class="appBtn appBtn--lite"
                  @click="step--"
                >
                  <v-icon class="iconBtn-left" :color="colors.lite.value">mdi-chevron-left</v-icon> 
                  Назад 
                </button>
                 
                <button 
                  class="appBtn"  
                  @click="step++"
                >
                  Далее 
                  <v-icon class="iconBtn-right" :color="colors.lite.value">mdi-chevron-right</v-icon>
                </button>
              </div>
            </div>
          </div>
          <div class="simpleCon__step" v-show="step == 5">
            <div class="StepStaff">
              <div class="StepStaff__row">
                <div class="StepStaff__add">
                  <h2 class="simpleCon__title">Добавим имена ваших сотрудников</h2>
                  <p class="simpleCon__text">Давайте добавим имена сотрудников и внесем их график работы в бота.</p>
                  <validation-observer
                    ref="staffForm"
                    v-slot="{ invalid }"
                  >
                    <form @submit.prevent="addStaffer()">
                      <label for="staffers" class="simpleCon__label">Введите ФИО сотрудника и заполните его график работы</label>
                      <validation-provider
                          v-slot="{ errors }"
                          name="ФИО сотрудника"
                          rules="required"
                          mode="aggressive"
                        >
                        <input 
                          type="text" 
                          id="staffers" 
                          class="appInput simpleCon__input" 
                          placeholder="Александр Александров Александрович"
                          v-model.trim="stafferName"
                          required
                        > 
                        <p class="errorText" v-for="(err, index) in errors" :key="index">
                          {{err}}
                        </p>
                      </validation-provider>
                      <button 
                        class="appBtn StepSpec__btn"
                        type="submit"
                        :disabled="invalid"
                      >Добавить</button>
                    </form>
                  </validation-observer>
                  <p class="simpleCon__label">Добавленные сотрудники</p>
                  <ul class="StepStaff__list">
                    <li 
                    class="StepStaff__listitem" 
                    v-for="(item, i) in staffers" 
                    :key="i" 
                    @click="selectActiveStaff(item)"
                    >
                      <img src="../assets/mainlogo.png" alt="" class="StepStaff__avatar">
                      <div 
                        class="StepStaff__staff"
                        :class="item.id == activeStaff.id ? 'StepStaff__staff--active' : ''"
                      >
                        <p 
                          v-if="onEdit !== (item.id + 'staff')"
                          class="StepStaff__stafftext"
                        >
                        {{item.name}}
                        </p>   
                        <input 
                          type="text"
                          :value="item.name" 
                          @blur="onEdit = null"
                          @change="editStaff(item.id, $event)"
                          v-show="onEdit == (item.id + 'staff')"    
                          ref="staffInput"
                          class="simpleCon__inputEdit"
                        >       
                        <div class="StepStaff__staffbtn">
                          <button 
                            class="StepStaff__staffdelete"
                            @click="editStaffStart(item.id, i)"
                          >
                            <v-icon :color="colors.lite.value" size="18">mdi-pencil</v-icon>
                          </button>
                          <button class="StepStaff__staffdelete">
                            <v-icon :color="colors.lite.value" size="18" @click="deleteStaff(item.id, i)">mdi-trash-can-outline</v-icon>
                          </button>
                        </div>  
                        
                      </div>                     
                    </li>
                  </ul>
                </div>
                <div class="StepStaff__calendar">
                  <div class="StepStaff__windowAdd windowAdd calendarForStaff">
                    <header class="windowAdd__header">
                      Настройте график работы. 
                      {{activeStaff.name}}
                    </header>
                  <mini-calendar :days="days" :activeStaff="activeStaff" @EventsObj="setEvents($event)"
                  />
                  </div>
                </div>
              </div>
              <div class="simpleCon__buttonNav">
                <button 
                  class="appBtn appBtn--lite"
                  @click="step--"
                >
                  <v-icon class="iconBtn-left" :color="colors.lite.value">mdi-chevron-left</v-icon> 
                  Назад 
                </button>
                 
                <button 
                  class="appBtn"
                  @click="setCalendar()"
                >
                  Далее 
                  <v-icon class="iconBtn-right" :color="colors.lite.value">mdi-chevron-right</v-icon>
                </button>
              </div>
            </div>
          </div>
          <div class="simpleCon__step" v-show="step == 6">
            <div class="StepstaffToService">
              <div class="StepstaffToService__row">
                <div class="StepstaffToService__view">
                  <h2 class="simpleCon__title">Выберем сотруднику его категорию</h2>
                  <p class="simpleCon__text">Давайте объединим ваших сотрудников с категориями.</p>
                  <h3 class="simpleCon__subtitle">Выбор сотрудника</h3>
                  <p class="simpleCon__text">Просто выберите сотрудника из списка и справа в окне кликните на его категорию.</p>
                  <ul class="StepStaff__list">
                    <li class="StepStaff__listitem" v-for="(item, i) in staffers" :key="i" @click="selectActiveStaff(item)">
                      <img src="../assets/mainlogo.png" alt="" class="StepStaff__avatar">
                      <div class="StepStaff__staff"
                        :class="item.id == activeStaff.id ? 'StepStaff__staff--active' : ''"                   
                      >
                        <p class="StepStaff__stafftext">{{item.name}}</p>
                      </div>                     
                    </li>
                  </ul>
                </div>
                <div class="StepstaffToService__add">
                  <div class="StepstaffToService__windowAdd windowAdd">
                    <header class="windowAdd__header">
                      Выберите специализацию
                      {{activeStaff.name}}
                    </header>
                    <div class="windowAdd__body">
                      <ul class="windowAdd__list">
                        <li 
                          class="windowAdd__listitem windowAdd__listitem--add"
                          @click="addSpecFromStaffStep()"
                        >
                          <button
                            class="windowAdd__btnAdd"
                          >
                          <v-icon fab>mdi-plus</v-icon>
                          </button>
                        </li>
                        <li 
                          :key="index" 
                          v-for="(value, index) in specialists"
                          class="windowAdd__listparent"
                        >
                        <div class="windowAdd__listitem">
                          <span>
                            {{value.title}}
                            <v-icon 
                              :color="colors.lite.value"
                              @click="ToggleList(index)"
                              v-if="value.service && value.service.length"
                            >{{ value.isVisible ? 'mdi-menu-down' : 'mdi-menu-right'}}</v-icon>            
                          </span>
                          <template v-if="value.service && value.service.length">
                            <v-icon 
                              :color="colors.lite.value"
                              class="StepStaff__staffdelete"
                              @click="addAllServicesInStaff(value)" 
                              v-if="!allCategoryInStaff(value)"
                            >mdi-plus</v-icon>
                            <v-icon 
                              :color="colors.lite.value"
                              class="StepStaff__staffdelete"
                              v-else
                              @click="deleteAllServicesInStaff(value)"
                            >mdi-check-bold</v-icon>
                          </template>
                          
                        </div>
                          <transition name="list">
                            <ul 
                              class="windowAdd__sublist"
                              v-if="value.isVisible"
                            >
                                <li 
                                  v-for="(subitem, i1) in value.service" 
                                  :key="i1"
                                  class="windowAdd__listitem"
                                >
                                  {{subitem.name}}
                                  <v-icon 
                                    @click="addServicesInStaff(subitem.id, value.id)"
                                    :color="colors.lite.value"
                                    v-if="includesServiceInStaff(subitem, value)"
                                  >mdi-plus</v-icon>
                                  <v-icon 
                                    :color="colors.lite.value"
                                    v-else
                                    @click="deleteServicesInStaff(subitem.id, value.id)"
                                  >mdi-check-bold</v-icon>
                              </li>
                            </ul>
                          </transition>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="simpleCon__buttonNav">
                <button 
                  class="appBtn appBtn--lite"
                  @click="step--"
                >
                  <v-icon class="iconBtn-left" :color="colors.lite.value">mdi-chevron-left</v-icon> 
                  Назад 
                </button>
                 
                <button 
                  class="appBtn"
                  @click="step++"
                >
                  Далее 
                  <v-icon class="iconBtn-right" :color="colors.lite.value">mdi-chevron-right</v-icon>
                </button>
              </div>
            </div>
          </div>
          <div class="simpleCon__step" v-show="step == 7">
            <div class="stepWelcome">
              <h2 class="stepWelcome__title">Вы успешно закончили настройку бота!</h2>
              <img src="../assets/endimg.png" alt="">
              <p class="stepWelcome__text">Поздравляю, Вы заполнили всю необходимую информацию для корректной работы бота. Теперь мы можем приступить к работе с ботом. 
              Как пользоваться ботом Вы можете поcмотреть тут.</p>
              <div class="simpleCon__buttonNav">
                <button 
                  class="appBtn appBtn--lite"
                  @click="step--"
                >
                  <v-icon class="iconBtn-left" :color="colors.lite.value">mdi-chevron-left</v-icon> 
                  Назад 
                </button>
                 
                <button 
                  class="appBtn"
                  @click="save()"
                >
                  Завершить 
                  <v-icon class="iconBtn-right" :color="colors.lite.value">mdi-chevron-right</v-icon>
                </button>
              </div>
            </div>
          </div>
        </div> 
      </div>
      <v-menu
      v-model="paletteModal"
      :close-on-content-click="false"
      :nudge-width="230"
      offset-y
      top
      :activator="selectedEl"
    >
      <v-card>
        <v-color-picker
          dot-size="25"
          swatches-max-height="200"
          v-model="colorInputValue"
          mode="rgba"
        ></v-color-picker>
        <div class="stepTheme__colorsWrap stepTheme__colorsWrap--fromlogo">
          <div class="stepTheme__color" :style="{ backgroundColor: item }" v-for="(item, index) in colorFromLogo" :key="index" @click="setColor(item)">    
          </div>
        </div>
      </v-card>

    </v-menu>
    <v-dialog
      v-model="showTypeWarning"
      max-width="700px"
    > 
      <div class="appDialog">
        <p>При смене вида деятельности компании, ранее заполненные  данные будут полностью удалены</p>
        <div class="appDialog__btnWrap">
          <button class="appBtn" @click="warningCancel()">Отмена</button>
          <button class="appBtn" @click="warningAccept()">Ок</button>
        </div>
      </div>   
    </v-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import * as THEME from '../THEME_COLOR'
import chroma from "chroma-js";
import  { getConfig }  from '@/jsonData/botConfig'
import  { dates }  from '@/jsonData/dates'
import { ConstructDifPatchId, CreateImage } from "@/api/constructorApi";
import { addCalendar, getCalendar, updateCalendar, addServices, getServices, patchServices, getServicesToSpecialization, getServicesId, addSpecialization, getSpecialization, patchConstructor, getSpecializationToStaff, patchSpecialization, getSpecializationId, addEvent, deleteCalendar, deleteSpecialization, deleteService, patchCalendar, getUncategorizedServices, getCompanyType, addFullServices, deleteFullServices, getBotMessage, patchBotMessage, addServiceInCategory, addServiceToStaff, deleteServiceToStaff } from '@/api/calendarApi'
import MiniCalendar from './partials/MiniCalendar.vue';
import AppSelect from './ui/AppSelect.vue'
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'
import { required, max } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} не может быть пустым',
})

extend('max', {
  ...max,
  message: '{_field_} не может быть больше 26 символов',
})

  function hex2rgb(c) {
    var bigint = parseInt(c.split('#')[1], 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return  {
        _rgb: [r,g,b, 1]
    }
  }
  function inversion(r, g, b){
    r = (255 - parseInt(r, 16)).toString(16);

    g = (255 - parseInt(g, 16)).toString(16);

    b = (255 - parseInt(b, 16)).toString(16);
    return `#${r}${g}${b}`
  }
export default {
  data: () => ({
    step: 1,
    colorInputValue: '#C4C4C4',
    savedColors: [],
    paletteModal: false,
    selectedEl: null,
    botName: "",
    companyType: {},
    companyName: "",
    SpecName: "",
    specialists: [],
    staffers: [],
    stafferName: "",
    ServiceName: "",
    ServicePrice: "",
    ServiceTime: "",
    picker: null,
    services: [],
    activeStaff: {},
    activeStaffTime: null,
    selectedSpecialist: [],
    specialistsToStaff: null,
    activeSpecialist: {
      title: ''
    },
    ServicesToSpecialists: [],
    editService: {},
    onEdit: false,
    logoPatch: null,
    events: {},
    days: [],
    errors: [],
    showAnimate: true,
    items: [],
    colorFromLogo: [],
    uncategorizedServices: [],
    showList: false,
    showTypeWarning: false,
    openSelect: false,
    botMessages: [],
    welcomeMessage: '',
    visibleCompanyType: false,
    showInputCompany: false,
    inputCompany: '',
    uncategorizedId: null
  }),
  async mounted(){
    await this.getSpecialization()
    await this.getStaffer()
    await this.getServices()
    await this.getCompanyItems()
    await this.getBotMessagesHandler()
    let project = this.$store.getters.project
    this.logoPatch = project.logo.length ? project.logo[0].image.full_size : null
    this.colorInputValue = project.color ? project.color.find(item => item.name == 'main').value : "#C4C4C4"
    this.botName = project.name ? project.name : null
    this.companyName = project.company_name ? project.company_name : null
    this.setCompanyType()
  },
  methods: {  
    async updateProject(){
      await this.$store.dispatch("getProject", this.$store.getters.user.id)
      await this.getSpecialization()
      this.days = []
      await this.getStaffer()
      await this.getServices()
    },
    warningAccept(){
      this.showTypeWarning = false
      this.visibleCompanyType = true
    },
    warningCancel(){
      this.showTypeWarning = false
      this.visibleCompanyType = false
    },
    setCompanyType(){
      if(this.$store.getters.project.company_type){
        this.companyType = this.$store.getters.project.company_type
        this.visibleCompanyType = false
      }
      if(this.$store.getters.project.custom_company_type){
        this.companyType = this.items.find(item => item.id == null)
        this.inputCompany = this.$store.getters.project.custom_company_type
        this.showInputCompany = true
      }
    },
    async getCompanyItems(){
      this.items = (await getCompanyType()).data.results
      this.items.push({
        name: 'Свой вариант',
        id: null
      })
    },
    async saveCompanyType(selected){
      if(selected.id === null){
        this.showInputCompany = true
        setTimeout(() => {
          this.$refs.inputCompany.select()
        }, 50)
      }else{
        this.showInputCompany = false
        this.inputCompany = ''
      }
      this.companyType = this.items.find(item => item.id == selected.id)

    },
    warningCompanyType(){
      if(this.visibleCompanyType && (Object.keys(this.companyType).length || this.inputCompany)){
        this.showTypeWarning = true
      }
    },
    ToggleList(index){
      this.specialists[index].isVisible = !this.specialists[index].isVisible
    },
    async getBotMessagesHandler(){
      this.botMessages = (await getBotMessage(this.$store.getters.project.id)).data.results
      console.log( this.botMessages )
      this.welcomeMessage = this.botMessages.find(item => item.text_id == 'hello').text    
    },
    editBotMessageStart(){
      this.onEdit = true
      setTimeout(() => {
        this.$refs.botMessInput.select()
      }, 50)
    },
    async editBotMessage(event){
      await patchBotMessage(1, {
        text: event.target.value,
        text_id: 1,
        const: this.$store.getters.project.id
      })
      this.onEdit = null
      this.getBotMessagesHandler()
    },
    setDays(){
      console.log('setdays')
      const initialDate = moment().startOf('week').toDate()
      this.days = this.staffers.map(item => ({
        ...item,
        calendar: this.dates()
      }))
    },
    deleteDay(id){
      this.days.splice(id, 1)
    },
    addDay(obj){
      this.days.push({
        ...obj, 
        calendar: this.dates()
      })
    },
    setEvents(data){
      this.events = data
    },
    async setCalendar(){
      try{
        if( this.events.length > 0 ) {
          this.events.forEach(async item => {
            item.calendar.forEach(async subitem => {
              if(!subitem.disabled){
                await addEvent({
                  name: item.name,
                  start: subitem.date + 'T' + subitem.timeStart,
                  end: subitem.date + 'T' + subitem.timeEnd,
                  status: 'FR',
                  staff: item.id,
                  color: '#44EC41'
                })
                await addEvent({
                  name: item.name + ' обед',
                  start: subitem.date + 'T' + subitem.dinnerStart,
                  end: subitem.date + 'T' + subitem.dinnerEnd,
                  status: 'BS',
                  staff: item.id,
                  color: '#C70F0F'
                })
              }
            })       
          })
          this.step++
        }
      }catch(e){
        console.log(e)
      }
      
    },
    async save(){
      try{
        const bot = await getConfig()
        await ConstructDifPatchId(bot, this.$store.getters.project.id)
        this.$router.push(`/lending`)
      }catch(e){
        console.log(e)
      }
    },
    async setName(){
        let color = []
        for (const item in this.colors) {
          color.push(this.colors[item])
        }
     
        await ConstructDifPatchId({
          name: this.botName,
          color: color,
          company_name: this.companyName,
          custom_company_type: this.inputCompany ? this.inputCompany : null,
          company_type: this.companyType ? this.companyType.id : null
        }, this.$store.getters.project.id)
        
        await this.updateProject()
        this.step = 3
    },
    
    // specialization 
    async addSpecialization(){
      if(this.SpecName){
        await addSpecialization({
          title: this.SpecName, 
          const: this.$store.getters.project.id
        })
        this.getSpecialization()
        this.SpecName = ''
      }
    },
    async getSpecialization(id){
      try{
        this.specialists = (await getSpecialization(this.$store.getters.project.id)).data.results
        this.specialists.forEach(async (item, index) => {
          this.$set(this.specialists[index], "services", this.specialists[index].services)
          if(id !== item.id){
            this.$set(this.specialists[index], 'isVisible', false)
            this.specialists[index].isVisible = false           
          }else{  
            let indexActual = this.specialists.findIndex(subitem => subitem.id == id)
            this.$set(this.specialists[indexActual], 'isVisible', true)
            this.specialists[indexActual].isVisible = true
          }
        })
        let uncategorized = this.specialists.find(item => item.title == 'Без категории')
        console.log(this.specialists)
        this.uncategorizedId = uncategorized.id
        this.uncategorizedServices = uncategorized.service
      }catch(e){
        throw e
      }
    },
    async deleteSpec(id){
      await deleteSpecialization(id)
      this.getSpecialization()
      this.uncategorizedServicesHandler()
    },
    async editSpec(id, event){
      await patchSpecialization(id, {
        title: event.target.value,
        const: this.$store.getters.project.id
      })
      this.onEdit = null
      this.getSpecialization()
    },
    editSpecStart(id, index){
      this.onEdit = (id + 'spec')
      setTimeout(() => {
        this.$refs.specInput[index].select()
      }, 50)
    },
    addSpecInArray(){
      if(!this.specialists.find(item => item.new)){
        this.specialists.push({
          new: true
        })
      }
    },
    addSpecFromStaffStep(){
      if(!this.specialists.find(item => item.new)){
        this.specialists.push({
          new: true
        })
      }
      this.step = 4
    },
    deleteSpecInArray(){
      this.SpecName = ''
      this.specialists.pop()
    },
    async addStaffer(){
      if(this.stafferName){
        const st = await addCalendar({
            name: this.stafferName,
            const:  this.$store.getters.project.id     
        })
        this.addDay(st.data)
        this.clearStaff()
        this.getStaffer()
      }
    },
    includesServiceInStaff(serv, category){
      console.log('irerenders')
      return !serv.staff.find(item => item == this.activeStaff.id)
    },
    async getStaffer(){
      try{
        this.staffers = (await getCalendar(this.$store.getters.project.id)).data.results
        if(this.staffers.length > 0){
          this.activeStaff = this.staffers[0]
          // this.upgrateSelectedSpecialist(this.activeStaff.id)
        }
        if(this.days.length == 0){
          this.setDays()
        }
      }catch(e){
        throw e
      }
    },
    async editStaff(id, event){
      await patchCalendar(id, {
        name: event.target.value,
        const: this.$store.getters.project.id
      })
      this.onEdit = null
      this.getStaffer()
    },
    async deleteStaff(id, index){
      try{
        await deleteCalendar(id)
        this.deleteDay(index)
        this.getStaffer()
      }catch(e){
        console.log(e)
      }
    },
    clearStaff(){
      this.stafferName = ''
      this.$refs.staffForm.reset()
    },
    editStaffStart(id, index){
      this.onEdit = (id + 'staff')
      setTimeout(() => {
        this.$refs.staffInput[index].select()
      }, 50)
    },
    async getServices(){
      try{
        this.services = (await getServices(this.$store.getters.project.id)).data.results
      }catch(e){
        throw e
      }
    },
    async updateServices(){
      try{
        await patchServices(this.editService.id, {
          name: this.ServiceName,
          price: this.ServicePrice,
          duration: this.ServiceTime
        })
        this.clearServices()
        this.onEdit = false
        await this.getServices()
        await this.getSpecialization()
      }catch(e){
        console.log(e)
      }
    },
    async deleteServ(id){
      await deleteService(id)
      await this.getServices()
      await this.getSpecialization()
    },
    async addServices(){
      try{
        await addServices({
          name: this.ServiceName, 
          price: this.ServicePrice,
          const: this.$store.getters.project.id,
          duration: this.ServiceTime,
          category: this.uncategorizedId
        })
        this.clearServices()
        this.getServices()
        this.getSpecialization()
        this.showAnimate = !this.showAnimate
      }catch(e){
        throw e
      }
    },
    clearServices(){
      this.onEdit = false
      this.editService = ''
      this.ServiceName = ''
      this.ServicePrice = ''
      this.ServiceTime = ''
      this.$refs.observer.reset()
    },
    startEditService(item){
      this.editService = item
      this.onEdit = true
      this.ServiceTime = item.duration
      this.ServiceName = item.name
      this.ServicePrice = item.price
      this.$refs.ServiceName.select()
    },
    // logo function
    async onFileSelected(event){
      try{
        let data = new FormData();
        data.append('name', event.target.files[0].name)
        data.append('image', event.target.files[0])
        data.append('color', '{}')
        let image = await CreateImage(data)
        this.colorFromLogo = image.data.color.colors
        this.colorInputValue = image.data.color.colors[0]
  
        await ConstructDifPatchId({
          logo: [image.data.id]
        }, this.$store.getters.project.id)
        
        await this.$store.dispatch("getProject", this.$store.getters.user.id)
        this.logoPatch = this.$store.getters.project.logo[0].image.full_size
      }catch(e){
        console.log(e)
      }
      
      
    },
    // connect function 
    // specialist function
    selectActiveStaff(obj){
      this.activeStaff = obj
      // this.upgrateSelectedSpecialist(this.activeStaff.id)
    },
    async upgrateSelectedSpecialist(id){
      this.selectedSpecialist = []  

      this.specialistsToStaff = (await getSpecializationToStaff(id)).data
      this.specialistsToStaff.forEach(item => {
        this.selectedSpecialist.push(item.id)
      })
    },
    async addAllServicesInStaff(category){
      try{ 
        await addFullServices(this.activeStaff.id, category.id)
        await this.getSpecialization(category.id)
      }catch(e){
        console.log(e)
      }
    },
    async deleteAllServicesInStaff(category){
      try{ 
        await deleteFullServices(this.activeStaff.id, category.id)
        await this.getSpecialization(category.id)
      }catch(e){
        console.log(e)
      }
    },
    allCategoryInStaff(category){
      if(category && category.service){
        for(let i = 0; i < category.service.length; i++){
          if(!category.service[i].staff.includes( this.activeStaff.id  ) ){
            return false
          }
        }
      }
      return true
    },
    // services function
    selectActiveService(obj){
      this.activeSpecialist = obj
      this.upgrateSelectedServices(this.activeSpecialist.id)
    },
    async addServicesInSpecialists(idServices, idSpec){
      try{
        await addServiceInCategory(idServices, idSpec)

        await this.getSpecialization()
        await this.getSpecialization()
      }catch(e){
        console.log(e)
      }
      
    },
    async addServicesInStaff(servId, categoryId){

      await addServiceToStaff(servId, this.activeStaff.id)

      await this.getSpecialization(categoryId)
    },
    async deleteServicesInStaff(servId, categoryId){
      await deleteServiceToStaff(servId, this.activeStaff.id)

      await this.getSpecialization(categoryId)
    },
    async deleteServicesInSpecialists(id, idSpec){

      await addServiceInCategory(id, this.uncategorizedId)

      await this.getSpecialization()
      await this.getSpecialization()
    },
    async upgrateSelectedServices(){
      await this.specialists.forEach(async (item, index) => {
        const services = (await getServicesToSpecialization(item.id)).data
        this.specialists[index].services = services
      })
    },
    getRandomColor() {
      return chroma.random();
    },
    tint(hex) {
      return chroma.mix("#fff", hex, 0.25, "lab");
    },
    showMenu(event){
      this.selectedEl = event.target
      this.paletteModal = true
    },
    // dragAndDrop
    onDragStart(event, id){
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('id', id.toString())
    },
    async onDrop(event, idSpec){
      const idServices = parseInt(event.dataTransfer.getData('id'))
      await this.addServicesInSpecialists(idServices, idSpec)
    },
    dates(){
      return [
        {
          value: 'mon',
          title: 'Пн',
          timeStart: '08:00',
          timeEnd: '20:00',
          dinnerStart: '00:00',
          dinnerEnd: '00:00',
          disabled: false,
          status: 'active',
          watched: false,
          date: new Date(moment().startOf('week').toDate().setDate(moment().startOf('week').toDate().getDate() + 2)).toISOString().split('T')[0]
        },
        {
          value: 'tue',
          title: 'Вт',
          timeStart: '08:00',
          timeEnd: '20:00',
          dinnerStart: '00:00',
          dinnerEnd: '00:00',
          disabled: false,
          status: 'new',
          watched: false,
          date: new Date(moment().startOf('week').toDate().setDate(moment().startOf('week').toDate().getDate() + 3)).toISOString().split('T')[0]
        },
        {
          value: 'wed',
          title: 'Ср',
          timeStart: '08:00',
          timeEnd: '20:00',
          dinnerStart: '00:00',
          dinnerEnd: '00:00',
          status: 'new',
          watched: false,
          disabled: false,
          date: new Date(moment().startOf('week').toDate().setDate(moment().startOf('week').toDate().getDate() + 4)).toISOString().split('T')[0]
        },
        {
          value: 'thu',
          title: 'Чт',
          timeStart: '08:00',
          timeEnd: '20:00',
          dinnerStart: '00:00',
          dinnerEnd: '00:00',
          status: 'new',
          watched: false,
          disabled: false,
          date: new Date(moment().startOf('week').toDate().setDate(moment().startOf('week').toDate().getDate() + 5)).toISOString().split('T')[0]
        },
        {
          value: 'fri',
          title: 'Пт',
          timeStart: '08:00',
          timeEnd: '20:00',
          dinnerStart: '00:00',
          dinnerEnd: '00:00',
          status: 'new',
          watched: false,
          disabled: false,
          date: new Date(moment().startOf('week').toDate().setDate(moment().startOf('week').toDate().getDate() + 6)).toISOString().split('T')[0]
        },
        {
          value: 'sat',
          title: 'Сб',
          timeStart: '08:00',
          timeEnd: '20:00',
          dinnerStart: '00:00',
          dinnerEnd: '00:00',
          status: 'new',
          watched: false,
          disabled: true,
          date: new Date(moment().startOf('week').toDate().setDate(moment().startOf('week').toDate().getDate() + 1)).toISOString().split('T')[0]
        },
        {
          value: 'sun',
          title: 'Вс',
          timeStart: '08:00',
          timeEnd: '20:00',
          dinnerStart: '00:00',
          dinnerEnd: '00:00',
          status: 'new',
          watched: false,
          disabled: true,
          date: moment().startOf('week').toDate().toISOString().split('T')[0]
        },
      ]
    },
    setColor(color){
      this.colorInputValue = color
    }
  },
  computed: {
    brand() {
      return !this.colorInputValue
        ? this.getRandomColor()
        : chroma(this.colorInputValue);
    },
    colors() {
      let colors;
      let superdarkColor;
      if(chroma(this.colorInputValue).rgb()[0] > 220 && chroma(this.colorInputValue).rgb()[1] > 210){
        colors = chroma.scale([this.colorInputValue, chroma(this.colorInputValue).darken(5).hex()]).mode('lch').colors(6)
        superdarkColor = chroma(colors[0]).brighten(2).hex();
      }else{
        colors = chroma.scale([this.colorInputValue, chroma(this.colorInputValue).brighten(5).hex()]).mode('lch').colors(6)
        superdarkColor = chroma(colors[0]).darken(2).hex();
      }

      let r = this.brand.hex().slice(1, 3), g = this.brand.hex().slice(3, 5), b = this.brand.hex().slice(5, 7);

      let inversionColor = inversion(r, g, b)
      let bodyStyles = document.body.style;
      let darkColor = chroma(colors[0]).darken(1).hex()

      bodyStyles.setProperty('--superdark-color', superdarkColor)
      bodyStyles.setProperty('--dark-color', darkColor)
      bodyStyles.setProperty('--main-color', colors[0])
      bodyStyles.setProperty('--main-1-color', colors[1])
      bodyStyles.setProperty('--neutral-color', colors[2]) 
      bodyStyles.setProperty('--meduim-color', colors[3])
      bodyStyles.setProperty('--meduim-1-color', colors[4])
      bodyStyles.setProperty('--lite-color', colors[5])

      return { 
        superdark: {
          name: "superdark",
          value: superdarkColor,
        },
        dark: {
          name: "dark",
          value: darkColor,
        },
        brand: {
          name: "main",
          value: colors[0],
        },
        main1: {
          name: "main-1",
          value: colors[1],
        },
        main2: {
          name: "main-2",
          value: colors[2],
        },
        meduim: {
          name: "meduim",
          value: colors[3]
        },
        meduim1: {
          name: "meduim1",
          value: colors[4],
        },
        lite: {
          name: "lite",
          value: colors[5],
        },
      };
    },
  },
  components: {
    MiniCalendar,
    VueTimepicker,
    ValidationProvider,
    ValidationObserver,
    AppSelect
  }
}
</script>

<style lang="less">
@import '../assets/css/simpleConModify.less';

</style>