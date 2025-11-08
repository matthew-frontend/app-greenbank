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
        <CardBlog v-for="blog in displayedBlogs" :key="blog.id" :blog="blog" />
      </div>

      <!-- Show More Button -->
      <div v-if="!showAll && allBlogs.length > 3" class="show-more-container">
        <VBtn
          @click="showAll = true"
          class="show-more-btn"
          size="large"
          variant="outlined"
        >
          แสดงทั้งหมด
        </VBtn>
      </div>
    </VContainer>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { getAllBlogs } from "~/data/blogs.js";

const allBlogs = getAllBlogs();
const showAll = ref(false);

// Display only 3 blogs initially, show all when showAll is true
const displayedBlogs = computed(() => {
  return showAll.value ? allBlogs : allBlogs.slice(0, 3);
});

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
  margin-bottom: 40px;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.show-more-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 60px;

  .show-more-btn {
    min-width: 200px;
    border-color: #d49f4d;
    color: #d49f4d;
    font-weight: 600;
    text-transform: none;
    font-size: 16px;

    &:hover {
      background-color: #d49f4d;
      color: #fff;
    }

    @media (max-width: 600px) {
      min-width: 160px;
      font-size: 14px;
    }
  }
}
</style>
