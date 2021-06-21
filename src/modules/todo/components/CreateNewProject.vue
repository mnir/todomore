<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import CloseIcon from "../../../components/icons/CloseIcon.vue";
import { ProjectState } from "../../project/store/interface";
import store from "../../../store";

export default defineComponent({
  props: {
    vault: {
      required: true,
      type: String,
    },
    newTodoName: {
      required: true,
      type: String,
    },
    projects: {
      required: true,
      type: Array as PropType<ProjectState[]>,
    },
  },
  components: { CloseIcon },
  setup(props, { emit }) {
    const newProjectName = ref("");
    const selectedProject = ref("");

    const submitCloseProjectModal = () => {
      emit("close-modal");
    };

    const submitNewTask = () => {
      const data = {
        vaultId: props.vault,
        name: props.newTodoName,
        project: selectedProject.value,
      };
      store.dispatch("todo/createNewTodo", data).then(() => {
        emit("todo-created");
      });
    };

    return {
      newProjectName,
      selectedProject,
      submitCloseProjectModal,
      submitNewTask,
    };
  },
});
</script>


<template>
  <div
    class="
      fixed
      top-0
      left-0
      h-screen
      w-screen
      bg-black bg-opacity-75
      pt-40
      flex
      justify-center
    "
  >
    <div class="w-1/3">
      <div class="flex items-center justify-between mb-8">
        <h3 class="font-bold text-pink-500">{{ newTodoName }} - {{ vault }}</h3>
        <button @click="submitCloseProjectModal">
          <close-icon />
        </button>
      </div>
      <div>
        <div class="flex items-start space-x-2">
          <input
            v-model="newProjectName"
            type="text"
            class="
              px-4
              py-2
              rounded-md
              bg-gray-800
              w-1/2
              focus:outline-none
              focus:bg-purple-500
              text-white
              transition
              duration-200
            "
            placeholder="Masukan nama proyek baru..."
          />

          <select
            v-if="projects"
            v-model="selectedProject"
            name="project"
            class="
              w-1/2
              rounded-md
              py-2
              px-4
              mb-4
              bg-gray-800
              focus:outline-none
            "
          >
            <option
              v-for="project in projects"
              :key="project.id"
              :value="project"
            >
              {{ project.name }}
            </option>
          </select>
        </div>
        <div>
          <button
            @click="submitNewTask"
            class="
              focus:outline-none
              bg-purple-500
              hover:bg-purple-600
              w-full
              block
              rounded-md
              py-2
              uppercase
              text-sm
              font-bold
              tranistion
              duration-100
            "
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>