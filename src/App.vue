<template>
  <navigation v-if="user" :user="user" />
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";
import Navigation from "./components/Navigation.vue";

export default defineComponent({
  name: "App",
  components: { Navigation },
  computed: {
    ...mapState(["user"]),
  },
});
</script>

    Navigation