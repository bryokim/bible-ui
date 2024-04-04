import VueCountdown from "@chenfengyuan/vue-countdown";

export default defineNuxtPlugin((app) => {
  // @ts-expect-error
  app.vueApp.component(VueCountdown.name, VueCountdown);
});
