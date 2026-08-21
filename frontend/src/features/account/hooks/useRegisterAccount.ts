import { useCallback, useState } from "react";
import { registerAccount } from "../account.api";
import type { Account, RegisterAccountPayload } from "../account.types";
import { ApiError } from "../../../lib/http/httpClient";

type Status = "idle" | "loading" | "success" | "error";

function toErrorMessage(err: unknown): string {
  if (!(err instanceof ApiError)) return "No se pudo crear la cuenta";

  switch (err.code) {
    case "EMAIL_TAKEN":
      return "Ese email ya está registrado";
    case "VALIDATION_ERROR":
      return "Revisá los datos ingresados";
    default:
      return "No se pudo crear la cuenta, intentá de nuevo";
  }
}

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
      setError(toErrorMessage(err));
      setStatus("error");
      return null;
    }
  }, []);

  return { submit, status, account, error };
}
