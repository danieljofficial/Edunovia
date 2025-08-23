import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "../../infrastructure/database/prisma";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "/auth/google/callback",
      // passReqToCallback: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find or create user in DB
        // const email: string = profile.emails && profile.emails?.length > 0 ? profile.emails[0].value : null
        // const userType: string = req.query.type || "STUDENT";
        let user = await prisma.user.findUnique({
          where: { email: profile.emails![0].value },
          // where: {email: email},
        });
        if (!user) {
          user = await prisma.user.create({
            data: {
              email: profile.emails![0].value,
              username: profile.displayName,
              password: "", // No password for OAuth users
              role: "STUDENT", // Default role, adjust as needed
              isVerified: true,
            },
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

export default passport;
