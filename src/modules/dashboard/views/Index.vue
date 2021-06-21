<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  setup() {},
  computed: {
    ...mapState(["vault"]),
  },
});
</script>

<template>
  <main class="w-2/3 mx-auto pt-12">
    <h1 class="text-2xl font-bold italic">Dashboard</h1>
  </main>
</template>