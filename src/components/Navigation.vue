<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { mapState } from "vuex";
import { useRoute } from "vue-router";
import { UserState } from "../store/interface";
import AddIcon from "./icons/AddIcon.vue";
import NavigationProjectList from "./NavigationProjectList.vue";
import store from "../store";

export default defineComponent({
  components: { NavigationProjectList, AddIcon },
  props: {
    user: {
      required: true,
      type: Object as PropType<UserState>,
    },
  },
  setup() {
    const route = useRoute();

    const isCreateProjectInputOpen = ref(false);
    const projectName = ref("");

    const submitNewProject = async () => {
      isCreateProjectInputOpen.value = false;
      if (projectName.value == "") return;

      const data = {
        name: projectName.value,
        vaultId: route.params.vaultId,
      };
      await store.dispatch("project/createNewProject", data);
      projectName.value = "";
    };

    return {
      projectName,
      isCreateProjectInputOpen,
      submitNewProject,
    };
  },
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
      <div
        class="
          mt-8
          px-2
          text-gray-600
          uppercase
          tracking-wider
          flex
          justify-between
          items-center
        "
      >
        <div class="text-xs">Proyek</div>
        <button
          @click="isCreateProjectInputOpen = true"
          class="
            focus:outline-none
            hover:bg-purple-500
            hover:text-white
            transition
            duration-200
            rounded
            p-2
            -mr-4
          "
        >
          <add-icon />
        </button>
      </div>
      <div class="px-2 mb-4" v-if="isCreateProjectInputOpen">
        <input
          v-model="projectName"
          type="text"
          class="focus:outline-none py-2 px-4 rounded dark:bg-gray-800"
          placeholder="Nama proyek..."
          @keyup.enter="submitNewProject"
          @blur="isCreateProjectInputOpen = false"
        />
      </div>
      <div v-if="project">
        <router-link
          :to="{ name: 'Project', params: { vaultId: $route.params.vaultId } }"
          class="block w-full py-4 px-2 hover:bg-gray-800 rounded"
        >
          All Projects
        </router-link>
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