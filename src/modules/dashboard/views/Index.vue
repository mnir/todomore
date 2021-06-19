<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  setup() {
    const isSelectProjectModalOpen = ref(false);
    const newTodoName = ref("");
    const submitNewTodo = function () {
      if (newTodoName.value == "") return;
      isSelectProjectModalOpen.value = true;
    };

    return {
      newTodoName,
      isSelectProjectModalOpen,
      submitNewTodo,
    };
  },

  computed: {
    ...mapState(["user"]),
  },
});
</script>


<template>
  <div class="w-2/3 mx-auto pt-12">
    <div>Dashboard</div>
    <div>
      <input
        type="text"
        v-model.trim="newTodoName"
        class="
          focus:outline-none
          w-full
          py-2
          px-4
          bg-gray-800
          rounded-md
          shadow-md
          placeholder-gray-600
          focus:bg-pink-600
          focus:placeholder-pink-300
          text-gray-900
          transition
          duration-200
        "
        @keyup.enter="submitNewTodo"
        placeholder="Tugas baru"
      />
    </div>
    <div
      v-if="isSelectProjectModalOpen"
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
        <h3 class="font-bold mb-8">{{ newTodoName }}</h3>
        <div>
          <div>
            <select
              name="project"
              class="
                w-full
                rounded-md
                py-2
                px-4
                mb-4
                bg-gray-800
                focus:outline-none
              "
            ></select>
          </div>
          <input
            type="text"
            class="
              px-2
              py-2
              rounded-md
              bg-gray-800
              w-full
              focus:outline-none
              focus:bg-purple-500
              text-white
              transition
              duration-200
            "
            placeholder="Pilih proyek"
          />
        </div>
      </div>
    </div>
  </div>
</template>