<template>
  <v-app class="bg-white">
    <NavBar :is-home-page="true" />
    <v-main class="py-0">
      <slot />
    </v-main>
    <Footer />
  </v-app>
</template>

<style lang="scss" scoped>
// เพิ่ม padding-top เพื่อไม่ให้ content ถูกบังโดย fixed header
:deep(.v-main) {
  padding-top: 80px !important;
}
</style>
