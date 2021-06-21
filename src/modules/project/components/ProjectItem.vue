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
  setup() {},
});
</script>


<template>
  <div class="flex items-center justify-between py-4 border-b border-gray-800">
    <div>
      {{ project.name }}
    </div>
    <div>{{ project.taskCount }}</div>
  </div>
</template>