export function isMock() {
  return import.meta.env.MODE === 'mock';
}

export function isDev() {
  return import.meta.env.MODE === 'development';
}

export function isProd() {
  return import.meta.env.MODE === 'production';
}
