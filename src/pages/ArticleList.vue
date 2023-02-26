<script setup>
import { onMounted, reactive } from 'vue';
import { api } from 'src/boot/axios';
import { useBlogStore } from 'src/stores/catagory-store';
import { useRoute, useRouter } from 'vue-router';

const blogStore = useBlogStore()
const route = useRoute()
const router = useRouter()
onMounted(() => {
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
window.test = () => {
  console.log(blogStore.mapper)
}
const jmp2art = (id) => {
  router.push({
    path: '/main/article/' + id,
  })
}

</script>

<template>
  <q-list>
    <q-item v-for="art, idx in blogStore.articles" :key="idx" clickable @click="jmp2art(art.id)">
      <q-item-section>
        <div class="q-pl-md text-h6">{{ art.title }}</div>
        <div class="q-pl-md text-caption">{{ art.description }}</div>
      </q-item-section>
      <q-item-section class="col-3">
        <q-chip>
          <q-avatar>
            <q-icon name="menu"></q-icon>
          </q-avatar>
          <!-- <q-badge>{{ art.classId }}</q-badge> -->
          {{ blogStore.mapper[art.classId] }}
        </q-chip>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<style scoped></style>
