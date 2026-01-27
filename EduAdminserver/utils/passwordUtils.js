import { hash, compare, genSalt } from "bcrypt";

const genPasswordHash = async (password) => {
  const salt = await genSalt();
  const hashedPassword = await hash(password, salt);
  console.log("🚀 ~ genPasswordHash ~ hashedPassword:", hashedPassword);
  return hashedPassword;
};

const verifyPassword = (password, pwdHash) => {
  return compare(password, pwdHash);
};

export { genPasswordHash, verifyPassword };