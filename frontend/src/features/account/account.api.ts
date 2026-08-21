import { httpClient } from "../../lib/http/httpClient";
import type {
  Account,
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
