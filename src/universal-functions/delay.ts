// Эта функция-промис используется для разных алгоритмов
export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};