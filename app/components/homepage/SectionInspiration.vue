<template>
  <section class="section-inspiration">
    <VContainer max-width="1240">
      <h2>Inspiration</h2>
      <p class="description">
        ไอเดียในการแต่งบ้านแบบต่างๆ ลองหาแรงบันดาลใจใหม่ๆ ในการแต่งบ้านของคุณ
        เพื่อให้บ้านเป็นมากกว่าแค่ที่พักอาศัย
      </p>
      <div class="gridBlog">
        <CardBlog v-for="blog in latestBlogs" :key="blog.id" :blog="blog" />
      </div>
    </VContainer>
  </section>
</template>

<script setup>
import { getLatestBlogs } from "~/data/blogs.js";

const latestBlogs = getLatestBlogs(3);
</script>

<style scoped lang="scss">
.section-inspiration {
  h2 {
    font-size: 34px;
    margin-bottom: 14px;
    text-align: center;
    @media (max-width: 767px) {
      font-size: 24px;
      margin-bottom: 0;
    }
  }
  .gridBlog {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    @media (max-width: 767px) {
      grid-template-columns: 1fr;
    }
  }
  .description {
    font-size: 22px;
    text-align: center;
    margin-bottom: 28px;
    @media (max-width: 767px) {
      font-size: 18px;
    }
  }
}
</style>
