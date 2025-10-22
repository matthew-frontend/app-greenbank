<template>
  <v-container class="py-10">
    <h1 class="text-h4 mb-6 text-center">{{ categoryTitle }}</h1>

    <v-row>
      <v-col
        v-for="item in products"
        :key="item.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <!-- ใช้ v-card เป็นลิงก์ -->
        <v-card
          class="hover:shadow-lg transition"
          :to="`/products/${category}/${item.slug}`"
          hover
        >
          <v-img :src="item.image" height="200px" cover />
          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-subtitle>${{ item.price.toFixed(2) }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const category = route.params.category
const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1)

// mock ข้อมูลสินค้า
const products = ref([
  {
    id: 1,
    slug: 'shoe-01-ddddd',
    name: 'Product A',
    price: 19.99,
    image: '/images/sample1.jpg',
  },
  {
    id: 2,
    slug: 'shoe-02-eeee',
    name: 'Product B',
    price: 25.5,
    image: '/images/sample2.jpg',
  },
  {
    id: 3,
    slug: 'shoe-03-ffff',
    name: 'Product C',
    price: 9.9,
    image: '/images/sample3.jpg',
  },
])
</script>

<!-- scoped ใช้สำหรับหน้านี้หน้าเดียว  -->
<style scoped>
.v-card {
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
.v-card:hover {
  transform: translateY(-4px);
}
</style>
