export interface RegisterAccountPayload {
  email: string;
  name: string;
  lastname: string;
}

export interface Account {
  id: string;
  email: string;
  name: string;
  lastname: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  account: Account;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface SetPasswordPayload {
  token: string;
  password: string;
}
