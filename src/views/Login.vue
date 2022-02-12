<template>
  <div class="login-form container-fluid">
    <h1>Login</h1>
    <Form :validation-schema="schema" @submit="login">
      <span style="color: red">{{ error }}</span>
      <ErrorMessage name="email" />
      <div class="row g-3 align-items-center mb-3">
        <Field
          autocomplete=""
          class="form-control"
          v-model="email"
          name="email"
          placeholder="Email"
        />
      </div>
      <ErrorMessage name="password" />
      <div class="row g-3 align-items-center mb-3">
        <Field
          autocomplete=""
          type="password"
          name="password"
          v-model="password"
          class="form-control"
          placeholder="Password"
        />
      </div>
      <div class="row g-3 align-items-center mb-3">
        <button class="btn btn-dark">Login</button>
      </div>
      <div class="form-text">
        New User ? <router-link to="/user/register">Register</router-link>
      </div>
    </Form>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import store from "../store";

export default {
  name: "Login",
  data() {
    const schema = yup.object({
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    });
    return {
      email: "",
      password: "",
      schema,
      error: store.getters.getError,
    };
  },
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", { email: this.email, password: this.password })
        .then(() => {
          console.log(this.$store.state.userInfo);
          if (this.$store.state.userInfo === "admin@gmail.com") {
            this.$router.push("/admin/dashboard");
          } else {
            this.$router.push("/user/dashboard");
          }
        });
    },
  },
};
</script>

<style>
.login-form {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  z-index: -1;
}
</style>
