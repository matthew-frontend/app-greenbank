<template>
  <section class="section-banner">
    <v-carousel hide-delimiters crossfade class="responsive-carousel">
      <v-carousel-item
        v-for="(item, index) in banners"
        :key="index"
        :src="item.src"
        cover
      ></v-carousel-item>
    </v-carousel>
  </section>
</template>

<script setup>
const banners = [
  { src: "https://gg.lnwfile.com/_webp_max_images/2048/2048/2o/4b/uu.webp" },
  { src: "https://gg.lnwfile.com/_webp_max_images/2048/2048/54/n0/po.webp" },
  { src: "https://gg.lnwfile.com/_webp_max_images/2048/2048/gy/o2/kp.webp" },
];
</script>

<style scoped lang="scss">
.responsive-carousel {
  height: clamp(266px, 50vw, 638px) !important;
  :deep(.v-window__controls) {
    button {
      background-color: transparent;
      box-shadow: none;
      i {
        color: #000;
      }
    }
  }
}
</style>
