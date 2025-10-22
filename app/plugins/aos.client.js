import AOS from "aos";

export default defineNuxtPlugin(() => {
  if (process.client) {
    AOS.init({
      duration: 600,
      easing: "ease-out",
      once: true,  
      offset: 24,
    });
  }
});
