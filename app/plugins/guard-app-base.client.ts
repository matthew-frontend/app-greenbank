export default defineNuxtPlugin(() => {
  const router = useRouter()
  router.beforeEach((to) => {
    if (to.path.startsWith('/app-app/')) {
      const clean = to.path.replace(/^\/app-app/, '') || '/'
      return { path: clean, query: to.query, hash: to.hash, replace: true }
    }
  })
})