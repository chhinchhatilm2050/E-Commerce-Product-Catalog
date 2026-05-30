import { defineStore } from "pinia";
import {ref, computed, watch} from 'vue';

const CART_KEY = 'cbcshop_cart';
const TAX_RATE = 0.10;
const SHIPPING = 5.00;
const FREE_SHIP = 100.00;

export const useCartStore = defineStore('cart', () => {
  const items = ref([]);

  const itemCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  );

  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  const tax = computed(() =>
    subtotal.value * TAX_RATE
  );

  const shipping = computed(() =>
    subtotal.value >= FREE_SHIP ? 0 : SHIPPING
  );

  const total = computed(() =>
    subtotal.value + tax.value + shipping.value
  );

  const isEmpty = computed(() => items.value.length === 0);

  watch(items, (newItem) => {
    localStorage.setItem(CART_KEY, JSON.stringify(newItem))
  }, {deep: true});

  const loadCart = () => {
    const stored = localStorage.getItem(CART_KEY);
    if(stored) {
      try {
        items.value = JSON.parse(stored)
      } catch {
        items.value = []
      }
    }
  }

  const addItem = (product, quantity = 1) => {
    const exiting = items.value.find(i => i.id === product.id)
    if(exiting) {
      exiting.quantity += quantity
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        stock: product.stock,
        quantity
      })
    }
  }

  const removeItem = (productId) => {
    items.value = items.value.filter(i => i.id !== productId)
  }

  const updateQuantity = (productId, quantity) => {
    const item = items.value.find(i => i.id === productId);
    if(item) {
      if(quantity <= 0) {
        removeItem(productId)
      } else {
        item.quantity = Math.min(quantity, item.stock || 99)
      }
    }
  }

  const clearCart = () => {
    items.value = []
    localStorage.removeItem(CART_KEY)
  }

  const isInCart = (productId) => {
    return items.value.some(i => i.id === productId);
  }

  const getItemQuantity = (productId) => {
    const item = items.value.find(i => i.id === productId);
    return item ? item.quantity : 0
  }


  return {
    items,
    itemCount,
    subtotal,
    tax,
    shipping,
    total,
    isEmpty,
    loadCart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity
  }
});
