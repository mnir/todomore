<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";
import ProjectList from "../components/ProjectList.vue";

export default defineComponent({
  components: { ProjectList },
  setup() {},
  computed: {
    ...mapState(["project"]),
  },
});
</script>


<template>
  <div>
    <project-list :projects="project.projects" />
  </div>
</template>
