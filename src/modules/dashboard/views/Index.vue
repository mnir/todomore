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
          text-pink-500
          border border-gray-800
          rounded-md
          shadow-md
          w-full
          py-2
          px-4
          bg-gray-800
          placeholder-gray-600
          focus:outline-none
          focus:border focus:border-pink-600
          focus:placeholder-gray-700
          transition
          duration-100
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
        <div class="flex items-center justify-between mb-8">
          <h3 class="font-bold">{{ newTodoName }}</h3>
          <button @click="isSelectProjectModalOpen = false">x</button>
        </div>
        <div>
          <div class="flex items-start space-x-2">
            <input
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
              <option value="default">default</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>