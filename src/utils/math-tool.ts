/* eslint-disable import/prefer-default-export */

export const getPrimes = (maxRange: number): number[] =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  [...Array(maxRange + 1).keys()].slice(2).filter((n): boolean => {
    for (let i = 2; i < n; i += 1) {
      if (n % i === 0) return false;
    }

    return true;
  });
