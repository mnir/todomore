<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ProjectState } from "../store/interface";
import ProjectItem from "./ProjectItem.vue";

export default defineComponent({
  components: { ProjectItem },
  props: {
    projects: {
      required: true,
      type: Object as PropType<ProjectState[]>,
    },
  },
  setup() {
    // create
  },
});
</script>


<template>
  <div class="w-2/3 mx-auto mt-12">
    <h3 class="font-bold text-xl mb-8">Proyek aktif</h3>
    <div v-for="project in projects" :key="project.id">
      <project-item :project="project" />
    </div>
  </div>
</template>