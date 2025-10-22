// stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    access: '',
    user: null,
    role: ''  
  }),

  actions: {
    setAuth(access, user) {
      this.access = access
      this.user = user
      this.role = user?.role || ''   

      if (process.client) {
        localStorage.setItem('access', access)
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('role', this.role)
      }
    },

    updateAccess(token) {
      this.access = token
      if (process.client) {
        localStorage.setItem('access', token)
      }
    },

    loadPersist() {
      if (!process.client) return
      const a = localStorage.getItem('access')
      const u = localStorage.getItem('user')
      const r = localStorage.getItem('role')

      if (a) this.access = a
      if (u) this.user = JSON.parse(u)
      if (r) this.role = r
    },

    clearAuth() {
      this.access = ''
      this.user = null
      this.role = ''

      if (process.client) {
        localStorage.removeItem('access')
        localStorage.removeItem('user')
        localStorage.removeItem('role')
      }
    },

    async login(payload) {
      const { $api } = useNuxtApp()
      const res = await $api.post('/auth/login', payload)
      const { status, user, access, message } = res.data || {}
      if (!status) throw new Error(message || 'Login failed')

      this.setAuth(access, user)
      return res.data
    },

    async refreshAccess() {
      const { $api } = useNuxtApp()
      const res = await $api.post('/auth/refresh') 
      const { status, access, message } = res.data || {}
      if (!status || !access) throw new Error(message || 'Refresh failed')
      this.updateAccess(access)
      return access
    },

    async logout() {
      const { $api } = useNuxtApp()
      try {
        await $api.post('/auth/logout')
      } finally {
        this.clearAuth()
      }
    }
  }
})
