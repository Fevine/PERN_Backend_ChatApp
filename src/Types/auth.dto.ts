export type RegisterDto = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string | null;
}

export type LoginDto = {
  username: string;
  password: string;
}