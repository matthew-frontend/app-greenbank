<template>
  <section class="section-slider">
    <swiper
      class="mySwiper"
      :navigation="true"
      :loop="true"
      :freeMode="true"
      :watchSlidesProgress="true"
      :slidesPerView="1"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      :modules="modules"
      :breakpoints="{
        320: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 5,
        },
      }"
    >
      <swiper-slide>
        <div class="image">
          <img
            src="https://srdsmlhrnkeyhrfpoaqd.supabase.co/storage/v1/object/public/product-images/0.7602531541048867.png"
            alt=""
          />
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="image">
          <img
            src="https://srdsmlhrnkeyhrfpoaqd.supabase.co/storage/v1/object/public/product-images/0.798636217844385.png"
            alt=""
          />
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="image">
          <img
            src="https://srdsmlhrnkeyhrfpoaqd.supabase.co/storage/v1/object/public/product-images/0.4373304906452201.png"
            alt=""
          />
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="image">
          <img
            src="https://srdsmlhrnkeyhrfpoaqd.supabase.co/storage/v1/object/public/product-images/0.27702617146478903.png"
            alt=""
          />
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="image">
          <img
            src="https://srdsmlhrnkeyhrfpoaqd.supabase.co/storage/v1/object/public/product-images/0.4628406952479457.jpg"
            alt=""
          />
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="image">
          <img
            src="https://srdsmlhrnkeyhrfpoaqd.supabase.co/storage/v1/object/public/product-images/0.8274828727219088.png"
            alt=""
          />
        </div>
      </swiper-slide>
    </swiper>
  </section>
</template>

<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper modules
import { Autoplay, FreeMode, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Setup modules
const modules = [Autoplay, FreeMode, Navigation];
</script>

<style lang="scss">
.section-slider {
  position: relative;
  padding-top: 100px;
  @media (max-width: 767px) {
    padding-top: 50px;
  }
  .swiper-horizontal {
    line-height: 0;
  }
  .image {
    overflow: hidden !important;
    &:hover {
      img {
        transform: scale(1.05);
      }
    }
    img {
      max-width: 100%;
      max-height: 100%;
      height: auto;
      transition: filter 0.5s ease, transform 1s, -webkit-filter 0.5s ease,
        -webkit-transform 1s;
    }
  }

  // Swiper navigation button styles
  .swiper-button-prev,
  .swiper-button-next {
    width: 14px;
    height: 14px;
    transition: all 0.3s ease;

    &:after {
      font-size: 20px;
      font-weight: 900;
      color: #000;
      text-shadow: 0 0 1px #000, 0 0 1px #000;
      -webkit-text-stroke: 0.5px #000;
    }

    &:hover {
      background-color: #d49f4d;

      &:after {
        color: #fff;
        text-shadow: 0 0 1px #fff, 0 0 1px #fff;
        -webkit-text-stroke: 0.5px #fff;
      }
    }

    @media (max-width: 768px) {
      width: 36px;
      height: 36px;

      &:after {
        font-size: 16px;
      }
    }
  }

  .swiper-button-prev {
    left: 30px;
  }

  .swiper-button-next {
    right: 30px;
  }

  .swiper-button-disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
}
</style>
