<template>
  <div class="section-about">
    <div class="banner">
      <img
        src="https://gg.lnwfile.com/_webp_max_images/2048/2048/zh/iu/g5.webp"
        alt=""
      />
    </div>
    <div class="welcome">
      <VContainer max-width="1240" class="py-0">
        <h2>ยินดีต้อนรับสู่เว็บไซต์!</h2>
        <p>
          เราให้บริการเฟอร์นิเจอร์ที่ยอดเยี่ยมและมีคุณภาพสูงสำหรับบ้านและสถานที่ทำงานของคุณ
          ด้วยประสบการณ์ในอุตสาหกรรมเฟอร์นิเจอร์มากกว่า 20 ปี
          เรามุ่งมั่นที่จะสร้างผลิตภัณฑ์ที่ทันสมัย สวยงาม
          และออกแบบมาอย่างพิถีพิถัน
        </p>
      </VContainer>
    </div>
    <VContainer max-width="1240" class="py-0">
      <div class="gridImage">
        <div class="leftGrid">
          <img
            src="https://gg.lnwfile.com/_webp_max_images/1024/1024/83/ir/t3.webp"
            alt=""
          />
        </div>
        <div class="rightGrid">
          <div class="detail">
            ค่านิยมของเราเกี่ยวกับการผลิตเฟอร์นิเจอร์ที่ยั่งยืน
            และการสร้างสรรค์ผลิตภัณฑ์ที่คุณรักทุกชิ้น
            ด้วยการใช้วัสดุคุณภาพสูงและเทคโนโลยีที่ทันสมัย
            ทุกชิ้นงานถูกออกแบบมาอย่างลงตัวเพื่อให้คุณสามารถเพิ่มความสุขในการใช้ชีวิตและสร้างสรรค์พื้นที่ในรูปแบบที่คุณต้องการ
          </div>
        </div>
      </div>
      <div class="gridImage">
        <div class="rightGrid">
          <div class="detail">
            ค่านิยมของเราเกี่ยวกับการผลิตเฟอร์นิเจอร์ที่ยั่งยืน
            และการสร้างสรรค์ผลิตภัณฑ์ที่คุณรักทุกชิ้น
            ด้วยการใช้วัสดุคุณภาพสูงและเทคโนโลยีที่ทันสมัย
            ทุกชิ้นงานถูกออกแบบมาอย่างลงตัวเพื่อให้คุณสามารถเพิ่มความสุขในการใช้ชีวิตและสร้างสรรค์พื้นที่ในรูปแบบที่คุณต้องการ
          </div>
        </div>
        <div class="leftGrid">
          <img
            src="https://gg.lnwfile.com/_webp_max_images/1024/1024/s4/c4/oh.webp"
            alt=""
          />
        </div>
      </div>
    </VContainer>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.section-about {
  .gridImage {
    &:last-child {
      .leftGrid {
        order: 1;
      }
      .rightGrid {
        order: 2;
      }
    }
  }
  .banner {
    width: 100%;
    line-height: 0;
    img {
      width: 100%;
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
    }
  }
  .welcome {
    background-color: #fefbf8;
    padding: 80px 0;
    text-align: center;
    @media (max-width: 767px) {
      padding: 30px 0;
    }
    h2 {
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 20px;
      @media (max-width: 767px) {
        font-size: 28px;
      }
    }
  }
  .gridImage {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    align-items: center;
    padding: 80px 0;
    @media (max-width: 767px) {
      grid-template-columns: 100%;
      gap: 20px;
      padding: 30px 0;
    }
    .rightGrid {
      .detail {
        @media (max-width: 767px) {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
