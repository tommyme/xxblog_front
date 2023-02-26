
const routes = [
  {
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/layouts/SecondLayout.vue'),
        children: [
          { path: '', component: () => import('pages/IndexPage.vue') },
          { path: 'test', component: () => import('pages/TestPage.vue') },
          { path: 'article', component: () => import('pages/ArticleList.vue') },
          { path: 'article/:id', component: () => import('pages/ArticlePage.vue') },
        ]
      },
    ],
  },
  {
    path: '/', component: () => import('pages/LoginPage.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
