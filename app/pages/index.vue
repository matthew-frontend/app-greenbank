<template>
  <div class="landing-page">
    <SectionBanner />
    <SectionProducts />
    <SectionHighlight />
    <SectionNew />
    <SectionRecommend />
    <SectionChooseUs />
    <SectionInspiration />
    <SectionShipping />
    <SectionSlider />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "home"
});

import SectionBanner from "~/components/homepage/SectionBanner.vue";
import SectionChooseUs from "~/components/homepage/SectionChooseUs.vue";
import SectionHighlight from "~/components/homepage/SectionHighlight.vue";
import SectionInspiration from "~/components/homepage/SectionInspiration.vue";
import SectionNew from "~/components/homepage/SectionNew.vue";
import SectionProducts from "~/components/homepage/SectionProducts.vue";
import SectionRecommend from "~/components/homepage/SectionRecommend.vue";
import SectionShipping from "~/components/homepage/SectionShipping.vue";
import SectionSlider from "~/components/homepage/SectionSlider.vue";
</script>

<style scoped lang="scss">
.landing-page {
  display: flex;
  flex-direction: column;
  gap: 0;
}
</style>
