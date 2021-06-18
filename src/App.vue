<template>
  <navigation v-if="user.activeVault" :user="user" />
  <router-view></router-view>
  <app-status />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";
import AppStatus from "./components/AppStatus.vue";
import Navigation from "./components/Navigation.vue";

export default defineComponent({
  name: "App",
  components: { Navigation, AppStatus },
  computed: {
    ...mapState(["user"]),
  },
});
</script>
