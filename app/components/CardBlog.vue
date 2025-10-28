<template>
  <div class="boxBlog">
    <NuxtLink :to="`/blog/${blog.slug}`" class="imageBlog">
      <img :src="blog.image" :alt="blog.title" />
    </NuxtLink>
    <div class="detailBlog">
      <NuxtLink :to="`/blog/${blog.slug}`" class="linkBlog">
        {{ blog.title }}
      </NuxtLink>
      <p class="date">
        <VIcon icon="mdi-clock-outline" color="#666" />{{ formattedDate }}
      </p>
      <p class="description">
        {{ blog.description }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { formatDate } from "~/data/blogs.js";

const props = defineProps({
  blog: {
    type: Object,
    required: true,
  },
});

const formattedDate = computed(() => {
  return formatDate(props.blog.date);
});
</script>

<style scoped lang="scss">
.boxBlog {
  .imageBlog {
    display: block;
    position: relative;
    padding-top: 66.66%;
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 15px;
    &:hover {
      img {
        transform: scale(1.05);
      }
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all 0.5s ease;
    }
  }
  .detailBlog {
    .linkBlog {
      display: block;
      font-size: 20px;
      font-weight: 700;
      color: #000;
      margin-bottom: 5px;
      height: 60px;
      &:hover {
        color: $primary;
      }
      @media (max-width: 767px) {
        height: auto;
      }
    }
    .date {
      color: #666;
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      gap: 7px;
    }
    .description {
      margin-top: 12px;
      font-size: 16px;
      color: #333;
      word-break: break-word;
      white-space: pre-line;
    }
  }
}
</style>
