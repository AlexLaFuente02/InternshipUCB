<template>
  <footer class="container__footer">
    <div class="container__logo__footer">
      <router-link to="/">
        <img
        src="../images/USEI.png"
        alt="Unidad de Servicios Estudiantiles Integrales"
       />
      </router-link>
    </div>
    <div class="footer__links1">
      <div class="links__pack">
            <a
            class="link"
            style="background-color: #3b5998"
            href="https://www.facebook.com/usei.lpz"
            role="button"
            ><font-awesome-icon :icon="['fab', 'facebook']"
          /></a>
          <a
            class="link"
            style="background-color: #55acee"
            href="https://twitter.com/UCBLaPaz"
            role="button"
            ><font-awesome-icon :icon="['fab', 'twitter']"
          /></a>
          <a
            class="link"
            style="background-color: #dd4b39"
            href="https://mail.google.com/mail/u/1/#inbox?compose=DmwnWsCRjWtfwVwNPvpsfBxKhjWRJWTNWsBrVrjkhPXCqBqStBvQlDTKSnBpJGCFDVNPRRMBDXDV"
            role="button"
            ><font-awesome-icon :icon="['fab', 'google']"
          /></a>
        </div>
        <div class="links__pack">
          <a
          class="link"
          style="background-color: #ac2bac"
          href="https://www.instagram.com/usei.lapaz/?fbclid=IwAR07aYlD7DflEtSJDuW6ERzw_r7DjawQAQVxbXcShM4RmZjLHQAUPensFyc"
          role="button"
          ><font-awesome-icon :icon="['fab', 'instagram']"
        /></a>
        <a
          class="link"
          style="background-color: #0082ca"
          href="https://www.linkedin.com/in/usei-la-paz-080327253/?originalSubdomain=bo"
          role="button"
          ><font-awesome-icon :icon="['fab', 'linkedin']"
        /></a>
        <a
          class="link"
          style="background-color: #333333"
          href="https://www.tiktok.com/@lacato._?is_from_webapp=1&sender_device=pc"
          role="button"
          ><font-awesome-icon :icon="['fab', 'tiktok']"
        /></a>
        </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
footer{
    background-color: #FDFEFF;
    box-shadow: 0 24px 64px -2px rgba(0, 0, 0, 0.02), 0 6px 16px -2px rgba(0, 0, 0, 0.06), 0 2px 6px -2px rgba(0, 0, 0, 0.08);
    padding: 1rem;
    border-radius: 5px;
    align-items: center;
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
/*Modo oscuro*/
.dark-theme footer{
    background-color: #434B54;
    box-shadow: 0 24px 64px -2px rgba(255, 255, 255, 0.02), 0 6px 16px -2px rgba(255, 255, 255, 0.06), 0 2px 6px -2px rgba(255, 255, 255, 0.08);
}
.container__logo__footer{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.container__logo__footer img{
  width: 150px;
  height: auto;
  transition: all 0.3s ease 0s;
}
.dark-theme .container__logo__footer img{
  filter: invert(20%) sepia(100%) saturate(100%) hue-rotate(220deg);
}
.container__logo__footer  img:hover{
  transform: scale(1.1);
}
.footer__links1{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;

}
.links__pack{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.link{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease 0s;
}

.link:hover{
  transform: scale(1.1);
}
.link svg{
  width: 20px;
  height: 20px;
  color: #fff;
}

@media (max-width: 700px) {
  footer{
    flex-direction: column-reverse;
  }
  .footer__links1{
    margin-top: 0.3rem;
  }
  img{
    width: 200px;
    height: auto;
  }
}
@media (max-width: 576px) {
  .footer__links1{
    margin-top: 0.2rem;
  }
}
@media (max-width: 430px) {
  .footer__links1{
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin-bottom: 0.5rem;
  }
  .footer__links1 .links__pack{
    margin-bottom: 0.5rem;
  }
}

</style>
