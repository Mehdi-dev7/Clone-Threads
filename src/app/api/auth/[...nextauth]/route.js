import Credentials from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";

export const authOptions = {
	providers: [
		Credentials({
			name: "credentials",
			credentials: {},
			async authorize(credentials) {
				const { email, password } = credentials;
				try {
          // Cnnect to the Mongodb cluster
          const client = await MongoClient.connect(process.env.MONGODB_CLIENT);

          // Connect to the Mongodb database
          const db = client.db(process.env.MONGODB_DATABASE);

          // First: Get the user for this email
          // Select the "users" collection
          let user = await db.collection("users").find({ email }).limit(1).toArray();
          // If the email is not found
          if (user.length === 0) {
            await client.close();
            throw new Error("Cet utilisateur n'existe pas");
          }
          // Second: Verify the password
          const isPasswordValid = await bcrypt.compare(password, user[0].password);
          if (!isPasswordValid) {
            await client.close();
            throw new Error("Le mot de passe est invalide");
          }
          // Third: Our user is authenticated
          //Format user don't add sensitive data like a password !!!
          user = user.map(user => ({
            _id: user._id.toString(),  // Convert the _id to string
            username: user.username,
            pseudo: user.pseudo,
            email: user.email,
            profile: user.profile,
          }))[0]; // Get the first element of the array

          await client.close();
          return user;

				} catch (error) {
					throw new Error(error.message);
				}
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
	page: {
		signIn: "/login/signin",
	},
	callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token, user }) {
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };