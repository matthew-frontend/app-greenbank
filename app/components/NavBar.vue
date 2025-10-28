<template>
  <!-- Placeholder div เพื่อเก็บพื้นที่เมื่อ header เป็น fixed -->
  <div v-if="!isHomePage && isScrolled" class="header-placeholder"></div>

  <VAppBar
    class="header"
    :class="{
      'header--scrolled': isScrolled,
      'header--fixed': isHomePage,
      'header--sticky': !isHomePage
    }"
  >
    <VContainer max-width="1240" class="py-0 h-100">
      <div class="appBarFlex">
        <!-- ปุ่มเมนูมือถือ -->
        <VAppBarNavIcon class="d-md-none" @click="drawer = !drawer" />
        <!-- โลโก้ / ชื่อแบรนด์ -->
        <NuxtLink
          to="/"
          class="linkLogo d-flex align-center text-decoration-none text-white"
        >
          <img
            src="https://gg.lnwfile.com/_webp_max_images/300/300/o5/1y/3h.webp"
            alt=""
            class="mr-2"
          />
          <!-- <span class="text-h6 font-weight-bold">Cozy</span> -->
        </NuxtLink>

        <!-- เมนูหลัก -->
        <div class="d-none d-md-flex align-center">
          <NuxtLink
            v-for="item in links"
            :key="item.to"
            :to="item.to"
            class="nav-link mx-3"
          >
            {{ item.label }}
          </NuxtLink>
        </div>

        <div class="actionUser">
          <div class="actionIcon">
            <VIcon icon="mdi-magnify" size="20" color="#000" />
          </div>
          <div class="actionIcon cart-icon" @click="toggleCart">
            <VIcon icon="mdi-cart-outline" size="20" color="#000" />
            <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
          </div>
          <div class="linkLogin">
            <NuxtLink to="/login" class="">เข้าสู่ระบบ</NuxtLink>
          </div>
        </div>
      </div>
    </VContainer>
  </VAppBar>

  <!-- Drawer Menu -->
  <VNavigationDrawer v-model="drawer" temporary location="right">
    <VList>
      <VListItem
        v-for="item in links"
        :key="item.to"
        :to="item.to"
        @click="drawer = false"
      >
        <VListItemTitle>{{ item.label }}</VListItemTitle>
      </VListItem>
    </VList>
  </VNavigationDrawer>

  <!-- Drawer Cart -->
  <ActionNavbarActionCart v-model:is-open="isCartOpen" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  isHomePage: {
    type: Boolean,
    default: false
  }
});

const drawer = ref(false);
const isScrolled = ref(false);

// Use cart composable
const { isCartOpen, cartCount, toggleCart } = useCart();

const links = [
  { label: "Accessories", to: "/accessories" },
  { label: "Greenhouse", to: "/greenhouse" },
  { label: "Indoor", to: "/indoor" },
  { label: "Outdoor", to: "/outdoor" },
  { label: "Indoortrim", to: "/indoortrim" },
  { label: "About Us", to: "/about-us" },
  { label: "Contact Us", to: "/contact" },
];

// Throttle function สำหรับ scroll event
let ticking = false;
const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      isScrolled.value = window.scrollY > 100;
      ticking = false;
    });
    ticking = true;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll(); // เช็คสถานะเริ่มต้น
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped lang="scss">
// Placeholder เพื่อเก็บพื้นที่ของ header เมื่อเป็น fixed
.header-placeholder {
  height: 80px;
  width: 100%;
}

.header {
  background-color: transparent;
  box-shadow: none !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: background-color, box-shadow, transform;

  // Fixed mode: สำหรับหน้า home (fixed ตลอด)
  &--fixed {
    position: fixed !important;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }

  // Sticky mode: สำหรับหน้าอื่นๆ (sticky เมื่อ scroll)
  &--sticky {
    position: relative !important;

    &.header--scrolled {
      position: fixed !important;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      animation: slideDown 0.3s ease-out;
    }
  }

  &--scrolled {
    background-color: #fff !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
  }

  :deep(.v-toolbar__content) {
    height: 80px !important;
  }

  .linkLogo {
    height: 24px;
    img {
      max-width: 100%;
      max-height: 100%;
      height: auto;
    }
  }

  .appBarFlex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    height: 100%;
    .actionUser {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .actionIcon {
        width: 40px;
        cursor: pointer;

        &.cart-icon {
          position: relative;

          .cart-badge {
            position: absolute;
            top: -4px;
            right: -4px;
            background-color: #d49f4d;
            color: #fff;
            font-size: 10px;
            font-weight: 600;
            min-width: 18px;
            height: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            padding: 0 4px;
          }
        }
      }
      .linkLogin {
        width: 100px;
        a {
          color: #000;
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.2s;
        }
      }
    }
  }
}
.nav-link {
  font-size: 14px;
  font-weight: 500;
  color: #000;
  text-decoration: none;
  transition: opacity 0.2s;
}
.nav-link:hover {
  opacity: 0.7;
}

// Animation สำหรับ header slide down
@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
