export function createTimeoutFetch(
  timeoutMs: number,
  fetchImpl: typeof fetch = globalThis.fetch,
): typeof fetch {
  return (input, init) => {
    const timeoutSignal = AbortSignal.timeout(timeoutMs)
    const signal = init?.signal
      ? AbortSignal.any([init.signal, timeoutSignal])
      : timeoutSignal

    return fetchImpl(input, { ...init, signal })
  }
}
