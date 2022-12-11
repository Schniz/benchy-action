export function groupBy<T, K extends keyof T>(array: T[], key: K) {
  const result = {} as Record<Extract<T[K], string>, T[]>;
  for (const item of array) {
    const value = item[key] as Extract<T[K], string>;
    if (!result[value]) {
      result[value] = [];
    }
    result[value].push(item);
  }
  return result;
}

export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    result[key] = obj[key];
  }
  return result;
}
