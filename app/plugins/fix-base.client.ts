export default defineNuxtPlugin(() => {
  const el = document.querySelector('base')
  if (el && el.getAttribute('href') !== '/') el.setAttribute('href', '/')
})