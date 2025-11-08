<template>
  <section class="section-highlight">
    <VContainer fluid>
      <VRow class="align-center">
        <VCol cols="12" xs="12" sm="6">
          <div class="leftHighlight">
            <img
              src="https://scontent.fbkk35-1.fna.fbcdn.net/v/t39.30808-6/516394115_1040425548287562_6586316746366259364_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=sBmBP5zVwnQQ7kNvwHyJLlf&_nc_oc=AdnGtfzZ8Ko0NSFcNiOKPz8Yvg03p-bZAcwGKzf4hNT7n8b58QIfGXKxmX05ofI1uw6OXmRDX1ZcP_1rNYjLytV3&_nc_zt=23&_nc_ht=scontent.fbkk35-1.fna&_nc_gid=Mk0ty_ggi2gGXOCEsFb1lQ&oh=00_AfiXoNnHbF1Rz_zi60S8DueB9XZmB7F2BI_SeetfxGV2ZA&oe=69149862"
              alt=""
            />
          </div>
        </VCol>
        <VCol cols="12" xs="12" sm="6">
          <div class="rightHighlight">
            <h1 class="headline">HIGH QUALITY <span>FURNITURE</span></h1>
            <p>
              เราคัดสรรเฟอร์นิเจอร์ทุกชิ้น ตั้งแต่ขั้นตอนการผลิต
              และการเลือกใช้วัสดุ ทำให้คุณมั่นใจได้ว่า
              สินค้าทุกชิ้นบนเว็บไซต์ของเรานั้น นอกจากจะสวยงามแล้ว ยังแข็งแรง
              และมีคุณภาพ
            </p>
            <NuxtLink to="/" class="btnExplore">Explore</NuxtLink>
          </div>
        </VCol>
      </VRow>
    </VContainer>
  </section>
</template>

<script setup></script>

<style scoped lang="scss">
.section-highlight {
  padding: 60px 20px;
  @media (max-width: 599px) {
    padding: 0;
  }
  .leftHighlight {
    height: 400px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .rightHighlight {
    @media (min-width: 1200px) {
      padding-left: 8%;
      padding-right: 8%;
    }
    @media (max-width: 599px) {
      text-align: center;
    }
    h1.headline {
      margin-bottom: 19px;
      span {
        color: $primary;
      }
      @media (max-width: 1200px) {
        font-size: 24px;
      }
    }
    p {
      font-size: 22px;
      font-weight: 500;
      @media (max-width: 1200px) {
        font-size: 18px;
      }
    }
    .btnExplore {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #000;
      border-radius: 50px;
      color: #fff;
      transition: 0.3s ease;
      height: 50px;
      max-width: 120px;
      font-size: 20px;
      margin-top: 40px;
      font-weight: 500;
      @media (max-width: 1200px) {
        font-size: 16px;
        height: 36px;
        max-width: 96px;
      }
      @media (max-width: 599px) {
        margin: 20px auto 0;
      }
    }
  }
}
</style>
