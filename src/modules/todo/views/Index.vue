<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapState } from "vuex";
import CreateNewProject from "../components/CreateNewProject.vue";
import TodoList from "../components/TodoList.vue";

export default defineComponent({
  components: { CreateNewProject, TodoList },
  setup() {
    const isSelectProjectModalOpen = ref(false);
    const newTodoName = ref("");
    const submitNewTodo = () => {
      if (newTodoName.value == "") return;
      isSelectProjectModalOpen.value = true;
    };

    const todoCreated = () => {
      isSelectProjectModalOpen.value = false;
      newTodoName.value = "";
    };

    return {
      newTodoName,
      isSelectProjectModalOpen,
      submitNewTodo,
      todoCreated,
    };
  },

  computed: {
    ...mapState(["user", "activeVault", "project", "todo"]),
  },
});
</script>

<template>
  <div class="w-2/3 mx-auto pt-12">
    <div class="mb-8 text-2xl font-bold italic">Tugas</div>
    <div>
      <input
        type="text"
        v-model.trim="newTodoName"
        class="
          text-pink-500
          border-2 border-gray-800
          rounded-md
          shadow-md
          w-full
          py-2
          px-4
          bg-gray-800
          placeholder-gray-600
          focus:outline-none
          focus:border focus:border-purple-600
          focus:placeholder-gray-700
          transition
          duration-100
        "
        @keyup.enter="submitNewTodo"
        placeholder="Tugas baru"
      />
    </div>
    <div class="mb-8">
      <create-new-project
        v-if="isSelectProjectModalOpen"
        :vault="activeVault"
        :projects="project.projects"
        :newTodoName="newTodoName"
        @close-modal="isSelectProjectModalOpen = false"
        @todo-created="todoCreated"
      />
    </div>
    <todo-list v-for="todo in todo.todos" :key="todo.id" :todo="todo" />
  </div>
</template>