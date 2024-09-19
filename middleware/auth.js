export default defineNuxtRouteMiddleware((to, from) => {
  const userCookie = useCookie("user");

  // If user details are not present in cookies, redirect to login
  if (!userCookie.value) {
    return navigateTo("/login");
  }
});
