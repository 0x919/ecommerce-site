import { Product } from "@prisma/client";
import { CartProduct } from "./types";

export function addToCart(product: Product) {
  if (typeof window === "undefined") return;

  const cartItems = JSON.parse(localStorage.getItem("cart") || "[]") as CartProduct[];

  const existingProductIndex = cartItems.findIndex((item) => item.id === product.id);
  if (existingProductIndex !== -1) {
    cartItems[existingProductIndex].count += 1;
  } else {
    cartItems.push({ ...product, count: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
}

export function getCartInfo() {
  if (typeof window === "undefined") return { length: 0, total: 0 };

  const cartItems = JSON.parse(localStorage.getItem("cart") || "[]") as CartProduct[];
  const length = cartItems.reduce((length, product) => length + product.count, 0);
  const total = cartItems.reduce((total, product) => {
    return Math.round((total + product.price * product.count) * 100) / 100;
  }, 0);

  return { length, total };
}

export function getCartItems() {
  if (typeof window === "undefined") return [];

  const cartItems = JSON.parse(localStorage.getItem("cart") || "[]") as CartProduct[];
  return cartItems;
}

export function lowerCartCount(product: CartProduct) {
  if (typeof window === "undefined") return;

  let cartItems = JSON.parse(localStorage.getItem("cart") || "[]") as CartProduct[];

  const existingProductIndex = cartItems.findIndex((item) => item.id === product.id);
  const currentCount = cartItems[existingProductIndex].count;
  if (currentCount >= 2) {
    cartItems[existingProductIndex].count -= 1;
  } else {
    cartItems = cartItems.filter((item) => item.id !== product.id);
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
}

export function removeFromCart(product: CartProduct) {
  if (typeof window === "undefined") return;

  let cartItems = JSON.parse(localStorage.getItem("cart") || "[]") as CartProduct[];
  cartItems = cartItems.filter((item) => item.id !== product.id);
  localStorage.setItem("cart", JSON.stringify(cartItems));
}
