<template>
  <!-- footer ปกติ (ไม่ fixed / ไม่ sticky) -->
  <VFooter
    elevation="0"
    variant="text"
    class="footer-static pa-0"
  >
    <VContainer fluid class="pa-0 text-white text-center">
      <div class="copyright text-white">© 2020 - 2024 by xxxxx</div>
    </VContainer>
  </VFooter>
</template>

<style scoped>
.copyright {
  min-height: 30px;
  font-weight: 200 !important;
  font-size: 13px;
}

/* โปร่งใส + ไม่ fixed/sticky */
.footer-static { position: static !important; }
:deep(footer.v-footer) {
  position: static !important;
  background: transparent !important;
  background-color: transparent !important;
  box-shadow: none !important;
  inset: auto !important;
  transform: none !important;
  z-index: auto !important;
}

/* กัน layout บางธีมเติม padding ล่างให้ v-main */
:deep(.v-layout .v-main) {
  padding-bottom: 0 !important;
}
</style>
