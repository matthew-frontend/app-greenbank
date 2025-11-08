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
  {
    src: "https://scontent.fbkk35-1.fna.fbcdn.net/v/t39.30808-6/516394115_1040425548287562_6586316746366259364_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=sBmBP5zVwnQQ7kNvwHyJLlf&_nc_oc=AdnGtfzZ8Ko0NSFcNiOKPz8Yvg03p-bZAcwGKzf4hNT7n8b58QIfGXKxmX05ofI1uw6OXmRDX1ZcP_1rNYjLytV3&_nc_zt=23&_nc_ht=scontent.fbkk35-1.fna&_nc_gid=Mk0ty_ggi2gGXOCEsFb1lQ&oh=00_AfiXoNnHbF1Rz_zi60S8DueB9XZmB7F2BI_SeetfxGV2ZA&oe=69149862",
  },
  {
    src: "https://scontent.fbkk35-1.fna.fbcdn.net/v/t39.30808-6/481201943_942812664715518_4856407495179496429_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=86c6b0&_nc_ohc=Fq62V5jR8toQ7kNvwEEuSig&_nc_oc=AdnG55ShWFZxMQsAV0-6CgyvQLhkZYjvMZ7RBrzG4Us55Ah7-dYQ6S05mmgkowTXwYCtoX3Z7lf9S_xsEGFd254f&_nc_zt=23&_nc_ht=scontent.fbkk35-1.fna&_nc_gid=vp9BfmSxUYdLB5I670T-UQ&oh=00_Afj8ZycIQ72tPzrw9OvF8kNZJ_xyoxtU13uRpUsxzXZx9Q&oe=6914B87A",
  },
  {
    src: "https://scontent.fbkk35-1.fna.fbcdn.net/v/t39.30808-6/516394115_1040425548287562_6586316746366259364_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=sBmBP5zVwnQQ7kNvwHyJLlf&_nc_oc=AdnGtfzZ8Ko0NSFcNiOKPz8Yvg03p-bZAcwGKzf4hNT7n8b58QIfGXKxmX05ofI1uw6OXmRDX1ZcP_1rNYjLytV3&_nc_zt=23&_nc_ht=scontent.fbkk35-1.fna&_nc_gid=Mk0ty_ggi2gGXOCEsFb1lQ&oh=00_AfiXoNnHbF1Rz_zi60S8DueB9XZmB7F2BI_SeetfxGV2ZA&oe=69149862",
  },
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
