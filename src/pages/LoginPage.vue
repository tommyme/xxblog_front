<script setup>
import { ref } from 'vue'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router';
const username = ref("admin")
const password = ref("12345678")
const router = useRouter()
const login = () => {
  api.post('/login', { username: username.value, password: password.value })
    .then(resp => {
      console.log(resp)
      router.push({
        path: '/main'
      })
    })
    .catch(err => {
      console.log('error!!!')
      console.log(err)
    })
}
</script>

<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <div class="column">
          <div class="col text-h6 q-ma-lg">
            登录博客系统
          </div>
          <div class="column col">
            <q-input v-model="username" label="username" />
            <q-input v-model="password" label="password" />
            <q-btn class="q-ma-lg" @click="login" label="login"></q-btn>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped></style>
