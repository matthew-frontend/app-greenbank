<template>
  <div class="blog-detail-page">
    <VContainer max-width="1240">
      <!-- Breadcrumbs -->
      <BreadCrumbs :items="breadcrumbItems" />
      <div class="blog-header">
        <h1 class="blog-title">ตรวจสอบเลขพัสดุ</h1>
        <p class="blog-date">
          <VIcon icon="mdi-clock-outline" color="#666" size="18" />
          {{ formattedDate }}
        </p>
      </div>
      <div class="grid-blog">
        <div class="left-blog">
          <h3>
            <VIcon icon="mdi-pin" color="red" class="pin" />วิธีการตรวจสอบ / How
            to Check
          </h3>
          <div class="check">
            <p>1. คัดลอกเลขพัสดุของคุณจากด้านล่าง</p>
            <p>Copy your tracking number below</p>
          </div>
          <div class="check">
            <p>2. ไปที่เว็บไซต์ J&T Express</p>
            <p>Go to the J&T Express website</p>
          </div>
          <div class="check">
            <p>3. กดค้นหาเพื่อดูสถานะ</p>
            <p>Click search to view the status</p>
          </div>
        </div>
        <div class="right-blog">
          <h3>
            <VIcon icon="mdi-clipboard-text-outline" />รายการเลขพัสดุ / Tracking
            Numbers
          </h3>
          <div class="track-number">
            <ul>
              <li>831829658376 <span>Prakit</span></li>
              <li>831829658376 <span>Jakray</span></li>
              <li>831829658376 <span>Tony</span></li>
              <li>831829658376 <span>Mark</span></li>
              <li>831829658376 <span>Matty</span></li>
              <li>831829658376 <span>Patty</span></li>
            </ul>
          </div>
        </div>
      </div>
    </VContainer>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { getBlogBySlug, formatDate } from "~/data/blogs.js";

const route = useRoute();
const slug = route.params.slug;

// Get blog data
const blog = getBlogBySlug(slug);

// Redirect if blog not found
if (!blog) {
  throw createError({
    statusCode: 404,
    message: "Blog not found",
  });
}

// Format date
const formattedDate = computed(() => {
  return formatDate(blog.date);
});

// Share URL
const shareUrl = computed(() => {
  if (process.client) {
    return window.location.href;
  }
  return "";
});

// Generate QR Code URL using a free API
const qrCodeUrl = computed(() => {
  const url = encodeURIComponent(shareUrl.value);
  return `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${url}`;
});

// Share functions
const shareToFacebook = () => {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareUrl.value
  )}`;
  window.open(url, "_blank", "width=600,height=400");
};

const shareToTwitter = () => {
  const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    shareUrl.value
  )}&text=${encodeURIComponent(blog.title)}`;
  window.open(url, "_blank", "width=600,height=400");
};

const shareToLine = () => {
  const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
    shareUrl.value
  )}`;
  window.open(url, "_blank", "width=600,height=400");
};

const copyToClipboard = () => {
  if (process.client) {
    navigator.clipboard.writeText(shareUrl.value);
    alert("คัดลอกลิงก์แล้ว");
  }
};

// Breadcrumb items
const breadcrumbItems = [
  {
    title: "หน้าหลัก",
    disabled: false,
    href: "/",
  },
  {
    title: "บทความทั้งหมด",
    disabled: false,
    href: "/blog",
  },
  {
    title: blog.title,
    disabled: true,
  },
];

// SEO
useHead({
  title: blog.title,
  meta: [
    {
      name: "description",
      content: blog.description,
    },
  ],
});
</script>

<style lang="scss" scoped>
.grid-blog {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  .left-blog {
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 20px;
    h3 {
      margin-bottom: 12px;
      display: flex;
      gap: 10px;
      align-items: center;
    }
    .pin {
      transform: rotate(45deg);
    }
    .check {
      margin-bottom: 10px;
      p:first-child {
        font-weight: 600;
        margin-bottom: 3px;
      }
      p:last-child {
        color: #959292;
        font-style: italic;
        font-weight: 500;
      }
    }
  }
  .right-blog {
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 20px;
    h3 {
      display: flex;
      gap: 10px;
      align-items: center;
      margin-bottom: 12px;
    }
    .track-number {
      background-color: #f0f0f0;
      padding: 20px;
      border-radius: 8px;
      ul {
        li {
          margin-bottom: 5px;
          span {
            font-weight: 500;
            margin-left: 10px;
          }
        }
      }
    }
  }
}
.blog-header {
  margin-bottom: 30px;
  .blog-title {
    font-size: 36px;
    font-weight: 700;
    color: #000;
    margin-bottom: 16px;
    line-height: 1.4;

    @media (max-width: 768px) {
      font-size: 28px;
    }
  }

  .blog-date {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    margin: 0;
  }
}

.blog-content {
  font-size: 14px;
  line-height: 1.8;
  color: #333;
  margin-bottom: 40px;

  :deep(h2) {
    font-size: 28px;
    font-weight: 700;
    margin-top: 40px;
    margin-bottom: 20px;
    color: #000;

    @media (max-width: 768px) {
      font-size: 24px;
    }
  }

  :deep(h3) {
    font-size: 24px;
    font-weight: 600;
    margin-top: 30px;
    margin-bottom: 16px;
    color: #000;

    @media (max-width: 768px) {
      font-size: 20px;
    }
  }

  :deep(p) {
    margin-bottom: 20px;
    text-align: justify;
  }

  :deep(ul),
  :deep(ol) {
    margin-bottom: 20px;
    padding-left: 30px;

    li {
      margin-bottom: 10px;
    }
  }

  :deep(img) {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 30px 0;
  }
}

.blog-tags {
  margin-bottom: 40px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  .tag-btn {
    border-radius: 20px;
    border-color: #000;
    color: #000;
    text-transform: lowercase;
    font-size: 14px;
    padding: 0 20px;

    :deep(.v-btn__content) {
      font-weight: 400;
    }
  }
}

.share-section {
  padding: 20px 0;

  .share-content {
    display: flex;
    gap: 30px;
    align-items: flex-start;

    @media (max-width: 600px) {
      flex-direction: column;
      align-items: center;
    }

    .share-left {
      .qr-code {
        width: 120px;
        height: 120px;
        border-radius: 4px;
        padding: 8px;
        background: #fff;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }

    .share-right {
      flex: 1;

      .share-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 16px;

        .share-label {
          font-size: 16px;
          font-weight: 600;
          color: #000;
        }

        .social-icons {
          display: flex;
          gap: 8px;

          .social-btn {
            color: #666;

            &:hover {
              color: #000;
            }
          }
        }
      }

      .share-url {
        :deep(.v-field) {
          border-radius: 4px;
        }

        :deep(.v-field__input) {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
