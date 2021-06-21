<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { TodoState } from "../../todo/store/interface";
import TodoItem from "../components/TodoItem.vue";
import { ProjectState } from "../store/interface";

export default defineComponent({
  components: { TodoItem },
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

    const todos = computed(() => {
      return store.state.todo.todos;
    });

    const currentTodos = computed(() => {
      return todos.value.filter((item: TodoState) => {
        return item.project.id == route.params.projectId;
      });
    });

    return {
      project,
      currentTodos,
    };
  },
});
</script>


<template>
  <div class="w-2/3 mx-auto mt-12">
    <h2 class="text-xl font-bold mb-8">{{ project[0].name }}</h2>
    <div>
      <div v-for="todo in currentTodos" :key="todo.id">
        <todo-item :todo="todo" />
      </div>
    </div>
  </div>
</template>