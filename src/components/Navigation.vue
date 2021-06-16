<script lang="ts">
import { defineComponent, PropType } from "vue";
import { UserState } from "../store/types";

export default defineComponent({
  props: {
    user: {
      required: true,
      type: Object as PropType<UserState>,
    },
  },
  setup() {},
});
</script>


<template>
  <div class="fixed top-0 left-0 w-64 h-screen bg-white dark:bg-gray-900">
    <div></div>
  </div>
  <div class="fixed top-0 right-0 h-10 p-6">
    <button>
      <img :src="user.image" class="w-8 rounded-full" :alt="user.name" />
    </button>
  </div>
</template>