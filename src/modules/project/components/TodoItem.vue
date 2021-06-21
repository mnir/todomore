<script lang="ts">
import { defineComponent, PropType } from "vue";
import { TodoState } from "../../todo/store/interface";

export default defineComponent({
  props: {
    todo: {
      required: true,
      type: Object as PropType<TodoState>,
    },
  },
  setup() {
    //
  },
});
</script>


<template>
  <div class="">
    <button
      class="
        focus:outline-none
        px-2
        py-4
        border-b
        w-full
        block
        text-left text-indigo-400
        border-gray-800
        hover:bg-pink-500
        hover:text-gray-900
        transition
        duration-200
      "
    >
      {{ todo.name }}
    </button>
  </div>
</template>