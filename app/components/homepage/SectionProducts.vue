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
            <img :src="category.image" :alt="category.label" />
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
import { categories } from "~/data/products.js";

// Add images to categories
const categoryData = [
  {
    ...categories[0], // accessories
    image:
      "https://img.freepik.com/premium-photo/vertical-shot-bong-pipe-filled-with-weed-set-accessories-smoking-cannabis-marijuana_274234-16411.jpg",
  },
  {
    ...categories[1], // greenhouse
    image:
      "https://www.vostermans.com/hubfs/Images/Product%20applications/V-FloFan/Greenhous/Portrait/Multifan%20V-FloFan%20Medicinal%20Cannabis%20P.jpg",
  },
  {
    ...categories[2], // indoor
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBvvRM39cb-NZ-2HsMN2om1IAyBAOkqG-MqQ&s",
  },
  {
    ...categories[3], // outdoor
    image:
      "https://thehempmine.com/cdn/shop/articles/Picture4_1200x.jpg?v=1628110962",
  },
  {
    ...categories[4], // indoortrim
    image:
      "https://mobiustrimmer.com/wp-content/uploads/2022/04/mobius-conveyor-blog-img-scaled.jpeg",
  },
];
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
      height: 100%;
      img {
        width: 100%;
        height: 100%;
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
