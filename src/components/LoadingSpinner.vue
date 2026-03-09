<template>
  <div class="spinner-wrap">
    <div class="spinner">
      <i class="fa-solid fa-star spin"></i>
    </div>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    message: { type: String, default: 'Cargando...' }
  }
}
</script>

<style scoped>
.spinner-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  gap: 1rem;
  color: var(--text-muted);
}
.spinner i {
  font-size: 2.5rem;
  color: var(--gold);
}
.spin {
  animation: spinStar 1.2s linear infinite;
}
@keyframes spinStar {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
p { font-size: 0.9rem; letter-spacing: 1px; }
</style>
