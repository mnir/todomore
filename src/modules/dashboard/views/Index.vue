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
  <div class="w-2/3 mx-auto pt-12">
    <div>Dashboard</div>
    <div></div>
  </div>
</template>