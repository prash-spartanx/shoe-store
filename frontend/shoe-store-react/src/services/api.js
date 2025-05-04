// frontend/src/services/api.js
// frontend/src/services/api.js
export const loginUser = async (email, password) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Required for cookies
      body: JSON.stringify({ email, password })
    });
    return await response.json();
  };
// services/api.js
export const fetchCart = async () => {
    const response = await fetch('/api/cart', {
      credentials: 'include'
    });
    
    if (response.status === 401) {
      throw new Error('Unauthorized');
    }
    
    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }
    
    return await response.json();
  };
  
  export const addToCart = async (productId, quantity) => {
    const response = await fetch("/api/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ productId, quantity }),
    });
    return await response.json();
  };
  
  export const removeFromCart = async (productId) => {
    const response = await fetch(`/api/cart/remove/${productId}`, {
      method: "DELETE",
      credentials: "include",
    });
    return await response.json();
  };
  