<template>
  <VAppBar color="primary" dark flat>
    <VContainer class="d-flex align-center justify-space-between">
      <!-- โลโก้ / ชื่อแบรนด์ -->
      <NuxtLink to="/" class="d-flex align-center text-decoration-none text-white">
        <VIcon icon="mdi-home" class="mr-2" />
        <span class="text-h6 font-weight-bold">MyBrand</span>
      </NuxtLink>

      <!-- เมนูหลัก -->
      <div class="d-none d-md-flex align-center">
        <NuxtLink v-for="item in links" :key="item.to" :to="item.to" class="nav-link mx-3">
          {{ item.label }}
        </NuxtLink>
      </div>

      <!-- ปุ่มเมนูมือถือ -->
      <VAppBarNavIcon class="d-md-none" @click="drawer = !drawer" />
    </VContainer>
  </VAppBar>

  <!-- Drawer มือถือ -->
  <VNavigationDrawer v-model="drawer" temporary>
    <VList>
      <VListItem v-for="item in links" :key="item.to" :to="item.to" @click="drawer = false">
        <VListItemTitle>{{ item.label }}</VListItemTitle>
      </VListItem>
    </VList>
  </VNavigationDrawer>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false)
const links = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products/category1' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]
</script>

<style scoped>
.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s;
}
.nav-link:hover {
  opacity: 0.7;
}
</style>
