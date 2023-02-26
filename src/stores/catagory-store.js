import { defineStore } from 'pinia';

export const useBlogStore = defineStore('catagory', {
  state: () => ({
    mapper: { 0: "未分类" },
    articles: [],
    classifiedArticles: {}
  }),
  getters: {
    nCount: (state) => state.catagory * 2,
  },
  actions: {
    increment() {
      this.catagory++;
    },
  },
});
