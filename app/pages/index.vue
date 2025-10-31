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
  layout: "home",
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

// SEO Meta Tags
useHead({
  title: "GREENBANKSHOP.COM ร้านกรีนแบงค์ ร้านกัญชาใกล้สุวรรณภูมิ",
  meta: [
    {
      name: "description",
      content:
        "ยินดีต้อนรับสู่ร้านค้าของเรา ที่พี่ชอย เขต 2 สาขาใกล้เคียง ใกล้สถานีขนส่งจังหวัด และในเมืองปราจีนบุรี จำหน่ายของพลาทหลาย รวดาลูก คุณภาพดี บริการเป็นกินเอง",
    },
    {
      name: "author",
      content: "Lovable",
    },
    {
      property: "og:title",
      content: "GREENBANKSHOP.COM ร้านกรีนแบงค์ ร้านกัญชาใกล้สุวรรณภูมิ",
    },
    {
      property: "og:description",
      content:
        "ยินดีต้อนรับสู่ร้านค้าของเรา ที่พี่ชอย เขต 2 สาขาใกล้เคียง ใกล้สถานีขนส่งจังหวัด และในเมืองปราจีนบุรี จำหน่ายของพลาทหลาย รวดาลูก คุณภาพดี บริการเป็นกินเอง",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:image",
      content:
        "https://storage.googleapis.com/gpt-engineer-file-uploads/QbZtbXGSkgMJ92u4Vsc5uQ5NyG72/social-images/social-1757601064378-Screenshot_23.png",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:site",
      content: "@lovable_dev",
    },
    {
      name: "twitter:image",
      content:
        "https://storage.googleapis.com/gpt-engineer-file-uploads/QbZtbXGSkgMJ92u4Vsc5uQ5NyG72/social-images/social-1757601064378-Screenshot_23.png",
    },
  ],
});
</script>

<style scoped lang="scss">
.landing-page {
  display: flex;
  flex-direction: column;
  gap: 0;
}
</style>
