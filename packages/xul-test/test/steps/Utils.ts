export const sameString = (s1: string, s2: string): boolean => {
  if (s1 === undefined || s2 === undefined) return s1 === s2;
  return s1.trim().toLowerCase() === s2.trim().toLowerCase();
};
