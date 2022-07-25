import { User } from "@prisma/client";
import redisClient from "./redis.util";
import redisConfig from "@configs/redis.config";
import jwtConfig from "@configs/jwt.config";
import jwt from "jsonwebtoken";
import randToken from "rand-token";
import bcrypt from "bcryptjs";

const { constants, prefix } = redisConfig;

//  Generate tokens
export const generate = {
  accessToken: (user: User): string => {
    try {
      return jwt.sign(
        {
          id: user.id,
        },
        jwtConfig.secret,
        {
          expiresIn: jwtConfig.expiresIn,
        }
      );
    } catch (err: any) {
      throw new Error(err);
    }
  },

  refreshToken: async (user: User): Promise<string> => {
    try {
      const token = randToken.uid(constants.REFRESH_TOKEN_LENGTH);

      await redisClient.setEx(
        prefix.refreshToken(token),
        constants.REFRESH_TOKEN_DURATION,
        user.id
      );

      return token;
    } catch (err: any) {
      throw new Error(err);
    }
  },

  resetToken: async (email: string): Promise<string> => {
    try {
      const token = randToken.uid(constants.RESET_TOKEN_LENGTH);

      await Promise.all([
        redisClient.setEx(
          prefix.resetToken(token),
          constants.RESET_TOKEN_DURATION,
          email
        ),
        redisClient.setEx(
          prefix.resetUser(email),
          constants.RESET_USER_DURATION,
          "recent"
        ),
      ]);

      return token;
    } catch (err: any) {
      throw new Error(err);
    }
  },

  verifyToken: async (email: string): Promise<string> => {
    try {
      const token = randToken.uid(constants.VERIFY_TOKEN_LENGTH);

      await redisClient.setEx(
        prefix.verifyToken(token),
        constants.VERIFY_TOKEN_DURATION,
        email
      );

      return token;
    } catch (err: any) {
      throw new Error(err);
    }
  },
};

//  Read tokens
export const decode = {
  accessToken: async (token: string) => {
    try {
      return jwt.verify(token, jwtConfig.secret);
    } catch (err: any) {
      throw new Error(err);
    }
  },

  refreshToken: async (token: string): Promise<string | null> => {
    try {
      const userId = await redisClient.get(prefix.refreshToken(token));

      return userId;
    } catch (err: any) {
      throw new Error(err);
    }
  },

  resetToken: async (token: string): Promise<string | null> => {
    try {
      const email = await redisClient.get(prefix.resetToken(token));

      return email;
    } catch (err: any) {
      throw new Error(err);
    }
  },

  verifyToken: async (token: string): Promise<string | null> => {
    try {
      const email = await redisClient.get(prefix.verifyToken(token));

      return email;
    } catch (err: any) {
      throw new Error(err);
    }
  },
};

//  Validate tokens
export const validate = {
  accessToken: async (token: string): Promise<boolean> => {
    const accessTokens = await redisClient.lRange(
      constants.ACCESS_TOKENS,
      0,
      -1
    );
    if (accessTokens.includes(token)) {
      return false;
    }
    return true;
  },

  refreshToken: async (token: string): Promise<boolean> => {
    const refreshToken = await redisClient.get(prefix.refreshToken(token));
    if (refreshToken) {
      return true;
    }
    return false;
  },

  resetToken: async (email: string, token: string): Promise<boolean> => {
    try {
      const resetTokenData = await redisClient.get(prefix.resetToken(token));

      if (!resetTokenData) return false;

      if (resetTokenData.toLowerCase() === email.toLowerCase()) {
        return true;
      }
      return false;
    } catch (err: any) {
      throw new Error(err);
    }
  },

  // Check is a user requested a code less than 10 minutes ago
  resetUser: async (email: string): Promise<boolean> => {
    try {
      const resetUserData = await redisClient.exists(prefix.resetUser(email));

      if (!resetUserData) {
        return false;
      }
      return true;
    } catch (err: any) {
      throw new Error(err);
    }
  },

  // // Check is a user requested a code less than 15 minutes ago
  // verifyToken: async (token: string): Promise<boolean> => {
  //   try {
  //     const verifyTokenTTL = await redisClient.ttl(prefix.verifyToken(token));

  //     const resendTimeLimit =
  //       redisConfig.constants.VERIFY_TOKEN_DURATION * 0.25;

  //     const isReady = verifyTokenTTL <= resendTimeLimit;

  //     if (!verifyTokenTTL || !isReady) {
  //       return false;
  //     }
  //     return true;
  //   } catch (err: any) {
  //     throw new Error(err);
  //   }
  // },
};

//  Blacklist tokens
export const blacklist = {
  accessToken: async (token: string): Promise<void> => {
    try {
      await redisClient.lPush(constants.ACCESS_TOKENS, token);
    } catch (err: any) {
      throw new Error(err);
    }
  },

  refreshToken: async (token: string): Promise<void> => {
    try {
      await redisClient.del(prefix.refreshToken(token));
    } catch (err: any) {
      throw new Error(err);
    }
  },
};

//  Encrypt data
export const encrypt = {
  pin: async (pin: string): Promise<string> => {
    try {
      return await bcrypt.hash(pin, 10);
    } catch (err: any) {
      throw new Error(err);
    }
  },

  password: async (password: string): Promise<string> => {
    try {
      return await bcrypt.hash(password, 10);
    } catch (err: any) {
      throw new Error(err);
    }
  },
};

// Compare
export const compare = {
  password: async (
    password: string,
    hashedPassword: string
  ): Promise<boolean> => {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (err: any) {
      throw new Error(err);
    }
  },
};

const authUtil = {
  generate,
  validate,
  blacklist,
  decode,
  encrypt,
  compare,
};

export default authUtil;
