export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validatePhone = (phone) => {
  return /^[0-9]{10}$/.test(phone);
};

export const validateAmount = (amount) => {
  return Number(amount) > 0;
};

export const validateAccount = (account) => {
  return /^[0-9]{8,18}$/.test(account);
};


