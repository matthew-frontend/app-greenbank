import { useAuthStore } from '~/stores/auth' 
export default defineNuxtPlugin((nuxtApp) => {
  const auth = useAuthStore()
  auth.loadPersist()  

  const apiBase = useRuntimeConfig().public.apiBase

  // Hook ทุกครั้งก่อนยิง $fetch
  nuxtApp.$fetch = $fetch.create({
    baseURL: apiBase,
    credentials: 'include',  
    onRequest({ options }) {
      if (auth.access) {
        options.headers = {
          ...(options.headers || {}),
          Authorization: `Bearer ${auth.access}`
        }
      }
    },
    async onResponseError({ response, request, options }) {
      // ถ้า 401 ลอง refresh access แล้ว retry 1 ครั้ง
      if (response.status === 401) {
        try {
          const newAccess = await auth.refreshAccess()
          options.headers = {
            ...(options.headers || {}),
            Authorization: `Bearer ${newAccess}`
          }
          return $fetch.raw(request, options)  
        } catch (e) {
          auth.clearAuth() 
          if (process.client) navigateTo('/login')
        }
      }
      throw response._data || response
    }
  })
})
