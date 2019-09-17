export const decodeBase64 = (input: string): string => {
  try {
    return window.atob(input);
  } catch (error) {
    return null;
  }
};
