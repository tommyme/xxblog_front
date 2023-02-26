<script setup>
import { useRoute } from 'vue-router';
import { onMounted, reactive, ref } from 'vue';
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
const route = useRoute()
const articleId = route.params.id
let article = reactive({})
onMounted(() => {
  api.get('/article/list/' + articleId)
    .then((resp) => resp.data)
    .then((data) => {
      // console.log(article)
      // console.log(data.data.article)
      // console.log(article.value)
      Object.assign(article, data.data.article)
      console.log(article)
    })
})
const log = console.log
const $q = useQuasar()
const getTime = (timestamp) => {
  var date = new Date(timestamp); // Convert to milliseconds

  // Get the date components using local time
  var year = date.getFullYear();
  var month = date.getMonth() + 1; // Months are zero-based
  var day = date.getDate();
  // var hour = date.getHours();
  // var minute = date.getMinutes();
  // var second = date.getSeconds();
  var formattedDate = year + "/" + month + "/" + day;
  return formattedDate
}

const comment = ref('')
const commentList = reactive([])
const doComment = () => {
  const now = new Date()
  const newComment = {
    "articleId": articleId,
    "content": comment.value,
    // "createTime": "2023-02-26T05:40:46.238Z",
    "createTime": now.toISOString(),
    "isShow": true,
    "username": "admin"
  }
  api.post('/article/comment', newComment)
  commentList.push(newComment)
}

const loadComments = () => {
  api.get(`/article/getCommentsList/${articleId}`)
    .then(resp => {
      console.log('comments', resp.data)
      return resp.data.data.comments
    })
    .then(comments => {
      console.log('obj assign')
      console.log(comments)
      Object.assign(commentList, comments)
    })
  // item format
  // {
  //   "id": 2,
  //   "articleId": 2,
  //   "parentId": null,
  //   "content": "好好好",
  //   "username": "kkkk",
  //   "createTime": 1676979161000,
  //   "isShow": true
  // },
}
onMounted(() => {
  loadComments()
})
</script>

<template>
  <div class="q-ma-md">
    <article>
      <div class="text-h5 text-center q-pb-sm" :textContent="article.title"></div>
      <div class="text-caption text-center q-pb-sm">{{ article.description }}</div>
      <div class="flex flex-center q-gutter-md">
        <div>
          created:
          <q-badge color="teal">{{ getTime(article.createTime) }}</q-badge>
        </div>
        <div>
          modified:
          <q-badge color="teal">{{ getTime(article.updateTime) }}</q-badge>
        </div>
      </div>
      <div class="article" v-html="article.content">

      </div>
    </article>
    <div class="q-pt-lg">
      <q-card>
        <div class="text-center q-pa-md text-h6">留下你的评论吧</div>
        <div class="row flex-center">
          <q-input v-model="comment" filled autogrow class="col-9 q-pa-md" />
          <q-btn label="submit" @click="doComment"></q-btn>
        </div>
        <div>
          <q-list>
            <q-item v-for="cmt, idx in commentList" :key="idx" class="column">
              <div class="row">
                <div class="row col-3" style="align-items: center;background-color: bisque;">
                  <q-avatar size="24px">
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                  </q-avatar>
                  <div class="text-title q-ml-sm" style="height: min-content;">{{ cmt.username }}</div>
                </div>

              </div>
              <q-item-section>
                <div class="text-title q-pl-lg">{{ cmt.content }}</div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card>
    </div>
  </div>
</template>

<style>
.article * {
  all: revert !important;
}
</style>
