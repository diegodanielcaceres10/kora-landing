import { useCallback, useState } from "react";
import { registerAccount } from "../account.api";
import type { Account, RegisterAccountPayload } from "../account.types";
import { ApiError } from "../../../lib/http/httpClient";

type Status = "idle" | "loading" | "success" | "error";

export function useRegisterAccount() {
  const [status, setStatus] = useState<Status>("idle");
  const [account, setAccount] = useState<Account | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(async (payload: RegisterAccountPayload) => {
    setStatus("loading");
    setError(null);

    try {
      const created = await registerAccount(payload);
      setAccount(created);
      setStatus("success");
      return created;
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "No se pudo crear la cuenta";
      setError(message);
      setStatus("error");
      return null;
    }
  }, []);

  return { submit, status, account, error };
}
