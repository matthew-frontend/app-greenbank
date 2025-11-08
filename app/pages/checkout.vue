<template>
  <div class="checkout-page">
    <VContainer max-width="1240">
      <div class="checkout-layout">
        <v-row>
          <v-col cols="12" md="7">
            <!-- Left Column - Steps -->
            <div class="checkout-steps">
              <!-- Step 2: Shipping -->
              <div class="checkout-step">
                <div class="step-header" @click="toggleStep(1)">
                  <div class="step-number">1</div>
                  <h2 class="step-title">การจัดส่ง</h2>
                  <VIcon
                    :icon="
                      activeStep === 1 ? 'mdi-chevron-up' : 'mdi-chevron-down'
                    "
                    class="toggle-icon"
                  />
                </div>

                <div v-show="activeStep === 1" class="step-content">
                  <div class="">
                    <p class="step-description">
                      สมาชิกเข้าสู่ระบบเพื่อสั่งซื้อ
                    </p>

                    <!-- <div class="login-link">
                      <VIcon icon="mdi-login" size="20" />
                      <NuxtLink to="/login">เข้าสู่ระบบ</NuxtLink>
                    </div> -->

                    <v-row>
                      <v-col cols="12" md="4">
                        <VTextField
                          v-model="contact.email"
                          label="อีเมลล์"
                          variant="outlined"
                          density="comfortable"
                          hide-details
                        />
                      </v-col>
                      <v-col cols="12" md="4">
                        <VTextField
                          v-model="contact.password"
                          label="รหัสผ่าน"
                          variant="outlined"
                          density="comfortable"
                          type="password"
                          hide-details
                        />
                      </v-col>
                      <v-col cols="12" md="4">
                        <div class="step-actions mt-0">
                          <VBtn size="large" class="next-btn" @click="nextStep">
                            เข้าสู่ระบบ
                          </VBtn>
                        </div>
                      </v-col>
                    </v-row>
                  </div>
                  <div class="or"><span>หรือ</span></div>
                  <p class="step-description">ระบุข้อมูลการจัดส่ง</p>
                  <VTextField
                    v-model="shipping.fullName"
                    label="ชื่อ-นามสกุล"
                    variant="outlined"
                    density="comfortable"
                    class="mb-4"
                  />

                  <VTextField
                    v-model="shipping.address"
                    label="ที่อยู่"
                    variant="outlined"
                    density="comfortable"
                    class="mb-4"
                  />

                  <v-row>
                    <v-col cols="12" md="6">
                      <VTextField
                        v-model="shipping.district"
                        label="ตำบล/แขวง"
                        variant="outlined"
                        density="comfortable"
                      />
                    </v-col>
                    <v-col cols="12" md="6">
                      <VTextField
                        v-model="shipping.amphoe"
                        label="อำเภอ/เขต"
                        variant="outlined"
                        density="comfortable"
                      />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" md="6">
                      <VTextField
                        v-model="shipping.province"
                        label="จังหวัด"
                        variant="outlined"
                        density="comfortable"
                      />
                    </v-col>
                    <v-col cols="12" md="6">
                      <VTextField
                        v-model="shipping.zipcode"
                        label="รหัสไปรษณีย์"
                        variant="outlined"
                        density="comfortable"
                      />
                    </v-col>
                  </v-row>

                  <VTextField
                    v-model="shipping.phone"
                    label="เบอร์โทรศัพท์"
                    variant="outlined"
                    density="comfortable"
                    class="mt-4"
                  />

                  <div class="step-actions">
                    <VBtn variant="text" class="back-btn" @click="prevStep">
                      <VIcon icon="mdi-chevron-left" start />
                      กลับ
                    </VBtn>
                    <VBtn size="large" class="next-btn" @click="nextStep">
                      ต่อไป
                    </VBtn>
                  </div>
                </div>
              </div>

              <!-- Step 2: Payment -->
              <div class="checkout-step">
                <div class="step-header" @click="toggleStep(2)">
                  <div class="step-number">2</div>
                  <h2 class="step-title">การชำระเงิน</h2>
                  <VIcon
                    :icon="
                      activeStep === 2 ? 'mdi-chevron-up' : 'mdi-chevron-down'
                    "
                    class="toggle-icon"
                  />
                </div>

                <div v-show="activeStep === 2" class="step-content">
                  <VRadioGroup v-model="payment.method">
                    <VRadio value="transfer" label="โอนเงินผ่านธนาคาร" />
                    <VRadio value="promptpay" label="สแกน QR" />
                    <VRadio value="cod" label="เก็บเงินปลายทาง (COD)" />
                  </VRadioGroup>

                  <div class="step-actions">
                    <VBtn variant="text" class="back-btn" @click="prevStep">
                      <VIcon icon="mdi-chevron-left" start />
                      กลับ
                    </VBtn>
                    <VBtn
                      color="primary"
                      size="large"
                      class="submit-btn"
                      @click="submitOrder"
                    >
                      ยืนยันการสั่งซื้อ
                    </VBtn>
                  </div>
                </div>
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="5">
            <!-- Right Column - Order Summary -->
            <div class="order-summary">
              <div class="summary-header">
                <VBtn
                  variant="text"
                  size="small"
                  @click="$router.push('/cart')"
                >
                  <VIcon icon="mdi-chevron-left" start size="small" />
                  ตะกร้า
                </VBtn>
                <VBtn
                  variant="text"
                  size="small"
                  color="blue"
                  @click="$router.push('/')"
                >
                  เลือกซื้อเพิ่ม
                </VBtn>
              </div>

              <div class="summary-items">
                <div
                  v-for="item in cartItems"
                  :key="item.product.id"
                  class="summary-item"
                >
                  <div class="item-image">
                    <img :src="item.product.image" :alt="item.product.name" />
                  </div>
                  <div class="item-details">
                    <h4 class="item-name">{{ item.product.name }}</h4>
                    <NuxtLink
                      :to="`/products/${item.product.category}/${item.product.slug}`"
                      class="item-link"
                    >
                      หมายเหตุสินค้า
                    </NuxtLink>
                    <div class="item-footer">
                      <VSelect
                        :model-value="item.quantity"
                        :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                        variant="outlined"
                        density="compact"
                        hide-details
                        class="quantity-select"
                        @update:model-value="
                          (val) => updateQuantity(item.product.id, val)
                        "
                      />
                      <span class="item-price"
                        >฿{{
                          (
                            item.product.realPrice * item.quantity
                          ).toLocaleString()
                        }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>

              <div class="discount-section">
                <VTextField
                  v-model="discountCode"
                  placeholder="กรอก โค้ดส่วนลด (ถ้ามี)"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                >
                  <template v-slot:append-inner>
                    <VIcon icon="mdi-arrow-right" />
                  </template>
                </VTextField>
              </div>

              <div class="summary-totals">
                <div class="total-row">
                  <span>รวมราคาสินค้า</span>
                  <span>฿{{ cartTotal.toLocaleString() }}</span>
                </div>
                <div class="total-row">
                  <span>ค่าส่งสินค้า</span>
                  <span>฿{{ shippingFee.toLocaleString() }}</span>
                </div>
                <div class="total-row grand-total">
                  <span>ราคาสุทธิ</span>
                  <span>฿{{ grandTotal.toLocaleString() }}</span>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </VContainer>

    <!-- QR Code Modal -->
    <VDialog v-model="showQrModal" max-width="500">
      <VCard>
        <VCardTitle class="d-flex justify-space-between align-center">
          <span>สแกน QR Code เพื่อชำระเงิน</span>
          <VBtn icon="mdi-close" variant="text" @click="showQrModal = false" />
        </VCardTitle>
        <VCardText class="text-center py-8">
          <div class="qr-code-container">
            <img
              src="https://hexdocs.pm/qr_code/2.2.1/docs/qrcode.svg"
              alt="QR Code"
              class="qr-code-image"
            />
          </div>
          <div class="mt-4">
            <p class="text-h6 font-weight-bold">
              ยอดชำระ: ฿{{ grandTotal.toLocaleString() }}
            </p>
            <p class="text-body-2 text-grey mt-2">
              กรุณาสแกน QR Code เพื่อชำระเงินผ่าน PromptPay
            </p>
          </div>
        </VCardText>
        <VCardActions class="justify-center pb-4">
          <VBtn
            color="primary"
            size="large"
            variant="flat"
            class="btn-payment"
            @click="confirmPayment"
          >
            ยืนยันการชำระเงิน
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- Bank Transfer Modal -->
    <VDialog v-model="showBankModal" max-width="500">
      <VCard>
        <VCardTitle class="d-flex justify-space-between align-center">
          <span>ข้อมูลบัญชีสำหรับโอนเงิน</span>
          <VBtn
            icon="mdi-close"
            variant="text"
            @click="showBankModal = false"
          />
        </VCardTitle>
        <VCardText class="py-6">
          <div class="bank-info">
            <div class="bank-item">
              <div class="bank-logo">
                <VIcon icon="mdi-bank" size="40" color="success" />
              </div>
              <div class="bank-details">
                <p class="text-h6 font-weight-bold mb-2">ธนาคารกสิกรไทย</p>
                <div class="info-row">
                  <span class="label">ชื่อบัญชี:</span>
                  <span class="value">บริษัท กรีนแบงก์ จำกัด</span>
                </div>
                <div class="info-row">
                  <span class="label">เลขที่บัญชี:</span>
                  <span class="value font-weight-bold">123-4-56789-0</span>
                </div>
                <div class="info-row">
                  <span class="label">ยอดชำระ:</span>
                  <span class="value text-success font-weight-bold">
                    ฿{{ grandTotal.toLocaleString() }}
                  </span>
                </div>
              </div>
            </div>
            <VAlert type="info" variant="tonal" class="mt-4">
              <p class="text-body-2">
                กรุณาโอนเงินตามยอดที่ระบุ และแนบหslip การโอนเงินส่งมาที่
                <strong>Line: @greenbank</strong> หรือ
                <strong>Email: payment@greenbank.com</strong>
              </p>
            </VAlert>
          </div>
        </VCardText>
        <VCardActions class="justify-center pb-4">
          <VBtn
            color="primary"
            size="large"
            variant="flat"
            class="btn-payment"
            @click="confirmPayment"
          >
            ยืนยันการสั่งซื้อ
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const { cartItems, cartTotal, updateQuantity } = useCart();

const activeStep = ref(1);
const discountCode = ref("");
const shippingFee = ref(50);
const showQrModal = ref(false);
const showBankModal = ref(false);

const contact = ref({
  phone: "",
  email: "",
  subscribe: false,
});

const shipping = ref({
  fullName: "",
  address: "",
  district: "",
  amphoe: "",
  province: "",
  zipcode: "",
  phone: "",
});

const payment = ref({
  method: "transfer",
});

const grandTotal = computed(() => {
  return cartTotal.value + shippingFee.value;
});

const toggleStep = (step) => {
  activeStep.value = activeStep.value === step ? 1 : step;
};

const nextStep = () => {
  if (activeStep.value < 2) {
    activeStep.value++;
  }
};

const prevStep = () => {
  if (activeStep.value > 1) {
    activeStep.value--;
  }
};

const submitOrder = () => {
  console.log("Order submitted", { contact, shipping, payment });

  // เช็ควิธีการชำระเงิน
  if (payment.value.method === "promptpay") {
    // แสดง QR Code Modal
    showQrModal.value = true;
  } else if (payment.value.method === "transfer") {
    // แสดง Bank Transfer Modal
    showBankModal.value = true;
  } else if (payment.value.method === "cod") {
    // COD ยืนยันเลย
    confirmPayment();
  }
};

const confirmPayment = () => {
  // ปิด modal ทั้งหมด
  showQrModal.value = false;
  showBankModal.value = false;

  // แสดงข้อความยืนยัน
  alert("ยืนยันการสั่งซื้อเรียบร้อย");

  // TODO: Navigate to order confirmation page
  // navigateTo('/order-confirmation')
};

useHead({
  title: "ชำระเงิน - Checkout",
});
</script>

<style lang="scss" scoped>
.btn-payment {
  padding: 0 15px;
  :deep(.v-btn__content) {
    color: #fff;
  }
}
// Modal Styles
.qr-code-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  .qr-code-image {
    max-width: 300px;
    width: 100%;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

.bank-info {
  .bank-item {
    display: flex;
    gap: 16px;
    padding: 20px;
    background-color: #f8f8f8;
    border-radius: 12px;
    margin-bottom: 16px;

    .bank-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      background-color: #fff;
      border-radius: 12px;
      flex-shrink: 0;
    }

    .bank-details {
      flex: 1;

      .info-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid #e0e0e0;

        &:last-child {
          border-bottom: none;
        }

        .label {
          font-size: 14px;
          color: #666;
        }

        .value {
          font-size: 14px;
          color: #000;
        }
      }
    }
  }
}

.or {
  text-align: center;
  position: relative;
  margin: 40px 0;
  span {
    width: 60px;
    position: relative;
    z-index: 1;
    display: block;
    margin: 0 auto;
    background-color: #fff;
    font-weight: 600;
    font-size: 18px;
  }
  &::after {
    content: "";
    height: 1px;
    width: 100%;
    background-color: #e0e0e0;
    position: absolute;
    top: 50%;
    left: 0;
  }
}
.checkout-page {
  background-color: #fff;
  min-height: 100vh;
  padding: 40px 0;
}

.checkout-steps {
  .brand-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 40px;

    .brand-logo {
      width: 40px;
      height: 40px;
    }

    .brand-name {
      font-size: 18px;
      font-weight: 600;
    }
  }
}

.checkout-step {
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;

  .step-header {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px;
    cursor: pointer;
    background-color: #fff;
    transition: background-color 0.3s;

    &:hover {
      background-color: #f8f8f8;
    }

    .step-number {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #000;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      flex-shrink: 0;
    }

    .step-title {
      font-size: 18px;
      font-weight: 600;
      flex: 1;
      margin: 0;
    }

    .toggle-icon {
      color: #666;
    }
  }

  .step-content {
    padding: 20px;
    border-top: 1px solid #e0e0e0;

    .step-description {
      font-size: 14px;
      color: #666;
      margin-bottom: 16px;
    }

    .login-link {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 20px;
      color: #0066ff;
      font-size: 14px;

      a {
        color: #0066ff;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .checkbox-label {
      display: flex;
      align-items: center;
    }

    .step-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 24px;
      gap: 16px;

      .back-btn {
        text-transform: none;
        color: #0066ff;
        font-size: 14px;
      }

      .next-btn,
      .submit-btn {
        max-width: 220px;
        width: 100%;
        background-color: $green;
        text-transform: none;
        font-size: 16px;
        font-weight: 500;
        height: 48px !important;
        box-shadow: none;
        :deep(span.v-btn__content) {
          color: #fff;
        }
      }
    }
  }
}

.order-summary {
  background-color: #f8f8f8;
  border-radius: 12px;
  padding: 20px;
  position: sticky;
  top: 100px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;

  @media (max-width: 1024px) {
    position: relative;
    top: 0;
    max-height: none;
  }

  .summary-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e0e0e0;

    button {
      text-transform: none;
      font-size: 14px;
    }
  }

  .summary-items {
    margin-bottom: 20px;

    .summary-item {
      display: flex;
      gap: 12px;
      padding: 16px 0;
      border-bottom: 1px solid #e0e0e0;

      &:last-child {
        border-bottom: none;
      }

      .item-image {
        width: 80px;
        height: 80px;
        flex-shrink: 0;
        border-radius: 12px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .item-details {
        flex: 1;

        .item-name {
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 4px;
          color: #000;
        }

        .item-link {
          font-size: 12px;
          color: #0066ff;
          text-decoration: none;
          display: block;
          margin-bottom: 8px;

          &:hover {
            text-decoration: underline;
          }
        }

        .item-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .quantity-select {
            max-width: 100px;

            :deep(.v-input__control) {
              min-height: 40px;
            }

            :deep(.v-field) {
              border-radius: 12px;
            }

            :deep(.v-field__input) {
              padding: 8px 12px;
            }
          }

          .item-price {
            font-size: 16px;
            font-weight: 600;
            color: #000;
          }
        }
      }
    }
  }

  .discount-section {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e0e0e0;

    :deep(.v-field) {
      border-radius: 12px;
      background: #fff;
    }
  }

  .summary-totals {
    margin-bottom: 16px;

    .total-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      font-size: 14px;
      color: #666;

      &.grand-total {
        font-size: 20px;
        font-weight: 700;
        color: #000;
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid #e0e0e0;
      }
    }
  }
}
</style>
