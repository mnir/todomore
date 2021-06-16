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
  <div>Hi</div>
  <div v-if="user">{{ user }}</div>
</template>