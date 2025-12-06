import { ref, computed } from "vue" // ⚠️ Import manquant de 'computed'


// ⚙️ Configuration Medusa
const MEDUSA_URL = import.meta.env.VITE_MEDUSA_URL;
const MEDUSA_KEY = import.meta.env.VITE_MEDUSA_KEY;

const cart = ref(null)
const cartId = ref(localStorage.getItem("cart_id") || null)
const isLoading = ref(false)

export function useCart() {
  /**
   * 📊 Calculer le nombre total d'articles dans le panier
   */
  const cartCount = computed(() => {
    if (!cart.value || !cart.value.items) return 0
    return cart.value.items.reduce((sum, item) => sum + item.quantity, 0)
  })

  /**
   * 💰 Calculer le total du panier
   */
  const cartTotal = computed(() => {
    if (!cart.value) return 0
    return cart.value.total || 0
  })

  /**
   * 🆕 Créer un panier vide
   */
  const createCart = async () => {
    console.log("🛒 Création d'un nouveau panier...")
    isLoading.value = true
    
    try {
      // 3. Créer le panier avec la region_id
      const res = await fetch(`${MEDUSA_URL}/store/carts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-publishable-api-key": MEDUSA_KEY,
        },
        body: JSON.stringify({
          region_id: "reg_01KB11SJSC9263NBG0853969Z7"
        })
      })
  
      if (!res.ok) {
        const errorData = await res.json()
        console.error("Erreur API:", errorData)
        throw new Error(`Erreur HTTP: ${res.status}`)
      }
  
      const data = await res.json()
  
      if (data.cart) {
        cart.value = data.cart
        cartId.value = data.cart.id
        localStorage.setItem("cart_id", data.cart.id)
        console.log("✅ Panier créé avec succès:", cartId.value)
        return cart.value
      }
    } catch (error) {
      console.error("❌ Erreur lors de la création du panier:", error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  /**
   * 🔄 Récupérer le panier existant ou en créer un nouveau
   */
  const getOrCreateCart = async () => {
    if (cartId.value) {
      try {
        const res = await fetch(`${MEDUSA_URL}/store/carts/${cartId.value}`, {
          headers: { "x-publishable-api-key": MEDUSA_KEY },
        })
        
        if (res.ok) {
          const data = await res.json()
          cart.value = data.cart
          console.log("✅ Panier récupéré:", cartId.value)
          return cart.value
        } else {
          console.warn("⚠️ Panier introuvable, création d'un nouveau...")
          cartId.value = null
          localStorage.removeItem("cart_id")
        }
      } catch (error) {
        console.warn("⚠️ Impossible de récupérer le panier existant:", error)
      }
    }
    
    // Si pas de panier → on en crée un
    return await createCart()
  }

  /**
   * ➕ Ajouter un produit (variant) au panier
   */
  const addToCart = async (variantId, quantity = 1) => {
    isLoading.value = true
    
    try {
      const currentCart = await getOrCreateCart()

      const res = await fetch(
        `${MEDUSA_URL}/store/carts/${currentCart.id}/line-items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-publishable-api-key": MEDUSA_KEY,
          },
          body: JSON.stringify({
            variant_id: variantId,
            quantity,
          }),
        }
      )

      if (!res.ok) {
        throw new Error(`Erreur HTTP: ${res.status}`)
      }

      const data = await res.json()
      
      if (data.cart) {
        cart.value = data.cart
        console.log("✅ Produit ajouté au panier")
        return data.cart
      } else {
        throw new Error("Réponse invalide du serveur")
      }
    } catch (error) {
      console.error("❌ Erreur lors de l'ajout au panier:", error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  /**
   * ➖ Mettre à jour la quantité d'un article
   */
  const updateLineItem = async (lineItemId, quantity) => {
    if (!cartId.value) return

    isLoading.value = true

    try {
      const res = await fetch(
        `${MEDUSA_URL}/store/carts/${cartId.value}/line-items/${lineItemId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-publishable-api-key": MEDUSA_KEY,
          },
          body: JSON.stringify({ quantity }),
        }
      )

      if (!res.ok) {
        throw new Error(`Erreur HTTP: ${res.status}`)
      }

      const data = await res.json()
      cart.value = data.cart
      console.log("✅ Quantité mise à jour")
    } catch (error) {
      console.error("❌ Erreur lors de la mise à jour:", error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  /**
   * 🗑️ Supprimer un article du panier
   */
  const removeLineItem = async (lineItemId) => {
    if (!cartId.value) return

    isLoading.value = true

    try {
      const res = await fetch(
        `${MEDUSA_URL}/store/carts/${cartId.value}/line-items/${lineItemId}`,
        {
          method: "DELETE",
          headers: {
            "x-publishable-api-key": MEDUSA_KEY,
          },
        }
      )

      if (!res.ok) {
        throw new Error(`Erreur HTTP: ${res.status}`)
      }

      const data = await res.json()
      cart.value = data.cart
      console.log("✅ Article supprimé")
    } catch (error) {
      console.error("❌ Erreur lors de la suppression:", error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  /**
   * 🛒 Récupérer le panier actuel
   */
  const getCart = async () => {
    if (!cartId.value) return await createCart()
    
    isLoading.value = true
    
    try {
      const res = await fetch(`${MEDUSA_URL}/store/carts/${cartId.value}`, {
        headers: { "x-publishable-api-key": MEDUSA_KEY },
      })

      if (!res.ok) {
        throw new Error(`Erreur HTTP: ${res.status}`)
      }

      const data = await res.json()
      cart.value = data.cart
      return cart.value
    } catch (error) {
      console.error("❌ Erreur lors de la récupération du panier:", error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  /**
   * 📦 Récupérer le stock d'un variant
   */
  const getVariantStock = async (variantId) => {
    try {
      const res = await fetch(
        `${MEDUSA_URL}/store/variants/${variantId}?fields=+inventory_quantity`,
        {
          headers: { "x-publishable-api-key": MEDUSA_KEY },
        }
      )

      if (!res.ok) {
        throw new Error(`Erreur HTTP: ${res.status}`)
      }

      const data = await res.json()
      const stock = data.variant?.inventory_quantity || 0
      console.log(`📦 Stock du variant ${variantId}:`, stock)
      return stock
    } catch (error) {
      console.error("❌ Erreur lors de la récupération du stock:", error)
      return 0
    }
  }

  /**
   * 🧹 Vider le panier
   */
  const clearCart = () => {
    cart.value = null
    cartId.value = null
    localStorage.removeItem("cart_id")
    console.log("🧹 Panier vidé")
  }

  return {
    // État
    cart,
    cartId,
    isLoading,
    
    // Computed
    cartCount,
    cartTotal,
    
    // Méthodes
    createCart,
    getOrCreateCart,
    addToCart,
    updateLineItem,
    removeLineItem,
    getCart,
    getVariantStock,
    clearCart,
  }
}