import * as speakeasy from 'speakeasy';
import { toDataURL } from "qrcode";

const encoding = "base32";

const generateQRcode = async (username) => {
  const { base32: secret } = speakeasy.generateSecret();
  const url = speakeasy.otpauthURL({
    secret,
    label: username,
    issuer: "EduAdmin",
    encoding,
  });
  console.log("🚀 ~ generateQRcode ~ url:", url);
  const qrCodeImage = await toDataURL(url);

  return { secret, qrCodeImage };
};

const verifyOTP = (token, secret) => {
  const verified = speakeasy.totp.verify({
    secret,
    encoding,
    token,
  });
  return verified;
};

export { generateQRcode, verifyOTP };