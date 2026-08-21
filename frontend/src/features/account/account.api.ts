import { httpClient } from "../../lib/http/httpClient";
import type {
  Account,
  ForgotPasswordPayload,
  LoginPayload,
  LoginResponse,
  RegisterAccountPayload,
} from "./account.types";

export function registerAccount(payload: RegisterAccountPayload) {
  return httpClient.post<Account>("/auth/register", payload);
}

export function loginAccount(payload: LoginPayload) {
  return httpClient.post<LoginResponse>("/auth/login", payload);
}

export function forgotPassword(payload: ForgotPasswordPayload) {
  return httpClient.post<{ message: string; code: string }>(
    "/auth/forgot-password",
    payload,
  );
}
