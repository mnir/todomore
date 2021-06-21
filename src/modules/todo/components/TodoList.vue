<script lang="ts">
import { defineComponent, PropType } from "vue";
import { TodoState } from "../store/interface";

export default defineComponent({
  props: {
    todo: {
      required: true,
      type: Object as PropType<TodoState>,
    },
  },
  setup() {},
});
</script>


<template>
  <button
    class="
      py-4
      border-b border-gray-800
      w-full
      text-left
      focus:outline-none
      flex
      justify-between
      text-indigo-400
      hover:bg-pink-500
      hover:text-gray-900
    "
  >
    <div>
      {{ todo.name }}
    </div>
    <div class="text-sm">
      {{ todo.project.name }}
    </div>
  </button>
</template>