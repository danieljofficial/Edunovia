import passport, { Profile } from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "../../infrastructure/database/prisma";
import dotenv from "dotenv";
import { tokenService } from "./tokenService";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL || "/api/auth/google/callback",
      passReqToCallback: true,
    },
    async (
      req,
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done
    ) => {
      try {
        const state: any = req.query.state as string;
        const allowedRoles = ["STUDENT", "PARENT", "TEACHER", "ADMIN"];
        const userType = allowedRoles.includes(state) ? state : "STUDENT";
        console.log("OAuth Callback State:", req.query.state);
        console.log("Request Query:", req.query);

        let token;
        let user = await prisma.user.findUnique({
          where: { email: profile.emails![0].value },
        });
        if (!user) {
          user = await prisma.user.create({
            data: {
              email: profile.emails![0].value,
              username: profile.displayName,
              password: "",
              role: userType,
              isVerified: true,
            },
          });
          token = tokenService.generateToken(
            {
              id: user.id,
              email: user.email,
              role: user.role,
            },
            "1h"
          );
          // const { password: _, ...newUser } = user;
          return { user: user, token: token };
        }
        return done(null, user, token);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

export default passport;
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
