/** Every failure the SDK surfaces: a human message plus an optional machine code. */
export class SuiteError extends Error {
  constructor(
    message: string,
    readonly code?: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "SuiteError";
  }
}

/** Read a suite error body: `{message, code?}` (older routes used `{error}`). */
export async function toSuiteError(res: Response): Promise<SuiteError> {
  let body: { message?: string; error?: string; code?: string } | null = null;
  try {
    body = await res.json();
  } catch {
    // not JSON
  }
  return new SuiteError(
    body?.message ?? body?.error ?? `Request failed (${res.status})`,
    body?.code,
    res.status,
  );
}
