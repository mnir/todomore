<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { ProjectState } from "../store/interface";

export default defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute();

    const projects = computed(() => {
      return store.state.project.projects;
    });

    const project = computed(() => {
      return projects.value.filter((item: ProjectState) => {
        return item.id == route.params.projectId;
      });
    });

    return {
      project,
    };
  },
});
</script>


<template>
  <div>
    <div>{{ project[0].name }}</div>
  </div>
</template>