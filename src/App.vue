<template>
  <div id="nav"><HeaderVue /></div>
  <router-view />
</template>

<script>
import HeaderVue from "./components/Header/Header.vue";
export default {
  components: {
    HeaderVue,
  },
};
</script>
