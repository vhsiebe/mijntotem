import { useLocalStorage } from "@vueuse/core";

export const useCart = () => {
  // State
  const loading = useState('loading', () => false);
  const cart = useState('cart', () => {});
  const order = useState('order', () => {});
  const cartId = useLocalStorage("cart_id", null);
  const shippingOptions = useState('shippingOptions', () => []);
  const modalOpen = useState('modalOpen', () => false);

  // Getters
  const cartCount = computed(() => {
    return cart.value?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  });

  const cartLoading = computed(() => {
    return loading.value;
  });

  // Actions
  const toggleModal = () => {
    modalOpen.value = !modalOpen.value;
  };

  const clearCart = () => {
    cart.value = {};
    cartId.value = null;
    localStorage.removeItem("cart_id");
  };

  const getCart = async () => {
    loading.value = true;
    const storedCartId = localStorage.getItem("cart_id");
    if (!storedCartId || storedCartId === "null") {
      await createCart();
      return;
    }

    try {
      cart.value = await $fetch(`/api/cart?cart_id=${storedCartId}`);
      await getShippingOptions();
    } catch (e) {
      localStorage.removeItem("cart_id");
      await createCart();
    } finally {
      loading.value = false;
    }
  };


  const completeCheckout = async () => {
    const storedCartId = localStorage.getItem("cart_id");
    order.value = await $fetch(`/api/cart/${storedCartId}/complete`, {
      method: 'POST'
    });
    clearCart();
  };

  const createCart = async () => {
    cart.value = await $fetch('/api/cart', {
      method: 'POST',
      body: {
        sales_channel_id: "sc_01JS3WXW6HYMYMFFMNJ6ERVCTK",
        shipping_address: {
          country_code: "be",
        },
      }
    });
    localStorage.setItem("cart_id", cart.value.id);
    await getShippingOptions();
  };
  const getShippingOptions = async () => {
    shippingOptions.value = await $fetch(`/api/cart/shipping-options?cart_id=${cart.value.id}`);
  };


  const addItemToCart = async ({ variant, product, quantity, metadata }) => {
    if (!cart.value?.id) {
      await getCart();
    }

    // Store original cart state for rollback
    const originalCart = { ...cart.value };

    // Optimistic update - update UI immediately
    cart.value = {
      ...cart.value,
      items: [
        ...cart.value.items || [],
        { 
          ...product,
          product_title: product.title,
          variant_title: variant.title,
          unit_price: variant.calculated_price.calculated_amount,
          quantity,
          metadata,
        },
      ],
      total: (cart.value.total || 0) + quantity * variant.calculated_price.calculated_amount,
    };

    try {
      // Make API call to add item
      cart.value = await $fetch(`/api/cart/${cart.value.id}/line-items`, {
        method: 'POST',
        body: {
          variant_id: variant.id,
          quantity,
          metadata,
        }
      });
    } catch (e) {
      console.log("[addItemToCart] Error: ", e);
      // Rollback to original cart state on error
      cart.value = originalCart;
      
      // If it's a cart not found error, try to create a new cart
      if (e.status === 404 || e.status === 400) {
        localStorage.removeItem("cart_id");
        await createCart();
      }
    }
  };

  const changeQuantity = async ({ item, quantity }) => {
    cart.value = {
      ...cart.value,
      items: cart.value.items.map((i) => {
        if (i.id === item.id) {
          return { ...i, quantity };
        }
        return i;
      }),
      total: cart.value.total + (quantity - item.quantity) * item.unit_price,
    };

    try {
      if (quantity === 0) {
        cart.value = {
          ...cart.value,
          items: cart.value.items.filter((i) => i.id !== item.id)
        }

        cart.value = await $fetch(`/api/cart/${cart.value.id}/line-items/${item.id}`, {
          method: 'DELETE'
        })
      } else {
        cart.value = await $fetch(`/api/cart/${cart.value.id}/line-items/${item.id}`, {
          method: 'PUT',
          body: {
            quantity,
          }
        });
      }
    } catch (e) {
      console.log("[changeQuantity] Error: ", e);
    }
  };

  // Alias voor backward compatibility
  const updateQuantity = changeQuantity;

  return {
    // State
    loading: readonly(loading),
    cart: readonly(cart),
    order: readonly(order),
    cartId: readonly(cartId),
    shippingOptions: readonly(shippingOptions),
    modalOpen: readonly(modalOpen),
    
    // Getters
    cartCount,
    cartLoading,
    
    // Actions
    toggleModal,
    clearCart,
    getCart,
    completeCheckout,
    createCart,
    getShippingOptions,
    addItemToCart,
    changeQuantity,
    updateQuantity,
  };
};
