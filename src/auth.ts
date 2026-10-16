import NextAuth from "next-auth";
import type { OAuthConfig } from "next-auth/providers";
import Discord from "next-auth/providers/discord";

type KickProfile = {
  user_id: number;
  name: string;
  email: string;
  profile_picture: string;
};

// Kick's public OAuth2 flow (docs.kick.com). No official NextAuth provider
// exists yet, so this is a hand-rolled config against their documented
// endpoints. Requires KICK_CLIENT_ID / KICK_CLIENT_SECRET once Kick issues
// an app from the developer portal.
const Kick: OAuthConfig<KickProfile> = {
  id: "kick",
  name: "Kick",
  type: "oauth",
  authorization: {
    url: "https://id.kick.com/oauth/authorize",
    params: { scope: "user:read" },
  },
  token: "https://id.kick.com/oauth/token",
  userinfo: {
    url: "https://api.kick.com/public/v1/users",
    async request({ tokens }: { tokens: { access_token?: string } }) {
      const res = await fetch("https://api.kick.com/public/v1/users", {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      });
      const json = await res.json();
      return json?.data?.[0] ?? {};
    },
  },
  checks: ["pkce", "state"],
  clientId: process.env.KICK_CLIENT_ID,
  clientSecret: process.env.KICK_CLIENT_SECRET,
  profile(profile) {
    return {
      id: String(profile.user_id),
      name: profile.name,
      email: profile.email,
      image: profile.profile_picture,
    };
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
    Kick,
  ],
  pages: {
    signIn: "/community",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider) {
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      if (token?.provider) {
        session.provider = token.provider as string;
      }
      return session;
    },
  },
});
