<template>
  <footer class="footer">
    <div class="footer-inner">
      <p class="footer-logo"><i class="fa-solid fa-star"></i> Disney Explorer</p>
      <p class="footer-text">Datos obtenidos de <a href="https://api.disneyapi.dev" target="_blank">api.disneyapi.dev</a> · Proyecto académico Vue.js</p>
    </div>
  </footer>
</template>

<script>
export default { name: 'FooterBar' }
</script>

<style scoped>
.footer {
  background: var(--navy-mid);
  border-top: 1px solid rgba(245,200,66,0.1);
  padding: 1.5rem;
  text-align: center;
}
.footer-logo {
  font-family: 'Cinzel', serif;
  color: var(--gold);
  font-size: 1rem;
  margin-bottom: 0.4rem;
}
.footer-text {
  font-size: 0.78rem;
  color: var(--text-muted);
}
.footer-text a {
  color: var(--gold-dark);
  text-decoration: none;
}
.footer-text a:hover { color: var(--gold); }
</style>
