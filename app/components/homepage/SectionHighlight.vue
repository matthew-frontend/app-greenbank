<template>
  <section class="section-highlight">
    <VContainer fluid>
      <VRow class="align-center">
        <VCol cols="12" xs="12" sm="6">
          <div class="leftHighlight">
            <img
              src="https://gg.lnwfile.com/_webp_max_images/1024/1024/gb/wa/ra.webp"
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
