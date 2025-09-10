export interface IPasswordResetToken {
  token: string;
  userId: string;
  expiresAt: Date;
  used: boolean;
}

export interface IPasswordResetRequest {
  email: string;
}

export interface IPasswordResetExecution {
  token: string;
  newPassword: string;
}
