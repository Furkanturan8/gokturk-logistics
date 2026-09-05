export function useBaseUrl(path: string) {
  const { app } = useRuntimeConfig()
  return app.baseURL.replace(/\/$/, '') + path
}
