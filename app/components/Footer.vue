<template>
  <footer class="site-footer">
    <VContainer max-width="1240" class="footer-content py-0">
      <div class="footer-grid">
        <!-- Left Column - Logo & Description -->
        <div class="footer-brand">
          <div class="brand-section">
            <div class="logo">
              <img
                src="https://greenbank.shop/src/assets/green-bank-logo.png?t=1758775487049"
                alt="Logo"
              />
              <div>
                <span class="logo-text">GREEN BANK SHOP</span>
                <p class="brand-description">Greenbank Shop - ธนาคารสีเขียว</p>
              </div>
            </div>
          </div>
        </div>
        <div class="right-footer">
          <!-- Menu Column -->
          <div class="footer-links">
            <h4 class="footer-heading">Menu</h4>
            <ul class="link-list">
              <li>
                <NuxtLink to="/products/accessories">Accessories</NuxtLink>
              </li>
              <li><NuxtLink to="/products/greenhouse">Greenhouse</NuxtLink></li>
              <li><NuxtLink to="/products/indoor">Indoor</NuxtLink></li>
              <li><NuxtLink to="/products/outdoor">Ourdoot</NuxtLink></li>
              <li><NuxtLink to="/products/indoortrim">Indoortrim</NuxtLink></li>
              <li><NuxtLink to="/about">About Us</NuxtLink></li>
              <li><NuxtLink to="/contact">Contact Us</NuxtLink></li>
            </ul>
          </div>

          <!-- Account Column -->
          <div class="footer-links">
            <h4 class="footer-heading">บัญชีของฉัน</h4>
            <ul class="link-list">
              <li><NuxtLink to="/payment">แจ้งชำระเงิน</NuxtLink></li>
              <li><NuxtLink to="/register">สมัครสมาชิก</NuxtLink></li>
              <li><NuxtLink to="/login">เข้าสู้ระบบ</NuxtLink></li>
              <li><NuxtLink to="/how-to-order">วิธีการสั่งซื้อ</NuxtLink></li>
            </ul>
          </div>

          <!-- Contact Column -->
          <div class="footer-links">
            <h4 class="footer-heading">ติดต่อเรา</h4>
            <ul class="contact-list">
              <li class="contact-item">
                <span class="label">ร้านดอ</span>
              </li>
              <li class="contact-item">
                <a href="mailto:greenbankshop@gmail.com" class="value"
                  >greenbankshop@gmail.com</a
                >
              </li>
              <li class="contact-item">
                <span class="label">เบอร์ติดต่อ</span>
              </li>
              <li class="contact-item">
                <a href="tel:0960656695" class="value">096-065-6695</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Copyright -->
      <div class="footer-bottom">
        <p class="copyright">© 2024 Green Bank Shop. All rights reserved.</p>
      </div>
    </VContainer>

    <!-- Floating Action Menu -->
    <div class="floating-menu">
      <!-- Menu Items -->
      <transition-group name="fab-items">
        <div v-if="menuOpen" class="fab-items-container">
          <!-- Language -->
          <div class="fab-item">
            <div class="fab-label">เปลี่ยนภาษา (EN)</div>
            <VBtn icon color="#2d5016" elevation="4" class="fab-btn">
              <VIcon icon="mdi-web" size="20" color="white" />
            </VBtn>
          </div>

          <!-- Fanpage -->
          <div class="fab-item">
            <div class="fab-label">Fanpage</div>
            <VBtn
              icon
              color="#4267B2"
              elevation="4"
              class="fab-btn"
              href="https://facebook.com"
              target="_blank"
            >
              <VIcon icon="mdi-facebook-messenger" size="20" color="white" />
            </VBtn>
          </div>

          <!-- Line -->
          <div class="fab-item">
            <div class="fab-label">@greenbank</div>
            <VBtn
              icon
              color="#06C755"
              elevation="4"
              class="fab-btn"
              href="https://line.me/R/ti/p/@greenbank"
              target="_blank"
            >
              <VIcon icon="mdi-chat" size="20" color="white" />
            </VBtn>
          </div>

          <!-- Phone -->
          <div class="fab-item">
            <div class="fab-label">096-065-6695</div>
            <VBtn
              icon
              color="#4285F4"
              elevation="4"
              class="fab-btn"
              href="tel:0960656695"
            >
              <VIcon icon="mdi-phone" size="20" color="white" />
            </VBtn>
          </div>

          <!-- Track Order -->
          <div class="fab-item">
            <div class="fab-label">ติดตามสถานะออเดอร์</div>
            <VBtn icon color="#4285F4" elevation="4" class="fab-btn">
              <VIcon icon="mdi-magnify" size="20" color="white" />
            </VBtn>
          </div>

          <!-- Cart -->
          <div class="fab-item">
            <div class="fab-label">ตะกร้าสินค้า ({{ cartCount }})</div>
            <VBtn
              icon
              color="#c9302c"
              elevation="4"
              class="fab-btn"
              @click="goToCart"
            >
              <VIcon icon="mdi-cart" size="20" color="white" />
              <VBadge
                v-if="cartCount > 0"
                :content="cartCount"
                color="white"
                text-color="red"
                class="cart-badge"
              />
            </VBtn>
          </div>
        </div>
      </transition-group>

      <!-- Main Toggle Button -->
      <VBtn
        icon
        :color="menuOpen ? '#2d5016' : '#d49f4d'"
        class="fab-main"
        elevation="8"
        @click="toggleMenu"
      >
        <VIcon
          :icon="menuOpen ? 'mdi-close' : 'mdi-menu'"
          size="24"
          color="white"
        />
      </VBtn>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const { cartCount } = useCart();

const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const goToCart = () => {
  menuOpen.value = false;
  router.push("/cart");
};
</script>

<style lang="scss" scoped>
.site-footer {
  background-color: #f8f8f8;
  padding-top: 60px;
  position: relative;

  @media (max-width: 960px) {
    padding-top: 40px;
  }
}

.footer-content {
  padding-bottom: 40px;
}
.footer-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: 767px) {
    row-gap: 30px;
  }
  .footer-brand {
    width: 45%;
    @media (max-width: 1024px) {
      width: 100%;
    }
    .brand-section {
      .logo {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;

        img {
          height: 60px;
        }

        .logo-text {
          font-size: 24px;
          font-weight: 700;
          color: #000;
        }
      }

      .brand-title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 12px;
        color: #000;
      }

      .brand-description {
        font-size: 13px;
        line-height: 1.6;
        color: #666;
      }

      .member-btn {
        text-transform: none;
        font-size: 14px;
        font-weight: 500;
        border-radius: 24px;
        padding: 0 20px;

        :deep(.v-btn__content) {
          color: #fff;
        }
      }
    }
  }
  .right-footer {
    width: 50%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    @media (max-width: 1024px) {
      width: 100%;
      row-gap: 20px;
    }
  }
}

.footer-links {
  flex: 1;
  @media (max-width: 767px) {
    flex: auto;
    width: 50%;
  }
  .footer-heading {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 20px;
    color: #000;
  }

  .link-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 12px;

      a {
        font-size: 14px;
        color: #666;
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
          color: #d49f4d;
        }
      }
    }
  }

  .contact-list {
    list-style: none;
    padding: 0;
    margin: 0;

    .contact-item {
      margin-bottom: 8px;
      font-size: 14px;

      .label {
        color: #666;
      }

      .value {
        color: #000;
        font-weight: 500;
      }
    }
  }
}

.footer-bottom {
  padding: 30px 0;
  .copyright {
    text-align: center;
    font-size: 13px;
    color: #666;
    margin: 0;
  }
}

.floating-menu {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;

  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
  }

  .fab-items-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
    margin-bottom: 12px;
  }

  .fab-item {
    display: flex;
    align-items: center;
    gap: 12px;
    animation: slideIn 0.3s ease-out;

    .fab-label {
      background: white;
      padding: 8px 16px;
      border-radius: 24px;
      font-size: 14px;
      font-weight: 500;
      white-space: nowrap;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      color: #333;
    }

    .fab-btn {
      width: 55px !important;
      height: 55px !important;
      min-width: 55px !important;
      min-height: 55px !important;
    }

    :deep(.v-btn) {
      position: relative;
    }

    .cart-badge {
      position: absolute;
      top: -8px;
      right: -8px;
    }
  }

  .fab-main {
    width: 55px !important;
    height: 55px !important;
    min-width: 55px !important;
    min-height: 55px !important;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.fab-items-enter-active,
.fab-items-leave-active {
  transition: all 0.3s ease;
}

.fab-items-enter-from,
.fab-items-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
