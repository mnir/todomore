<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    text: {
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
  },
  setup() {},
});
</script>


<template>
  <router-link
    class="block w-full py-4 mb-1 px-2 dark:hover:bg-gray-800 rounded"
    :to="{
      name: name,
      params: {
        vaultId: $route.params.vaultId,
      },
    }"
  >
    {{ text }}
  </router-link>
</template>