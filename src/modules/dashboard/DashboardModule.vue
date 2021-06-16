<script lang="ts">
import { defineComponent, ref } from "vue";
import Navigation from "../../components/Navigation.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: { Navigation },
  setup() {
    const store = useStore();
    const isModuleReady = ref(true);
    const user = store.state.user;

    return {
      user,
      isModuleReady,
    };
  },
});
</script>

<template>
  <navigation :user="user"></navigation>
  <div class="pl-64">
    <router-view v-if="isModuleReady"></router-view>
  </div>
</template>
