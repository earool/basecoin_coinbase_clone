export function validateName(value) {
  return value.trim() !== '';
}

export function validatePassword(value) {
  // minimum 8 chars, min 1 digit and letter, only digits and letters
  const regex = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{6,}$/;
  return regex.test(value);
}

export function validateEmail(value) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
}
