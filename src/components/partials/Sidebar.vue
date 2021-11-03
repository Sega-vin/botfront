<template>
  <div class="sidebar-wrapper">
    <button class="appBtn button-menu" @click.stop="drawer = !drawer" >
      {{ $t("Menu") }}
    </button>
    <v-navigation-drawer fixed temporary v-model="drawer" class="sidebar">
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <!-- <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img> -->
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">
              {{ name }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <!-- <router-link to="/" class="sidebar-link">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-home-city</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t("Project") }}</v-list-item-title>
          </v-list-item>
        </router-link> -->
        <router-link
          :to="{ name: 'LendingView', params: { id: idProject } }"
          class="sidebar-link"
        >
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-home-city</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t("Lending") }}</v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link to="/profile" class="sidebar-link">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-home-city</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t("Profile") }}</v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link :to="`/calendar`" class="sidebar-link">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-home-city</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t("Calendar") }}</v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link :to="`/`" class="sidebar-link">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-home-city</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Настройки</v-list-item-title>
          </v-list-item>
        </router-link>
        <a class="sidebar-link" @click="logout()">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-account-group-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t("Logout") }}</v-list-item-title>
          </v-list-item>
        </a>
        <!-- <v-select
          v-model="select"
          :items="items"
          label="Выбрать проект"
          @change="setProjectStore()"
        ></v-select> -->
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { Project } from "@/api/constructorApi";
export default {
  props: {
    selectProject: Object,
    selectCalendar: Object,
  },
  data: () => ({
    select: null,
    drawer: false,
    project: [],
    items: [],
  }),
  mounted() {
    this.getProject();
  },
  computed: {},
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
    async getProject() {
      try {
        // const config = await Project();
        // this.project = config.data.results;
        // this.project.forEach((item) => {
        //   this.items.push(item.name);
        // });
        // this.select = this.project[0].name
        // this.$emit('selectProject', {
        //   project: this.project[0],
        //   calendar: this.project[0].id
        // })
      } catch (err) {
        // console.log(err.response); 
      }
    },
    setProjectStore() {
      const actualProj = this.project.find((item) => item.name == this.select);
      this.$emit('selectProject', {
          project: actualProj,
          calendar: actualProj.id
        })
    },
  },
  computed: {
    name() {
      return this.$store.getters.user.first_name;
    },
    email() {
      return this.$store.getters.user.email;
    },
    idProject() {
      return this.$store.getters.project.id;
    },
  },
};
</script>