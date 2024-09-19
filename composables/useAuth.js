import { mockRequest } from "~/utilis/mockApi";
import { useCookie } from "#app";

export const useAuth = () => {
  const login = async (emailAddress, password) => {
    try {
      const response = await mockRequest("/api/login", "POST", {
        emailAddress,
        password,
      });
      // console.log(response.data.message);
      const userCookie = useCookie("user");
      userCookie.value = response.data;

      return response.data;
    } catch (error) {
      console.error("Login error:", error.error);
      throw error;
    }
  };

  const signup = async (emailAddress, password, businessName) => {
    try {
      const response = await mockRequest("/api/signup", "POST", {
        emailAddress,
        businessName,
        password,
      });
      // console.log(response.data.message);
      const userCookie = useCookie("user");
      userCookie.value = response.data;
      // console.log(response.data, "dataaaaaaaa");

      return response.data;
    } catch (error) {
      console.error("Signup error:", error.error);
      throw error;
    }
  };

  return { login, signup };
};

export const useLogout = () => {
  const router = useRouter();

  const logout = () => {
    const userCookie = useCookie("user");
    userCookie.value = null;
    localStorage.removeItem("fileSubmitted");

    router.push("/");
  };

  return { logout };
};
