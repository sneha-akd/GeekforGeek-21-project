import { hash, compare, genSalt } from "bcrypt";

export const genPasswordHash = async (password) => {
  const salt = await genSalt();
  const hashedPassword = await hash(password, salt);
  console.log("🚀 ~ genPasswordHash ~ hashedPassword:", hashedPassword);
  return hashedPassword;
};

export const verifyPassword = (password, pwdHash) => {
  return compare(password, pwdHash);
};

