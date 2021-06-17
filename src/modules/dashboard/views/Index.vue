<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  setup() {
    //
  },

  computed: {
    ...mapState(["user"]),
  },
});
</script>


<template>
  <div class="container mx-auto">
    <div>Dashboard</div>
    <div></div>
  </div>
</template>