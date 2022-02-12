<template>
  <div>
    <h1>Hello Admin</h1>
    <div class="admin-form container-fluid">
      <h1>Register</h1>
      <Form>
        <ErrorMessage name="username" />
        <div class="row g-3 align-items-center mb-3">
          <Field
            autocomplete=""
            v-model="username"
            class="form-control"
            name="username"
            placeholder="username"
          />
        </div>
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
        <span
          v-show="password && cnfPassword ? password !== cnfPassword : false"
          >Password Don't Match</span
        >
        <div class="row g-3 align-items-center mb-3">
          <Field
            autocomplete=""
            type="password"
            name="cnfpassword"
            v-model="cnfPassword"
            class="form-control"
            placeholder="Confirm Password"
          />
        </div>
      </Form>
      <div>
        <button @click.prevent="add" class="btn btn-dark" type="submit">
          Add
        </button>
        <button @click.prevent="update" class="btn btn-dark">Update</button>
        <button @click.prevent="remove" class="btn btn-dark">Delete</button>
      </div>
    </div>
    <div class="container-fluid">
      <table>
        <thead>
          <tr>
            <td>Sr.No</td>
            <td>Name</td>
            <td>Email</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in userList" :key="user">
            <td>{{ index }}</td>
            <td>{{ user?.email }}</td>
            <td>{{ user?.username }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>




<script>
import store from "../store";

import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "adminDashboard",
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
      userList: store.getters.getUsers && [...store.getters.getUsers],
    };
  },

  components: {
    Field,
    Form,
    ErrorMessage,
  },
  methods: {
    add() {
      this.$store
        .dispatch("create", {
          email: this.email,
          username: this.username,
          password: this.password,
        })
        .then(() => alert("User Added"));
      this.userList = store.getters.getUsers && [...store.getters.getUsers];
    },
    update() {
      this.$store
        .dispatch("update", {
          email: this.email,
          username: this.username,
          password: this.password,
        })
        .then(() => alert("User Updated"));
      this.userList = store.getters.getUsers && [...store.getters.getUsers];
    },
    remove() {
      this.$store
        .dispatch("remove", {
          email: this.email,
        })
        .then(() => alert("User Deleted"));
      this.userList = store.getters.getUsers && [...store.getters.getUsers];
    },
  },
};
</script>

<style>
.admin-form {
  width: 70%;
}
button {
  margin: 5px;
}
tr,
td {
  margin: 10px;
  padding: 10px;
  border: 1px solid black;
}
</style>
