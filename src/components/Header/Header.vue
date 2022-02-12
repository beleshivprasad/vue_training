<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Vue Arena</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
        </ul>
        <!-- Login and Sign Up Section  -->
        <ul class="navbar-nav ml-auto right" v-show="!isLoggedIn">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/user/login"
              >Login</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/user/register"
              >Register</router-link
            >
          </li>
        </ul>
        {{ isLoggedIn }}
        <!-- My Profile and Logout Section  -->
        <ul class="navbar-nav ml-auto right" v-show="isLoggedIn">
          <li class="nav-item dropdown d-flex">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ user }}
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link class="dropdown-item" to="/user/dashboard/profile"
                  >My Profile</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to=""
                  ><span @click="logout">Logout</span></router-link
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      user: this.$store.state.userInfo,
    };
  },
  computed: {
    isLoggedIn() {
      if (this.$store.state.token) {
        return true;
      } else {
        return false;
      }
    },
    userType() {
      if (this.$store.getters.getUserInfo === "admin@gmail.com") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/user/login");
      });
    },
  },
};
</script>

<style>
* {
  font-size: 18px;
}
.right {
  margin-right: 3%;
}
</style>