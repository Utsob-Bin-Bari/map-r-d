export const isPasswordValid = (password: string): boolean =>
  password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);

export const doPasswordsMatch = (
  password: string,
  confirmPassword: string
): boolean => password === confirmPassword && password.length > 0;

export const canResetPassword = (
  password: string,
  confirmPassword: string
): boolean => isPasswordValid(password) && doPasswordsMatch(password, confirmPassword);
