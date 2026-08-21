const API_URL = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly body: unknown;

  constructor(status: number, message: string, code: string | undefined, body: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.body = body;
  }
}

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

async function request<TResponse>(
  path: string,
  { body, headers, ...options }: RequestOptions = {},
): Promise<TResponse> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");
  const data = isJson ? await response.json() : undefined;

  if (!response.ok) {
    const errorBody =
      data && typeof data === "object" ? (data as Record<string, unknown>) : undefined;
    const message =
      (errorBody?.message ? String(errorBody.message) : undefined) ??
      `Request failed with status ${response.status}`;
    const code = errorBody?.code ? String(errorBody.code) : undefined;
    throw new ApiError(response.status, message, code, data);
  }

  return data as TResponse;
}

export const httpClient = {
  post: <TResponse>(path: string, body?: unknown, options?: RequestOptions) =>
    request<TResponse>(path, { ...options, method: "POST", body }),
};
