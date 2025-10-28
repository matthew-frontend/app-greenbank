// Global cart state management
const cartItems = ref([]);
const isCartOpen = ref(false);

export const useCart = () => {
  // คำนวณจำนวนสินค้าทั้งหมดใน cart
  const cartCount = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0);
  });

  // คำนวณราคารวมทั้งหมด
  const cartTotal = computed(() => {
    return cartItems.value.reduce((total, item) => {
      return total + item.product.realPrice * item.quantity;
    }, 0);
  });

  // เพิ่มสินค้าเข้า cart
  const addToCart = (product, quantity = 1) => {
    const existingItem = cartItems.value.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      // ถ้ามีสินค้าอยู่แล้ว เพิ่มจำนวน
      existingItem.quantity += quantity;
    } else {
      // ถ้ายังไม่มี เพิ่มสินค้าใหม่
      cartItems.value.push({
        product,
        quantity,
      });
    }

    // เปิด cart drawer
    isCartOpen.value = true;
  };

  // ลบสินค้าออกจาก cart
  const removeFromCart = (productId) => {
    const index = cartItems.value.findIndex(
      (item) => item.product.id === productId
    );
    if (index > -1) {
      cartItems.value.splice(index, 1);
    }
  };

  // อัพเดทจำนวนสินค้า
  const updateQuantity = (productId, quantity) => {
    const item = cartItems.value.find((item) => item.product.id === productId);
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId);
      } else {
        item.quantity = quantity;
      }
    }
  };

  // ล้าง cart
  const clearCart = () => {
    cartItems.value = [];
  };

  // เปิด/ปิด cart drawer
  const openCart = () => {
    isCartOpen.value = true;
  };

  const closeCart = () => {
    isCartOpen.value = false;
  };

  const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value;
  };

  return {
    // State
    cartItems: readonly(cartItems),
    isCartOpen,
    cartCount,
    cartTotal,

    // Methods
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
  };
};
