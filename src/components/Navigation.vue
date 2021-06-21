<script lang="ts">
import { defineComponent, PropType } from "vue";
import { mapState } from "vuex";
import { ProjectState } from "../modules/project/store/interface";
import { UserState } from "../store/interface";
import NavigationProjectList from "./NavigationProjectList.vue";

export default defineComponent({
  components: { NavigationProjectList },
  props: {
    user: {
      required: true,
      type: Object as PropType<UserState>,
    },
  },
  setup() {},
  computed: {
    ...mapState(["project"]),
  },
});
</script>

<template>
  <div class="fixed top-0 left-0 w-64 h-screen bg-white dark:bg-gray-900">
    <div class="p-2">
      <router-link
        class="block w-full py-2 px-2 dark:hover:bg-gray-800 rounded"
        :to="{
          name: 'Dashboard',
          params: {
            vaultId: $route.params.vaultId,
          },
        }"
      >
        Dashboard
      </router-link>
      <router-link
        class="block py-2 w-full px-2 dark:hover:bg-gray-800 rounded"
        :to="{
          name: 'Todo',
          params: {
            vaultId: $route.params.vaultId,
          },
        }"
      >
        Tugas
      </router-link>
      <div class="mt-8 px-2 text-xs text-gray-600 uppercase tracking-wider">
        Proyek
      </div>
      <div v-if="project">
        <navigation-project-list
          v-for="project in project.projects"
          :key="project.id"
          :project="project"
        />
      </div>
    </div>
  </div>
  <div class="fixed top-0 right-0 h-10 p-4">
    <button v-if="user.image !== ''">
      <img :src="user.image" class="w-8 rounded-full" :alt="user.name" />
    </button>
  </div>
</template>

<style lang="css" scoped>
.router-link-active {
  @apply text-pink-400;
}
</style>