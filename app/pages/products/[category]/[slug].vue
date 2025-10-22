<template>
  <v-container class="py-10">
    <v-breadcrumbs :items="breadcrumbs" class="mb-6" />

    <v-row>
      <!-- รูปสินค้า -->
      <v-col cols="12" md="6">
        <v-img
          :src="product.image"
          height="400"
          class="rounded-lg"
          cover
        />
      </v-col>

      <!-- รายละเอียด -->
      <v-col cols="12" md="6">
        <h1 class="text-h5 font-weight-bold mb-2">{{ product.name }}</h1>
        <div class="text-h6 mb-4 text-primary">
          ${{ product.price.toFixed(2) }}
        </div>

        <p class="mb-6">{{ product.description }}</p>

        <v-btn color="primary" size="large" @click="addToCart(product)">
          <v-icon start>mdi-cart</v-icon> Add to Cart
        </v-btn>

        <v-divider class="my-6"></v-divider>

        <h3 class="text-h6 mb-2">Specifications</h3>
        <ul class="pl-4">
          <li v-for="(spec, i) in product.specs" :key="i">{{ spec }}</li>
        </ul>
      </v-col>
    </v-row>

    <!-- สินค้าแนะนำ -->
    <v-row class="mt-10">
      <v-col cols="12">
        <h2 class="text-h6 mb-4">Related Products</h2>
      </v-col>

      <v-col
        v-for="(item, i) in related"
        :key="i"
        cols="12" sm="6" md="4" lg="3"
      >
        <v-card :to="`/products/${category}/${item.slug}`" hover>
          <v-img :src="item.image" height="180" />
          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-subtitle>${{ item.price.toFixed(2) }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const route = useRoute()
const category = route.params.category
const slug = route.params.slug

// mock data
const product = ref({
  id: 1,
  slug,
  name: "Shoe 01 DDDDD",
  price: 59.9,
  image: "/images/sample1.jpg",
  description:
    "This running shoe is designed for ultimate comfort, lightweight flexibility, and breathability during every stride.",
  specs: [
    "Material: Mesh + Rubber Sole",
    "Weight: 280g",
    "Color: Black / White",
    "Size: 38–45 EU",
  ],
})

const related = ref([
  {
    id: 2,
    slug: "shoe-02-eeee",
    name: "Shoe 02 EEEEE",
    price: 69.9,
    image: "/images/sample2.jpg",
  },
  {
    id: 3,
    slug: "shoe-03-ffff",
    name: "Shoe 03 FFFFF",
    price: 74.5,
    image: "/images/sample3.jpg",
  },
  {
    id: 4,
    slug: "shoe-04-ggggg",
    name: "Shoe 04 GGGGG",
    price: 82.0,
    image: "/images/sample4.jpg",
  },
])

// breadcrumb
const breadcrumbs = computed(() => [
  { title: "Products", to: "/products" },
  { title: category, to: `/products/${category}` },
  { title: product.value.name, disabled: true },
])

function addToCart(p: any) {
  console.log("Added to cart:", p)
  alert(`Added "${p.name}" to cart!`)
}

useHead({
  title: `${product.value.name} | ${category}`,
  meta: [{ name: "description", content: product.value.description }],
})
</script>

<style scoped>
ul {
  list-style: disc;
}
</style>
