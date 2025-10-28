<template>
  <section class="sectionProducts">
    <VContainer max-width="1240" class="container">
      <div class="gridProduct">
        <NuxtLink
          v-for="category in categoryData"
          :key="category.value"
          :to="`/products/${category.value}`"
          class="boxProduct"
        >
          <div class="imageProduct">
            <img
              :src="category.image"
              :alt="category.label"
            />
            <div class="textProduct">
              <h3>{{ category.label }}</h3>
            </div>
          </div>
        </NuxtLink>
      </div>
    </VContainer>
  </section>
</template>

<script setup>
import { categories } from '~/data/products.js'

// Add images to categories
const categoryData = [
  {
    ...categories[0], // accessories
    image: 'https://gg.lnwfile.com/_webp_max_images/1024/1024/op/wr/5c.webp'
  },
  {
    ...categories[1], // greenhouse
    image: 'https://gg.lnwfile.com/_webp_max_images/1024/1024/37/ms/g3.webp'
  },
  {
    ...categories[2], // indoor
    image: 'https://gg.lnwfile.com/_webp_max_images/1024/1024/0h/dt/9g.webp'
  },
  {
    ...categories[3], // outdoor
    image: 'https://gg.lnwfile.com/_webp_max_images/1024/1024/ge/15/tv.webp'
  },
  {
    ...categories[4], // indoortrim
    image: 'https://gg.lnwfile.com/_webp_max_images/1024/1024/ge/15/tv.webp'
  }
]
</script>

<style scoped lang="scss">
.container {
  padding-top: 80px;
  padding-bottom: 80px;
}
.gridProduct {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 30px;
  @media (max-width: 1200px) {
    gap: 20px;
  }
  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }
  .boxProduct {
    position: relative;
    display: block;
    border-radius: 8px;
    overflow: hidden;
    &:hover {
      .imageProduct {
        background-color: inherit;
        img {
          transform: scale(1.05);
          opacity: 1;
        }
      }
    }
    .imageProduct {
      background-color: #000000;
      transition: all 0.3s ease;
      line-height: 0;
      img {
        width: 100%;
        height: auto;
        object-fit: cover;
        transition: transform 1s ease, opacity 0.3s ease,
          -webkit-transform 1s ease;
        opacity: 0.8;
      }
    }
    .textProduct {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      h3 {
        font-size: 20px;
        color: #fff;
        @media (max-width: 767px) {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
