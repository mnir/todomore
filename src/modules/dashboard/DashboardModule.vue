<script lang="ts">
import { defineComponent } from "vue";
import Navigation from "../../components/Navigation.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: { Navigation },

  data() {
    return {
      isModuleReady: false,
    };
  },

  created() {
    this.initFetch();
  },

  methods: {
    async initFetch() {
      const store = useStore();
      await store.dispatch("project/fetchProjects", this.$route.params.vaultId);
      await store.dispatch("todo/fetchTodos", this.$route.params.vaultId);
      this.isModuleReady = true;
    },
  },
});
</script>

<template>
  <div class="pl-64">
    <router-view v-if="isModuleReady"></router-view>
  </div>
</template>
