<template>
  <div class="blog-page">
    <VContainer max-width="1240">
      <!-- Breadcrumbs -->
      <BreadCrumbs :items="breadcrumbItems" />

      <!-- Header -->
      <div class="blog-header">
        <h1>บทความทั้งหมด</h1>
      </div>

      <!-- Blog Grid -->
      <div class="blog-grid">
        <CardBlog v-for="blog in allBlogs" :key="blog.id" :blog="blog" />
      </div>
    </VContainer>
  </div>
</template>

<script setup>
import { getAllBlogs } from "~/data/blogs.js";

const allBlogs = getAllBlogs();

// Breadcrumb items
const breadcrumbItems = [
  {
    title: "หน้าหลัก",
    disabled: false,
    href: "/",
  },
  {
    title: "บทความ",
    disabled: true,
  },
];

// SEO
useHead({
  title: "บทความ - Inspiration",
  meta: [
    {
      name: "description",
      content:
        "ไอเดียในการแต่งบ้านแบบต่างๆ ลองหาแรงบันดาลใจใหม่ๆ ในการแต่งบ้านของคุณ",
    },
  ],
});
</script>

<style lang="scss" scoped>
.blog-header {
  margin-bottom: 30px;
  @media (max-width: 767px) {
    margin-bottom: 10px;
  }
  h1 {
    font-size: 48px;
    font-weight: 700;
    color: #000;

    @media (max-width: 991px) {
      font-size: 36px;
    }
    @media (max-width: 767px) {
      font-size: 32px;
    }
  }

  .description {
    font-size: 20px;
    color: #666;
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}
</style>
