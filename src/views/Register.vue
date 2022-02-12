<template>
  <div class="register-form container-fluid">
    <h1>Register</h1>
    <Form :validation-schema="schema" @submit="register">
      <ErrorMessage name="username" />
      <div class="row g-3 align-items-center mb-3">
        <Field autocomplete=""
          v-model="username"
          class="form-control"
          name="username"
          placeholder="username"
        />
      </div>
      <ErrorMessage name="email" />
      <div class="row g-3 align-items-center mb-3">
        <Field autocomplete=""
          class="form-control"
          v-model="email"
          name="email"
          placeholder="Email"
        />
      </div>
      <ErrorMessage name="password" />

      <div class="row g-3 align-items-center mb-3">
        <Field autocomplete=""
          type="password"
          name="password"
          v-model="password"
          class="form-control"
          placeholder="Password"
        />
      </div>
      <span v-show="password && cnfPassword ? password !== cnfPassword : false"
        >Password Don't Match</span
      >
      <div class="row g-3 align-items-center mb-3">
        <Field autocomplete=""
          type="password"
          name="cnfpassword"
          v-model="cnfPassword"
          class="form-control"
          placeholder="Confirm Password"
        />
      </div>
      <div class="row g-3 align-items-center mb-3">
        <button class="btn btn-dark" type="submit">Register</button>
      </div>
      <div class="form-text">
        Already Registerd ? <router-link to="/user/login">Login</router-link>
      </div>
    </Form>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Register",
  data() {
    const schema = yup.object({
      username: yup.string().required(),
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    });
    return {
      username: "",
      email: "",
      password: "",
      cnfPassword: "",
      schema,
    };
  },
  comupted: {
    matchPassword() {
      return true;
    },
  },
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  methods: {
    register() {
      this.$store
        .dispatch("register", {
          email: this.email,
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.$router.push("/user/login");
        });
    },
  },
};
</script>

<style>
.register-form {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  z-index: -1;
}
</style>
