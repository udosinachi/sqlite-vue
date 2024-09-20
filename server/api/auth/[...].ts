import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      const isLogin = user ? true : false;
      if (isLogin) {
        token.id = user ? user.id || "" : "";
        token.email = user ? (user as any).email || "" : "";
        token.firstName = user ? (user as any).firstName || "" : "";
        token.lastName = user ? (user as any).lastName || "" : "";
        token.role = user ? (user as any).role || "" : "";
      }
      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      session.user = {
        ...session.user,
        ...token,
      };
      return Promise.resolve(session);
    },
  },
  providers: [
    CredentialsProvider.default({
      name: "Credentials",

      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: any) {
        let url = "http://localhost:3000/api/auth/login";
        let options = {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        };

        const resp = await fetch(url, options);
        if (!resp.ok) {
          throw new Error(`Login failed: ${resp.statusText}`);
        }

        const user = await resp.json();

        return user;
      },
    }),
  ],
});
