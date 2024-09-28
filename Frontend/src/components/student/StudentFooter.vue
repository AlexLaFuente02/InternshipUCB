<template>
  <footer>
    <div class="container">
      <div class="content__footer">
        <div class="profil">
          <div class="logo__area">
            <font-awesome-icon
              :icon="['fas', 'earth-americas']"
              size="2x"
              style="color: #838b8e"
            />
            <span class="logo__name">Internship</span>
          </div>
          <div class="desc__area">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              architecto minima suscipit hic! Nulla labore illum ratione unde
              perferendis, totam suscipit sequi fugiat. Tempora quaerat neque
              laudantium? Perspiciatis, non nostrum?
            </p>
          </div>
          <div class="social_media">
            <font-awesome-icon
              :icon="['fab', 'facebook']"
              style="color: #838b8e"
            />
            <font-awesome-icon
              :icon="['fab', 'tiktok']"
              style="color: #838b8e"
            />
            <font-awesome-icon
              :icon="['fab', 'instagram']"
              style="color: #838b8e"
            />
            <font-awesome-icon
              :icon="['fab', 'linkedin']"
              style="color: #838b8e"
            />
          </div>
        </div>

        <div class="service__area">
          <ul class="service__header">
            <li class="service__name">Enlaces de navegación</li>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Mis pasantías</a></li>
            <li><a href="#">Busqueda de pasantías</a></li>
            <li><a href="#">Mi perfil</a></li>
            <li><a href="#">Contáctenos</a></li>
          </ul>
          <ul class="service__header">
            <li class="service__name">Información de contacto</li>
            <li><a href="tel:+591123456789">Teléfono: 123456789</a></li>
            <li>
              <a href="mailto:info@internship">Correo: info@internship</a>
            </li>
            <li><a href="#">Dirección: Calle 123</a></li>
          </ul>
          <ul class="service_header">
            <li class="service__name">Acerca de nosotros</li>
            <li><a href="#">¿Quienes somos?</a></li>
            <li><a href="#">Nuestro equipo</a></li>
            <li><a href="#">Nuestros servicios</a></li>
            <li><a href="#">Preguntas frecuentes</a></li>
          </ul>
        </div>
      </div>
      <hr />
      <div class="footer__bottom">
        <div class="copy__right">
          <font-awesome-icon
            icon="fas-solid fa-registered"
            style="color: #838b8e"
          />
          <span>2023 Internship</span>
        </div>
        <div class="tou">
          <a href="#">Términos de uso</a>
          <a href="#">Politica de privacidad</a>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: white;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: #838b8e;
}
main {
  width: 100%;
}
footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: #f5f5f5;
  box-shadow: 0 16px 70px -8px rgba(0, 0, 0, 0.25);
  border-radius: 20px 20px 0 0;
  transition: background-color 0.3s linear;
}
.container {
  max-width: 1240px;
  padding: 30px 40px;
  margin: auto;
}
.content__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.profil .logo__area {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.logo__area .logo__name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-left: 0 1rem;
  color: black;
}
.desc__area {
  max-width: 320px;
  margin-bottom: 1.25rem;
}
.desc__area p {
  font-weight: 400;
  color: #838b8e;
  line-height: 28px;
}
.social_media ::deep .svg-inline--fa {
  color: #838b8e;
  margin-right: 22px;
  font-size: 24px;
}
.social_media ::deep .svg-inline--fa:hover {
  color: #000;
}
.service__area {
  display: flex;
}
.service__header {
  margin-right: 40px;
}
li.service__name {
  color: #000;
  font-weight: 600;
}
.service__header li a {
  color: #838b8e;
  padding-bottom: 1px;
  font-weight: 400;
}
.service__header li a:hover {
  color: #000;
}
.service__header li {
  margin-bottom: 10px;
}
hr {
  height: 1px;
  border: none;
  background-color: #838b8e;
  margin-bottom: 1rem;
}
.footer__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875;
}
.copy__right {
  color: #838b8e;
  display: flex;
  align-items: center;
}
.copy__right span {
  margin-left: 8px;
  font-weight: 400;
  letter-spacing: 0.135rem;
}
.tou a {
  margin-left: 1.5rem;
  color: #838b8e;
}
.tou a:hover {
  color: #000;
}
@media screen and (max-width: 768px) {
  .content__footer {
    flex-wrap: wrap;
    justify-content: left;
  }
  .service__area {
    flex-wrap: wrap;
    justify-content: left;
  }
  .service__header {
    margin-right: 0;
    margin-bottom: 40px;
  }
  .social_media {
    margin-bottom: 1rem;
  }
  .footer__bottom {
    flex-wrap: wrap;
    justify-content: center;
  }
}
@media screen and (max-width: 510px) {
  .service__header {
    margin-bottom: 8px;
  }
  .copy__right {
    margin-bottom: 8rem;
  }
}
</style>
