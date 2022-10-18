export function isMock() {
  return import.meta.env.VITE_USE_MOCK === 'true';
}

export function isDev() {
  return import.meta.env.MODE === 'development';
}

export function isProd() {
  return import.meta.env.MODE === 'production';
}
