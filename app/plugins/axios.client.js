import axios from 'axios'
import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin((nuxtApp) => {
  const { public: { apiBase } } = useRuntimeConfig()

  const api  = axios.create({ baseURL: apiBase, withCredentials: true })
  const raw  = axios.create({ baseURL: apiBase, withCredentials: true })

  // ค่าเริ่มต้น: ทุก request จะรีโหลดเมื่อเจอ 401 (ยกเว้นตามเงื่อนไขด้านล่าง)
  api.defaults._reloadOn401 = true

  // ---- helpers ----
  const normalizePath = (url = '') => {
    try {
      if (/^https?:\/\//i.test(url)) return new URL(url).pathname || ''
    } catch {}
    return url || ''
  }

  // รองรับ /auth/*, /members/login|register และแบบมีภาษานำหน้า
  const isAuthRoute = (url = '') => {
    const path = normalizePath(url)
    // prefix ภาษา: /en หรือ /th หรือ en-US
    const locale = '(?:\\/[a-z]{2}(?:-[A-Z]{2})?)?'
    const re = new RegExp(
      `^${locale}\\/(?:auth\\/(login|refresh|logout|register)|members\\/(login|register))(?:\\/|\\?|#|$)`
    )
    return re.test(path)
  }

  const setAuthHeader = (headers, token) => {
    if (!headers) return
    const val = token ? `Bearer ${token}` : undefined
    if (typeof headers.set === 'function') {
      if (val) headers.set('Authorization', val)
      else headers.delete?.('Authorization')
    } else {
      if (val) headers.Authorization = val
      else delete headers.Authorization
    }
  }
  const hasAuthHeader = (headers) => {
    if (!headers) return false
    if (typeof headers.get === 'function') return !!headers.get('Authorization')
    return !!headers.Authorization
  }

  // ----- Request -----
  api.interceptors.request.use((config) => {
    const auth = useAuthStore()
    const url = config?.url || ''
    config.headers = config.headers || {}

    // อย่าใส่ Authorization กับ auth routes (login/register/refresh/logout)
    if (isAuthRoute(url)) {
      setAuthHeader(config.headers, null)
      return config
    }
    if (auth.access) setAuthHeader(config.headers, auth.access)
    return config
  })

  // ----- Response -----
  let refreshing = false
  const queue = []

  api.interceptors.response.use(
    r => r,
    async (error) => {
      const { response, config } = error || {}
      const status = response?.status
      const url = config?.url || ''
      const auth = useAuthStore()

      // =========================
      // ✅ GLOBAL 401 -> RELOAD/REDIRECT เฉพาะเคสที่มี Authorization เท่านั้น
      //    (ถ้า login ผิด: ไม่มี Authorization header → จะไม่รีโหลด)
      // =========================
      const wantReload = config?._reloadOn401 ?? api.defaults._reloadOn401
      const hadAuth = hasAuthHeader(config?.headers)

      if (status === 401 && wantReload && !isAuthRoute(url) && hadAuth && process.client) {
        try { auth.clearAuth?.() } catch {}
        const now  = Date.now()
        const last = Number(sessionStorage.getItem('last401') || 0)
        sessionStorage.setItem('last401', String(now))
        if (now - last < 1500) {
          window.location.href = '/'
          return Promise.reject(error)
        }
        window.location.reload()
        return Promise.reject(error)
      }

      // ---- refresh-flow (จะไม่ทำงานสำหรับ auth routes) ----
      const noNeedRefresh =
        status !== 401 ||
        config?._retry ||
        isAuthRoute(url) ||
        !hadAuth

      if (noNeedRefresh) return Promise.reject(error)

      if (!refreshing) {
        refreshing = true
        try {
          // refresh ด้วย raw (ไม่ติด interceptor) และไม่ส่ง Authorization เดิม
          const r = await raw.post('/auth/refresh', null, { headers: {} })
          const newAccess = r.data?.access
          if (!newAccess) throw new Error('No access from refresh')

          if (typeof auth.updateAccess === 'function') auth.updateAccess(newAccess)
          else auth.setAuth(newAccess, auth.user)

          queue.forEach(cb => cb(newAccess))
          queue.length = 0
        } catch (e) {
          try { auth.clearAuth?.() } catch {}
          queue.length = 0

          if (process.client) {
            nuxtApp.runWithContext(() => {
              const route = useRoute()
              const from = route?.fullPath || '/'

              // ดึง prefix ภาษา (เช่น /en หรือ /th)
              const m = route?.path?.match(/^\/[a-z]{2}(?:-[A-Z]{2})?/i)
              const prefix = m ? m[0] : ''
              const target = `${prefix}/login` // staff login path ตามที่กำหนด

              if (route?.path !== target) {
                navigateTo(target + '?next=' + encodeURIComponent(from), { replace: true })
              } else {
                window.location.reload()
              }
            })
          }
          return Promise.reject(e)
        } finally {
          refreshing = false
        }
      }

      // รอ refresh เสร็จแล้ว retry 1 ครั้ง
      return new Promise((resolve) => {
        queue.push((token) => {
          config._retry = true
          config.headers = config.headers || {}
          setAuthHeader(config.headers, token)
          resolve(api(config))
        })
      })
    }
  )

  return { provide: { api } }
})
