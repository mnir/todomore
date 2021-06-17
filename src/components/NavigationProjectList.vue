<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ProjectState } from "../store/interface";

export default defineComponent({
  props: {
    project: {
      required: true,
      type: Object as PropType<ProjectState>,
    },
  },
});
</script>


<template>
  <router-link
    :to="{
      name: 'Project',
      params: {
        userId: this.$route.params.userId,
        vaultId: this.$route.params.vaultId,
        projectId: project.id,
      },
    }"
    class="block py-1 px-2 dark:hover:bg-gray-800"
  >
    {{ project.name }}
  </router-link>
</template>