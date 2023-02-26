<template>
  <q-page class="flex row" style="justify-content: center;">
    <div class="row col-9 q-mt-lg">
      <div class="column col-4">
        <q-card class="q-ma-md" style="background-color: #dfe6e9;">
          <q-list class="">
            <q-item class="flex-center column">
              <q-item-section avatar style="padding-right: 0;">
                <q-avatar size="60px">
                  <!-- <img src="https://cdn.quasar.dev/img/avatar.png"> -->
                  <q-img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>
              </q-item-section>
              <q-item-label class="text-subtitle1 q-pt-sm">不只是软件工程师</q-item-label>
            </q-item>
            <q-item class="column">
              <q-item-label class="text-h6 text-center q-pb-sm">社交账号</q-item-label>
              <q-item-section>
                <div class="row q-gutter-md flex-center">
                  <q-avatar color="black" size="36px" font-size="20px" text-color="white" icon="fa-brands fa-github" />
                  <q-avatar color="grey" size="36px" font-size="20px" text-color="white" icon="fa-brands fa-qq" />
                  <q-avatar color="green" size="36px" font-size="20px" text-color="white" icon="fa-brands fa-weixin" />
                </div>
              </q-item-section>
            </q-item>
          </q-list>

        </q-card>
        <q-card class="q-ma-md ">
          <q-list>
            <q-expansion-item clickable v-for="item, idx in Object.entries(blogStore.mapper)" class="bg-teal-1" :key="idx"
              style="align-items: center;" :label="item[1]" expand-separator>
              <q-card>
                <q-card-section>
                  <q-list>
                    <q-item v-for="art, idx in blogStore.classifiedArticles[Number(item[0])]" :key="idx" clickable
                      bordered @click="jmp2art(art.id)">
                      <q-item-section>
                        <div class="text-h6">{{ art.title }}</div>
                        <div class="text-caption">{{ art.description }}</div>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </q-card>
        <!-- <q-card class="q-ma-md col"> -->
        <!-- <q-btn label="store" @click="log(blogStore.classifiedArticles)"></q-btn> -->
        <!-- <q-btn label="store" @click=""></q-btn> -->
        <!-- <q-btn label="store" @click=""></q-btn> -->
        <!-- </q-card> -->
      </div>
      <div class="column col-8">
        <q-card class="q-ma-md">
          <q-item>
            <q-breadcrumbs gutter="sm">
              <!-- https://quasar.dev/vue-components/breadcrumbs#connecting-to-vue-router -->
              <q-breadcrumbs-el v-for="item, idx in pathMx" :key="idx" :label="item.name" :to="item.path" />
            </q-breadcrumbs>
          </q-item>
          <router-view :key="route.fullPath" />
        </q-card>
      </div>

    </div>
  </q-page>
</template>

<script setup>
import { defineComponent, computed, onMounted } from 'vue'
import { api } from 'boot/axios'
import { useBlogStore } from 'stores/catagory-store'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const jmp2art = (id) => {
  router.push({
    path: '/main/article/' + id,
    query: {
      date: new Date().getTime()
    }
  })
}
console.log(route.path)
const blogStore = useBlogStore()
console.log(blogStore.articles)

const log = (...args) => { console.log(args) }
const rpath = computed(() => { return useRoute().path });
const pathMx = computed(() => {
  const t = rpath.value.split('/').slice(1);
  let tr = "/";
  let res = new Array();
  for (var i in t) {
    res.push({
      name: t[i],
      path: tr + t[i]
    })
    tr += t[i] + '/';
  }
  console.log(res)
  return res
});

onMounted(() => {
  api.get('/article/class')
    .then(resp => resp.data.data.classes.records)
    .then(data => {
      console.log(data)
      // window.data = data
      data.map(i => {
        blogStore.mapper[i.id] = i.name
      })
    })
  api.get('/article/list')
    .then(resp => resp.data.data)
    .then(data => {
      // store中存储 文章和分类的文章
      Object.assign(blogStore.articles, data.articles.records)
      const classified = {}
      blogStore.articles.forEach(article => {
        if (!classified[article.classId]) {
          classified[article.classId] = [article]
        } else {
          classified[article.classId].push(article)
        }
      })
      Object.assign(blogStore.classifiedArticles, classified)
    })
})
</script>
