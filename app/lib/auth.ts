import prisma from "@/prisma";
import GoogleProvider from "next-auth/providers/google";

// interface Credentials {
//     csrfToken: string
//     email: string
//     password: string
// }

// interface User {
//     id: string;
//     name: string | null;
//     email: string;
// }

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",

        }),
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ session, user }: any) {
          // Fetch the user from the database based on their email
          const dbUser = await prisma.user.findUnique({
            where: {
              email: session.user.email,
            },
          });
    
          if (dbUser) {
            session.user.id = dbUser.id; // Set the database user ID in the session
          }
    
          return session;
        },

        async signIn({ account, profile }: any) {

            if (account.provider == "google") {
                // console.log(account);
                // console.log(profile);
                try {
                  const existingUser = await prisma.user.findUnique({
                    where: {
                      email: profile.email,
                    },
                  });

                  if (existingUser) {
                    return true;
                  }

                  const newUser = await prisma.user.create({
                    data: {
                      email: profile.email,
                      name: profile.name,
                      imageUrl: profile.picture,
                      auth_type: "Google", // Set the auth_type to 'GOOGLE'
                    },
                  });

                  return true;
                } catch (error) {
                  console.error("Error creating user:", error);
                  return false;
                }
            }


            return true;
        },
    }
}
