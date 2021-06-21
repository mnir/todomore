<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ProjectState } from "../modules/project/store/interface";

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
      name: 'ProjectShow',
      params: {
        vaultId: $route.params.vaultId,
        projectId: project.id,
      },
    }"
    class="
      py-4
      px-2
      dark:hover:bg-gray-800
      flex
      justify-between
      items-center
      mb-1
    "
  >
    <div>
      {{ project.name }}
    </div>
    <div>
      {{ project.taskCount }}
    </div>
  </router-link>
</template>