import { httpClient } from "../../lib/http/httpClient";
import type { Account, RegisterAccountPayload } from "./account.types";

export function registerAccount(payload: RegisterAccountPayload) {
  return httpClient.post<Account>("/auth/register", payload);
}
