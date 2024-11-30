import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import client from './lib/db';

export const authOptions = {
  adapter: MongoDBAdapter(client),
  providers: [Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
    id: 'google'
  })],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
  }
}
export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
