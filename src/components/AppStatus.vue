<template>
  <transition name="fade">
    <div
      v-if="isAppReady == false"
      class="
        fixed
        top-0
        left-0
        w-screen
        h-screen
        flex
        items-center
        justify-center
        bg-gray-900
      "
    >
      <p class="animate-pulse">Loading...</p>
    </div>
  </transition>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["isAppReady"]),
  },
};
</script>