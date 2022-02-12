<template>
  <div>
    <h1>Welcome to Dashboard</h1>
    <p>{{ quote.text }}</p>
    <h2>{{ quote.author }}</h2>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store";
export default {
  name: "Dashboard",
  data() {
    return {
      quoteList: "",
      quote: "",
      index: 0,
      userInfo: store.getters.getUserInfo,
    };
  },

  mounted() {
    axios.get("https://type.fit/api/quotes").then(({ data }) => {
      this.quoteList = data;
      this.quote = this.quoteList[this.index];
      this.index = Math.floor(Math.random() * 1643);
      setInterval(() => {
        this.quote = this.quoteList[this.index];
        this.index = Math.floor(Math.random() * 1643);
      }, 10000);
    });
  },
};
</script>

<style>
h1 {
  text-align: center;
  margin-top: 4%;
}
p {
  margin-top: 10%;
  text-align: center;
  font-size: 30px;
}
h2 {
  font-style: italic;
  text-align: center;
}
</style>
