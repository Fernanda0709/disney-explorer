<template>
  <div class="favorites-page">
    <div class="page-header">
      <h1><i class="fa-solid fa-heart"></i> Mis Favoritos</h1>
      <p>Tus personajes Disney guardados</p>
    </div>

    <div v-if="favorites.length === 0" class="empty">
      <i class="fa-regular fa-heart"></i>
      <h3>Aún no tienes favoritos</h3>
      <p>Explora los personajes y guarda los que más te gusten</p>
      <router-link to="/characters" class="btn-explore">
        <i class="fa-solid fa-masks-theater"></i> Explorar Personajes
      </router-link>
    </div>

    <div v-else>
      <div class="fav-header">
        <span class="count">{{ favorites.length }} personaje(s) guardado(s)</span>
        <button class="clear-all" @click="clearAll">
          <i class="fa-solid fa-trash"></i> Limpiar todo
        </button>
      </div>
      <div class="grid">
        <CharacterCard v-for="char in favorites" :key="char._id" :character="char" />
      </div>
    </div>
  </div>
</template>

<script>
import CharacterCard from '../components/CharacterCard.vue'

export default {
  name: 'FavoritesView',
  components: { CharacterCard },
  data() {
    return { favorites: [] }
  },
  mounted() {
    this.loadFavs()
  },
  activated() {
    this.loadFavs()
  },
  methods: {
    loadFavs() {
      this.favorites = JSON.parse(localStorage.getItem('disney-favorites') || '[]')
    },
    clearAll() {
      if (confirm('¿Eliminar todos los favoritos?')) {
        localStorage.removeItem('disney-favorites')
        this.favorites = []
      }
    }
  }
}
</script>

<style scoped>
.favorites-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}
.page-header {
  text-align: center;
  margin-bottom: 2.5rem;
}
.page-header h1 {
  font-family: 'Cinzel', serif;
  font-size: clamp(2rem, 5vw, 3rem);
  color: var(--white);
}
.page-header h1 i { color: var(--accent); margin-right: 0.5rem; }
.page-header p { color: var(--text-muted); margin-top: 0.5rem; }

.empty {
  text-align: center;
  padding: 5rem 2rem;
  color: var(--text-muted);
}
.empty i {
  font-size: 4rem;
  color: var(--accent);
  display: block;
  margin-bottom: 1rem;
  opacity: 0.4;
}
.empty h3 {
  font-family: 'Cinzel', serif;
  font-size: 1.3rem;
  color: var(--white);
  margin-bottom: 0.5rem;
}
.btn-explore {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  background: var(--gold);
  color: var(--navy);
  padding: 0.75rem 1.8rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.2s;
}
.btn-explore:hover { background: var(--gold-dark); transform: translateY(-2px); }

.fav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}
.count { color: var(--text-muted); font-size: 0.85rem; }
.clear-all {
  background: none;
  border: 1px solid rgba(230,62,109,0.3);
  color: var(--accent);
  padding: 0.4rem 1rem;
  border-radius: 50px;
  cursor: pointer;
  font-size: 0.8rem;
  display: flex; align-items: center; gap: 0.4rem;
  transition: all 0.2s;
}
.clear-all:hover { background: rgba(230,62,109,0.1); }

.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.2rem;
}

@media (max-width: 1024px) { .grid { grid-template-columns: repeat(4, 1fr); } }
@media (max-width: 768px) { .grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 480px) { .grid { grid-template-columns: repeat(2, 1fr); gap: 0.8rem; } }
</style>
