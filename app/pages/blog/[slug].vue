<template>
  <div class="blog-detail-page">
    <VContainer max-width="1240">
      <!-- Breadcrumbs -->
      <BreadCrumbs :items="breadcrumbItems" />

      <!-- Blog Image -->
      <div class="blog-image">
        <img :src="blog.image" :alt="blog.title" />
      </div>
      <div class="blog-width">
        <!-- Blog Header -->
        <div class="blog-header">
          <h1 class="blog-title">{{ blog.title }}</h1>
          <p class="blog-date">
            <VIcon icon="mdi-clock-outline" color="#666" size="18" />
            {{ formattedDate }}
          </p>
        </div>

        <!-- Blog Content -->
        <div class="blog-content" v-html="blog.content"></div>

        <!-- Tags -->
        <div class="blog-tags" v-if="blog.tags && blog.tags.length > 0">
          <VBtn
            v-for="tag in blog.tags"
            :key="tag"
            variant="outlined"
            size="small"
            class="tag-btn"
          >
            {{ tag }}
          </VBtn>
        </div>

        <!-- Share Section -->
        <div class="share-section">
          <div class="share-content">
            <div class="share-left">
              <div class="qr-code">
                <img :src="qrCodeUrl" alt="QR Code" />
              </div>
            </div>
            <div class="share-right">
              <div class="share-header">
                <span class="share-label">Share :</span>
                <div class="social-icons">
                  <VBtn
                    icon
                    size="medium"
                    variant="text"
                    class="social-btn"
                    @click="shareToFacebook"
                  >
                    <VIcon icon="mdi-facebook" />
                  </VBtn>
                  <VBtn
                    icon
                    size="medium"
                    variant="text"
                    class="social-btn"
                    @click="shareToTwitter"
                  >
                    <VIcon icon="mdi-twitter" />
                  </VBtn>
                  <VBtn
                    icon
                    size="medium"
                    variant="text"
                    class="social-btn"
                    @click="shareToLine"
                  >
                    <VIcon icon="mdi-chat" />
                  </VBtn>
                </div>
              </div>
              <div class="share-url">
                <VTextField
                  :model-value="shareUrl"
                  readonly
                  variant="outlined"
                  density="compact"
                  hide-details
                >
                  <template v-slot:append-inner>
                    <VBtn
                      icon
                      size="x-small"
                      variant="text"
                      @click="copyToClipboard"
                    >
                      <VIcon icon="mdi-content-copy" size="18" />
                    </VBtn>
                  </template>
                </VTextField>
              </div>
            </div>
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
.blog-width {
  max-width: 680px;
  margin: 0 auto;
  text-align: left;
}

.blog-image {
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 30px;
  max-height: 679px;

  img {
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    height: auto;
    object-fit: cover;
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
