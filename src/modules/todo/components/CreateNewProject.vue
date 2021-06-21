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
      type: Object as PropType<ProjectState[]>,
    },
  },

  components: { CloseIcon },

  setup(props, { emit }) {
    const newProjectName = ref("");
    const selectedProject = ref<ProjectState>();

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
      <div class="flex items-center justify-end mb-8">
        <button
          @click="submitCloseProjectModal"
          class="
            hover:bg-purple-500
            rounded
            p-2
            transition
            duration-200
            focus:outline-none
          "
        >
          <close-icon />
        </button>
      </div>

      <h3 class="font-bold text-pink-500 mb-8 text-2xl">{{ newTodoName }}</h3>

      <div class="mb-8">
        <h3 class="font-bold mb-2">
          Project
          <span v-if="selectedProject">> {{ selectedProject.name }}</span>
        </h3>

        <template v-if="!selectedProject">
          <div v-for="project in projects" :key="project.id">
            <button
              @click="selectedProject = project"
              class="
                focus:outline-none
                block
                w-full
                text-left
                px-4
                py-4
                bg-gray-900
                rounded-md
                hover:bg-pink-600
                transition
                duration-200
              "
            >
              > {{ project.name }}
            </button>
          </div>
        </template>
      </div>

      <div>
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
              py-6
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