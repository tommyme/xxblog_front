<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-space></q-space>
        <q-toolbar-title class="col-4">
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          个人博客系统
        </q-toolbar-title>
        <q-space style="flex-grow: 0.5;"></q-space>
        <q-list class="flex col-4">
          <q-item clickable v-for="(item, idx) in itemList.mapper" :key="idx">
            <q-item-section>
              <q-item-label>{{ item }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-item class="q-pl-md flex-center" clickable>
          <router-link style="height: min-content; color: white" to="/main/article">
            <div>文章列表</div>
          </router-link>
        </q-item>
      </q-toolbar>
    </q-header>


    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router';

import { useBlogStore } from 'src/stores/catagory-store';
const route = useRoute()
const itemList = useBlogStore()
console.log('itemList', itemList)
window.xx = itemList
</script>
