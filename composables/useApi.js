export const useApi = (url, options = {}) => {
  const config = useRuntimeConfig()
  return useFetch(url, {
    method: 'get',
    baseURL: config.public.baseUrl,
    timeout: 10000,
    ...options,
  })
}