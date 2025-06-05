import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";
import { Account } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

const authOptions: AuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER_BASE_URL!,
      authorization: {
        params: {
          scope: "openid email profile",
          audience: process.env.AUTH0_AUDIENCE || undefined,
        },
      },
      profile(profile) {
        // Auth0'dan gelen rol bilgilerini kontrol et
        let userRole = "user"; // Default rol

        // Farklı namespace'leri dene
        const possibleRoleFields = [
          `https://myapp.com/roles`,
          "https://example.com/roles",
          "roles",
          "user_roles",
        ];

        for (const field of possibleRoleFields) {
          const roles = profile[field];
          if (roles && Array.isArray(roles) && roles.length > 0) {
            userRole = roles[0];
            break;
          }
        }

        // App metadata kontrolü
        if (userRole === "user" && profile.app_metadata?.roles) {
          userRole = profile.app_metadata.roles[0] || "user";
        }

        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: userRole,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user?: User;
      account?: Account | null;
    }) {
      // İlk giriş sırasında user bilgilerini token'a ekle
      if (account && user) {
        token.accessToken = account.access_token;
        token.role = (user as User & { role: string }).role || "user";
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // Token'dan session'a bilgileri aktar
      if (token) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 gün
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60, // 30 gün
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
