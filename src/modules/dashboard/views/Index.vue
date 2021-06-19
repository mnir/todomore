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
  <div>Dashboard</div>
  <div></div>
</template>