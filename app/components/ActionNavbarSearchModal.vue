<template>
  <VDialog
    :model-value="isOpen"
    @update:model-value="(value) => $emit('update:isOpen', value)"
    fullscreen
    transition="dialog-top-transition"
    class="search-modal"
  >
    <div class="search-overlay">
      <VContainer max-width="800">
        <!-- Close Button -->
        <div class="close-btn-container">
          <VBtn
            icon
            variant="text"
            @click="closeModal"
            class="close-btn"
            size="large"
          >
            <VIcon icon="mdi-close" size="28" />
          </VBtn>
        </div>

        <!-- Search Input -->
        <div class="search-input-container">
          <VTextField
            v-model="searchQuery"
            placeholder="ค้นหาสินค้า..."
            variant="outlined"
            class="search-input"
            autofocus
            clearable
            @keyup.enter="performSearch"
          >
            <template v-slot:prepend-inner>
              <VIcon icon="mdi-magnify" size="24" color="#666" />
            </template>
          </VTextField>
        </div>

        <!-- Suggested/Recent Searches -->
        <div
          v-if="!searchQuery && recentSearches.length > 0"
          class="suggestions-section"
        >
          <h3 class="suggestions-title">คำค้นหาล่าสุด</h3>
          <div class="suggestions-chips">
            <VBtn
              v-for="term in recentSearches"
              :key="term"
              variant="outlined"
              class="suggestion-chip"
              @click="selectSuggestion(term)"
            >
              {{ term }}
            </VBtn>
          </div>
        </div>

        <!-- Search Results -->
        <div
          v-if="searchQuery && searchResults.length > 0"
          class="results-section"
        >
          <h3 class="results-title">ผลการค้นหา ({{ searchResults.length }})</h3>
          <div class="results-grid">
            <CardProduct
              v-for="product in searchResults"
              :key="product.id"
              :product="product"
              @click="closeModal"
            />
          </div>
        </div>

        <!-- No Results -->
        <div
          v-if="searchQuery && searchResults.length === 0"
          class="no-results"
        >
          <VIcon icon="mdi-magnify" size="64" color="#ccc" />
          <p>ไม่พบสินค้าที่ค้นหา "{{ searchQuery }}"</p>
        </div>
      </VContainer>
    </div>
  </VDialog>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { getAllProducts } from "~/data/products.js";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:isOpen"]);

const searchQuery = ref("");
const allProducts = getAllProducts();
const recentSearches = ref([]);

// Load recent searches from localStorage on mount
onMounted(() => {
  if (process.client) {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      try {
        recentSearches.value = JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse recent searches:", e);
        recentSearches.value = [];
      }
    }
  }
});

// Search functionality
const searchResults = computed(() => {
  if (!searchQuery.value) return [];

  const query = searchQuery.value.toLowerCase().trim();
  return allProducts
    .filter((product) => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    })
    .slice(0, 12); // Limit to 12 results
});

// Save to localStorage
const saveRecentSearches = () => {
  if (process.client) {
    localStorage.setItem(
      "recentSearches",
      JSON.stringify(recentSearches.value)
    );
  }
};

// Methods
const closeModal = () => {
  emit("update:isOpen", false);
  searchQuery.value = "";
};

const performSearch = () => {
  if (searchQuery.value.trim()) {
    // Add to recent searches
    addRecentSearch(searchQuery.value.trim());
  }
};

const selectSuggestion = (term) => {
  searchQuery.value = term;
};

const addRecentSearch = (term) => {
  if (!term) return;

  // Remove if already exists
  const index = recentSearches.value.indexOf(term);
  if (index !== -1) {
    recentSearches.value.splice(index, 1);
  }

  // Add to the beginning
  recentSearches.value.unshift(term);

  // Keep only last 8 searches
  if (recentSearches.value.length > 8) {
    recentSearches.value = recentSearches.value.slice(0, 8);
  }

  // Save to localStorage
  saveRecentSearches();
};

// Watch search query and add to recent searches when typing stops
let searchTimeout;
watch(searchQuery, (newVal) => {
  if (newVal && newVal.trim().length >= 2) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      addRecentSearch(newVal.trim());
    }, 1000); // Add after 1 second of no typing
  }
});

// Reset search when modal closes
watch(
  () => props.isOpen,
  (newVal) => {
    if (!newVal) {
      searchQuery.value = "";
    }
  }
);
</script>

<style scoped lang="scss">
.search-overlay {
  background-color: #fff;
  padding: 40px 20px;
}

.close-btn-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 40px;

  .close-btn {
    color: #000;

    &:hover {
      background-color: #f5f5f5;
    }
  }
}

.search-input-container {
  margin-bottom: 40px;

  .search-input {
    :deep(.v-field) {
      border-radius: 50px;
      font-size: 18px;
      padding: 8px 16px;
      background-color: #f8f8f8;
      border: 2px solid #e0e0e0;

      &:hover {
        border-color: #d49f4d;
      }

      &.v-field--focused {
        border-color: #d49f4d;
        box-shadow: 0 0 0 3px rgba(212, 159, 77, 0.1);
      }
    }

    :deep(.v-field__input) {
      padding: 12px 0;
      font-size: 18px;
      min-height: 56px;
    }

    :deep(.v-field__outline) {
      display: none;
    }
  }
}

.suggestions-section {
  margin-bottom: 40px;

  .suggestions-title {
    font-size: 16px;
    font-weight: 600;
    color: #000;
    margin-bottom: 16px;
  }

  .suggestions-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;

    .suggestion-chip {
      border-radius: 50px;
      text-transform: none;
      font-size: 14px;
      border-color: #e0e0e0;
      color: #666;
      padding: 8px 20px;

      &:hover {
        border-color: #d49f4d;
        background-color: #fffbf5;
        color: #d49f4d;
      }
    }
  }
}

.results-section {
  .results-title {
    font-size: 18px;
    font-weight: 600;
    color: #000;
    margin-bottom: 24px;
  }

  .results-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;

    @media (max-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }

    @media (max-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
  }
}

.no-results {
  text-align: center;
  padding: 60px 20px;
  color: #999;

  p {
    font-size: 16px;
    margin-top: 16px;
  }
}
</style>
