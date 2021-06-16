<script lang="ts">
import { defineComponent } from "vue";
import store from "../store";

export default defineComponent({
  setup() {
    const signIn = async () => {
      await store.dispatch("user/signIn");
    };

    return {
      signIn,
    };
  },
});
</script>



<template>
  <div
    class="
      fixed
      top-0
      left-0
      w-screen
      h-screen
      flex
      items-center
      justify-center
    "
  >
    <div>
      <div>Home</div>
      <button
        @click="signIn"
        class="
          focus:outline-none
          bg-blue-500
          text-white
          px-4
          py-2
          rounded
          hover:bg-blue-600
          transition
          duration-200
        "
      >
        Sign In dengan Google
      </button>
    </div>
  </div>
</template>