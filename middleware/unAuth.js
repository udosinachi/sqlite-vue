export default defineNuxtRouteMiddleware((to, from) => {
  const userCookie = useCookie("user");

  // If user details are present in cookies, redirect to the dashboard
  if (
    userCookie.value &&
    (to.path === "/" || to.path === "/login" || to.path === "/signup")
  ) {
    return navigateTo("/dashboard");
  }
});
