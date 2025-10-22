export default defineNuxtPlugin(() => {
  const { public: { apiBase } } = useRuntimeConfig()
  console.log('[API BASE]', apiBase)  
})