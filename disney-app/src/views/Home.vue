<template>
  <div class="home">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <p class="hero-sub">Bienvenido al mundo de</p>
        <h1 class="hero-title">Disney Explorer</h1>
        <p class="hero-desc">Descubre, explora y guarda tus personajes Disney favoritos. Más de 1.000 personajes al alcance de tu mano.</p>
        <div class="hero-buttons">
          <router-link to="/characters" class="btn-primary">
            <i class="fa-solid fa-masks-theater"></i> Explorar Personajes
          </router-link>
          <router-link to="/favorites" class="btn-secondary">
            <i class="fa-solid fa-heart"></i> Mis Favoritos
          </router-link>
        </div>
      </div>
      <div class="hero-stars">
        <span v-for="i in 20" :key="i" class="star" :style="starStyle(i)">✦</span>
      </div>
    </section>

    <!-- Stats -->
    <section class="stats">
      <div class="stat-item">
        <span class="stat-num">+1000</span>
        <span class="stat-label">Personajes</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">+600</span>
        <span class="stat-label">Películas</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">+100</span>
        <span class="stat-label">Series de TV</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">1923</span>
        <span class="stat-label">Desde el año</span>
      </div>
    </section>

    <!-- Featured characters -->
    <section class="featured">
      <div class="section-header">
        <h2>Personajes Destacados</h2>
        <router-link to="/characters" class="see-all">Ver todos <i class="fa-solid fa-arrow-right"></i></router-link>
      </div>
      <LoadingSpinner v-if="loading" message="Cargando personajes..." />
      <div v-else class="featured-grid">
        <CharacterCard v-for="char in featured" :key="char._id" :character="char" />
      </div>
    </section>
  </div>
</template>

<script>
import CharacterCard from '../components/CharacterCard.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import axios from 'axios'

export default {
  name: 'HomeView',
  components: { CharacterCard, LoadingSpinner },
  data() {
    return {
      featured: [],
      loading: true
    }
  },
  async mounted() {
    try {
      const res = await axios.get('https://api.disneyapi.dev/character?pageSize=8')
      this.featured = res.data.data.filter(c => c.imageUrl)
    } catch (e) {
      console.error(e)
    } finally {
      this.loading = false
    }
  },
  methods: {
    starStyle(i) {
      return {
        left: (Math.sin(i * 137.5) * 50 + 50) + '%',
        top: (Math.cos(i * 97.3) * 50 + 50) + '%',
        fontSize: (Math.random() * 10 + 8) + 'px',
        opacity: Math.random() * 0.5 + 0.1,
        animationDelay: (i * 0.3) + 's'
      }
    }
  }
}
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 4rem 1.5rem;
}
.hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 40%, #1e2754 0%, #0a0e2a 70%);
}
.hero-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 80%, rgba(245,200,66,0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(230,62,109,0.08) 0%, transparent 50%);
}
.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 700px;
}
.hero-sub {
  font-size: 0.9rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 0.8rem;
}
.hero-title {
  font-family: 'Cinzel', serif;
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  background: linear-gradient(135deg, var(--gold), #fff8dc, var(--gold-dark));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 1.2rem;
}
.hero-desc {
  color: var(--text-muted);
  font-size: 1.05rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}
.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}
.btn-primary {
  background: var(--gold);
  color: var(--navy);
  padding: 0.75rem 1.8rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.95rem;
  display: flex; align-items: center; gap: 0.5rem;
  transition: all 0.2s;
}
.btn-primary:hover { background: var(--gold-dark); transform: translateY(-2px); }
.btn-secondary {
  background: transparent;
  color: var(--white);
  padding: 0.75rem 1.8rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  border: 1px solid rgba(255,255,255,0.2);
  display: flex; align-items: center; gap: 0.5rem;
  transition: all 0.2s;
}
.btn-secondary:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-2px); }

.hero-stars {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.star {
  position: absolute;
  color: var(--gold);
  animation: twinkle 3s infinite alternate;
}
@keyframes twinkle {
  from { opacity: 0.1; transform: scale(0.8); }
  to { opacity: 0.6; transform: scale(1.2); }
}

.stats {
  background: var(--navy-mid);
  border-top: 1px solid rgba(245,200,66,0.1);
  border-bottom: 1px solid rgba(245,200,66,0.1);
  padding: 2rem 1.5rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: center;
  gap: 1rem;
}
.stat-num {
  display: block;
  font-family: 'Cinzel', serif;
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--gold);
}
.stat-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  letter-spacing: 1px;
  text-transform: uppercase;
}

.featured {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
.section-header h2 {
  font-family: 'Cinzel', serif;
  font-size: 1.8rem;
  color: var(--white);
}
.see-all {
  color: var(--gold);
  text-decoration: none;
  font-size: 0.9rem;
  display: flex; align-items: center; gap: 0.4rem;
  transition: gap 0.2s;
}
.see-all:hover { gap: 0.7rem; }
.featured-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .featured-grid { grid-template-columns: repeat(3, 1fr); }
  .stats { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .featured-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .featured-grid { grid-template-columns: repeat(2, 1fr); gap: 0.8rem; }
  .section-header h2 { font-size: 1.3rem; }
}
</style>
