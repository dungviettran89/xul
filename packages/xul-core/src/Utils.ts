export const safeInvoke = async (callable?: () => any): Promise<void> => {
  if (callable === undefined) {
    return;
  }
  const promiseLike: Promise<any> = Promise.resolve(callable());
  if (promiseLike) {
    await promiseLike;
  }
};
