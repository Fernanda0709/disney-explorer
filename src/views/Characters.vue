<template>
  <div class="characters-page">
    <div class="page-header">
      <h1>Personajes Disney</h1>
      <p>Explora el universo mágico de Disney</p>
    </div>

    <!-- Search bar -->
    <div class="search-wrap">
      <div class="search-box">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input
          v-model="searchQuery"
          @input="onSearch"
          type="text"
          placeholder="Buscar personaje..."
        />
        <button v-if="searchQuery" @click="clearSearch" class="clear-btn">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>

    <LoadingSpinner v-if="loading" message="Buscando personajes mágicos..." />

    <div v-else-if="characters.length === 0" class="empty">
      <i class="fa-solid fa-wand-magic-sparkles"></i>
      <p>No se encontraron personajes para "{{ searchQuery }}"</p>
    </div>

    <div v-else>
      <p class="result-count">
        <span v-if="searchQuery">{{ characters.length }} resultado(s) para "{{ searchQuery }}"</span>
        <span v-else>Página {{ currentPage }} de {{ totalPages }}</span>
      </p>
      <div class="grid">
        <CharacterCard v-for="char in characters" :key="char._id" :character="char" />
      </div>

      <!-- Pagination -->
      <div class="pagination" v-if="!searchQuery && totalPages > 1">
        <button @click="goPage(currentPage - 1)" :disabled="currentPage === 1" class="page-btn">
          <i class="fa-solid fa-chevron-left"></i>
        </button>

        <button
          v-for="p in pagesToShow"
          :key="p"
          @click="goPage(p)"
          class="page-btn"
          :class="{ active: p === currentPage }"
        >{{ p }}</button>

        <button @click="goPage(currentPage + 1)" :disabled="currentPage === totalPages" class="page-btn">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CharacterCard from '../components/CharacterCard.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import axios from 'axios'

export default {
  name: 'CharactersView',
  components: { CharacterCard, LoadingSpinner },
  data() {
    return {
      characters: [],
      loading: false,
      currentPage: 1,
      totalPages: 1,
      searchQuery: '',
      searchTimeout: null
    }
  },
  computed: {
    pagesToShow() {
      const pages = []
      const start = Math.max(1, this.currentPage - 2)
      const end = Math.min(this.totalPages, this.currentPage + 2)
      for (let i = start; i <= end; i++) pages.push(i)
      return pages
    }
  },
  mounted() {
    this.fetchCharacters()
  },
  methods: {
    async fetchCharacters(page = 1) {
      this.loading = true
      try {
        const res = await axios.get(`https://api.disneyapi.dev/character?page=${page}&pageSize=20`)
        this.characters = res.data.data
        this.totalPages = res.data.info?.totalPages || 1
        this.currentPage = page
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    async searchCharacters(name) {
      this.loading = true
      try {
        const res = await axios.get(`https://api.disneyapi.dev/character?name=${encodeURIComponent(name)}`)
        this.characters = res.data.data || []
      } catch (e) {
        this.characters = []
      } finally {
        this.loading = false
      }
    },
    onSearch() {
      clearTimeout(this.searchTimeout)
      this.searchTimeout = setTimeout(() => {
        if (this.searchQuery.trim().length > 1) {
          this.searchCharacters(this.searchQuery.trim())
        } else if (this.searchQuery.trim() === '') {
          this.fetchCharacters(1)
        }
      }, 500)
    },
    clearSearch() {
      this.searchQuery = ''
      this.fetchCharacters(1)
    },
    goPage(page) {
      if (page < 1 || page > this.totalPages) return
      this.fetchCharacters(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>

<style scoped>
.characters-page {
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
  font-size: clamp(2rem, 5vw, 3.5rem);
  background: linear-gradient(135deg, var(--gold), #fff8dc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.page-header p {
  color: var(--text-muted);
  margin-top: 0.5rem;
}

.search-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}
.search-box {
  display: flex;
  align-items: center;
  background: var(--navy-light);
  border: 1px solid rgba(245,200,66,0.2);
  border-radius: 50px;
  padding: 0.6rem 1.2rem;
  width: 100%;
  max-width: 500px;
  gap: 0.6rem;
  transition: border-color 0.2s;
}
.search-box:focus-within {
  border-color: var(--gold);
  box-shadow: 0 0 0 3px rgba(245,200,66,0.1);
}
.search-box i { color: var(--text-muted); }
.search-box input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: var(--white);
  font-size: 0.95rem;
  font-family: 'Lato', sans-serif;
}
.search-box input::placeholder { color: var(--text-muted); }
.clear-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0;
  font-size: 0.9rem;
}
.clear-btn:hover { color: var(--white); }

.result-count {
  color: var(--text-muted);
  font-size: 0.85rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.2rem;
}

.empty {
  text-align: center;
  padding: 5rem 2rem;
  color: var(--text-muted);
}
.empty i {
  font-size: 3rem;
  color: var(--gold);
  margin-bottom: 1rem;
  display: block;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 3rem;
  flex-wrap: wrap;
}
.page-btn {
  background: var(--navy-light);
  border: 1px solid rgba(245,200,66,0.15);
  color: var(--white);
  width: 40px; height: 40px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
  display: flex; align-items: center; justify-content: center;
}
.page-btn:hover:not(:disabled) {
  background: var(--gold);
  color: var(--navy);
  border-color: var(--gold);
}
.page-btn.active {
  background: var(--gold);
  color: var(--navy);
  font-weight: 700;
  border-color: var(--gold);
}
.page-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

@media (max-width: 1024px) { .grid { grid-template-columns: repeat(4, 1fr); } }
@media (max-width: 768px) { .grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 480px) { .grid { grid-template-columns: repeat(2, 1fr); gap: 0.8rem; } }
</style>
