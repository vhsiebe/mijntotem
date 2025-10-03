import { ref } from 'vue'

const toasts = ref([])

export const useToast = () => {
  const addToast = (toast) => {
    const id = Date.now() + Math.random()
    const newToast = {
      id,
      type: 'success', // success, error, warning, info
      title: 'Succes',
      message: 'Item toegevoegd aan winkelwagen',
      duration: 3000,
      ...toast
    }
    
    toasts.value.push(newToast)
    
    // Auto remove after duration
    if (newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, newToast.duration)
    }
    
    return id
  }
  
  const removeToast = (id) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }
  
  const clearAllToasts = () => {
    toasts.value = []
  }
  
  return {
    toasts: readonly(toasts),
    addToast,
    removeToast,
    clearAllToasts
  }
}
