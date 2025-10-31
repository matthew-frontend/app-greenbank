<template>
  <VContainer max-width="1240" class="contact-page">
    <BreadCrumbs :items="breadcrumbs" />

    <v-row class="contact-content">
      <!-- Left Column - Contact Info -->
      <div class="contact-left">
        <h1 class="contact-title">ติดต่อ Demo Cozy Template</h1>
        <p class="contact-subtitle">
          รับฟังทั้งผังทั้งดื่มที่บริษัท Cozy Template
        </p>

        <div class="contact-methods">
          <h3 class="section-heading">ช่องทางการติดต่อ</h3>

          <div class="contact-item">
            <div class="contact-icon email-icon">
              <VIcon icon="mdi-email" color="white" size="24" />
            </div>
            <div class="contact-details">
              <span class="contact-value">consultant@LnwX.com</span>
            </div>
          </div>

          <div class="contact-item">
            <div class="contact-icon phone-icon">
              <VIcon icon="mdi-phone" color="white" size="24" />
            </div>
            <div class="contact-details">
              <span class="contact-value">020266418</span>
            </div>
          </div>
        </div>

        <div class="social-media">
          <h3 class="section-heading">Social Media</h3>
          <div class="social-icons">
            <VBtn
              icon
              variant="outlined"
              size="large"
              class="facebook"
              href="https://www.facebook.com/greenbank2022/"
              target="_blank"
            >
              <VIcon icon="mdi-facebook" color="#fff" />
            </VBtn>
            <VBtn
              icon
              variant="outlined"
              size="large"
              class="twitter"
              href="https://twitter.com"
              target="_blank"
            >
              <VIcon icon="mdi-twitter" color="#fff" />
            </VBtn>
            <VBtn
              icon
              class="line"
              variant="outlined"
              size="large"
              href="https://line.me/R/ti/p/@159uivvh?oat_content=url&ts=07311540"
              target="_blank"
            >
              <VIcon icon="mdi-chat" color="#fff" />
            </VBtn>
          </div>
        </div>
      </div>

      <!-- Right Column - Contact Form -->
      <div class="contact-right">
        <div class="form-card">
          <h2 class="form-title">กรอกข้อมูลเพื่อให้เราติดต่อกลับ</h2>

          <VForm ref="formRef" @submit.prevent="handleSubmit">
            <v-row>
              <v-col cols="12" md="6">
                <label class="field-label">
                  เบอร์มือถือ 10 หลัก <span class="required">*</span>
                </label>
                <VTextField
                  v-model="form.phone"
                  placeholder="0812345601"
                  variant="outlined"
                  density="comfortable"
                  :rules="[rules.required, rules.phone]"
                  hide-details="auto"
                >
                  <template v-slot:prepend-inner>
                    <VIcon icon="mdi-cellphone" size="20" />
                  </template>
                </VTextField>
              </v-col>

              <v-col cols="12" md="6">
                <label class="field-label">
                  อีเมล <span class="required">*</span>
                </label>
                <VTextField
                  v-model="form.email"
                  placeholder="example@gmail.com"
                  variant="outlined"
                  density="comfortable"
                  :rules="[rules.required, rules.email]"
                  hide-details="auto"
                >
                  <template v-slot:prepend-inner>
                    <VIcon icon="mdi-email-outline" size="20" />
                  </template>
                </VTextField>
              </v-col>

              <v-col cols="12">
                <label class="field-label">
                  ชื่อผู้ติดต่อ <span class="required">*</span>
                </label>
                <VTextField
                  v-model="form.name"
                  placeholder="ชื่อ"
                  variant="outlined"
                  density="comfortable"
                  :rules="[rules.required]"
                  hide-details="auto"
                />
              </v-col>

              <v-col cols="12">
                <label class="field-label">
                  เรื่องที่จะติดต่อ <span class="required">*</span>
                </label>
                <VTextField
                  v-model="form.subject"
                  placeholder="เรื่อง"
                  variant="outlined"
                  density="comfortable"
                  :rules="[rules.required]"
                  hide-details="auto"
                />
              </v-col>

              <v-col cols="12">
                <label class="field-label">
                  ข้อความ <span class="required">*</span>
                </label>
                <VTextarea
                  v-model="form.message"
                  placeholder="ข้อความ"
                  variant="outlined"
                  rows="5"
                  :rules="[rules.required]"
                  hide-details="auto"
                />
              </v-col>

              <v-col cols="12">
                <VBtn
                  type="submit"
                  color="black"
                  size="large"
                  class="submit-btn"
                  :loading="loading"
                >
                  ส่งข้อความ
                </VBtn>
              </v-col>
            </v-row>
          </VForm>
        </div>
      </div>
    </v-row>
  </VContainer>
</template>

<script setup>
import { ref } from "vue";

const breadcrumbs = [
  { title: "หน้าแรก", disabled: false, href: "/" },
  { title: "ติดต่อเรา", disabled: true },
];

const formRef = ref(null);
const loading = ref(false);

const form = ref({
  phone: "",
  email: "",
  name: "",
  subject: "",
  message: "",
});

const rules = {
  required: (value) => !!value || "กรุณากรอกข้อมูล",
  phone: (value) => {
    const pattern = /^0[0-9]{9}$/;
    return pattern.test(value) || "กรุณากรอกเบอร์โทรศัพท์ 10 หลัก";
  },
  email: (value) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value) || "กรุณากรอกอีเมลให้ถูกต้อง";
  },
};

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate();
  if (!valid) return;

  loading.value = true;

  // Simulate API call
  setTimeout(() => {
    alert("ส่งข้อความเรียบร้อยแล้ว");
    formRef.value.reset();
    loading.value = false;
  }, 1000);
};

useHead({
  title: "ติดต่อเรา - Demo Cozy Template",
  meta: [
    {
      name: "description",
      content: "ติดต่อเราเพื่อสอบถามข้อมูลเพิ่มเติมหรือสั่งซื้อสินค้า",
    },
  ],
});
</script>

<style lang="scss" scoped>
.contact-page {
  padding: 40px 20px 80px;
}

.contact-content {
  display: flex;
  justify-content: space-between;
}

// Left Column - Contact Info
.contact-left {
  flex-basis: 45%;

  .contact-title {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 16px;
    color: #000;

    @media (max-width: 768px) {
      font-size: 24px;
    }
  }

  .contact-subtitle {
    font-size: 16px;
    color: #666;
    margin-bottom: 40px;
    line-height: 1.6;
  }

  .section-heading {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #000;
  }

  .contact-methods {
    margin-bottom: 40px;

    .contact-item {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;

      .contact-icon {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        &.email-icon {
          background-color: #ff8c42;
        }

        &.phone-icon {
          background-color: #4a90e2;
        }
      }

      .contact-details {
        .contact-value {
          font-size: 16px;
          font-weight: 500;
          color: #000;
        }
      }
    }
  }

  .social-media {
    .social-icons {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      .facebook {
        background-color: #1877f2;
        border: 0;
        width: 45px;
        height: 45px;
      }
      .twitter {
        background-color: #1ea1f2;
        border: 0;
        width: 45px;
        height: 45px;
      }
      .line {
        background-color: #22c95b;
        border: 0;
        width: 45px;
        height: 45px;
      }
    }
  }
}

// Right Column - Contact Form
.contact-right {
  flex-basis: 45%;
  .form-card {
    .form-title {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 30px;
      color: #000;
      text-align: left;

      @media (max-width: 768px) {
        font-size: 20px;
      }
    }

    .field-label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 8px;
      color: #000;

      .required {
        color: #ef4444;
      }
    }

    :deep(.v-field) {
      background: #fff;
    }

    :deep(.v-col) {
      padding-top: 8px;
      padding-bottom: 8px;
    }

    .submit-btn {
      width: 100%;
      max-width: 200px;
      text-transform: none;
      font-size: 16px;
      font-weight: 500;
      height: 48px;
      border-radius: 24px;
      margin-top: 20px;

      :deep(.v-btn__content) {
        color: #fff;
      }
    }
  }
}
</style>
