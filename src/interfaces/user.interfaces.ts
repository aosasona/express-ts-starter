import { User } from "@prisma/client";

export interface IUserMail {
  email: string;
  name?: string;
  username?: string;
}

export interface IWallet {
  id: string;
  userId: string;
  balance: number;
  currency: string;
}

export interface IUserProfile extends User {
  wallet: IWallet[];
}

export interface IUserProfileResponse {
  id: string;
  username: string | null;
  country: string;
  isKYC: boolean;
  isVerified: boolean;
  isAdmin: boolean;
  createdAt: Date;
  wallet: {
    id: string;
    currency: string;
    balance: number;
  };
}

export interface IUsernameResponse {
  id: string;
  username: string | null;
  country: string;
  isKYC: boolean;
  isVerified: boolean;
  isAdmin: boolean;
  createdAt: Date;
}

export interface IUpdateData {
  username?: string;
  country?: string;
  email?: string;
  password?: string;
}
