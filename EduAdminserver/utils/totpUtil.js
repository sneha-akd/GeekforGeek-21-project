import { generateSecret, otpauthURL, totp } from "speakeasy";
import { toDataURL } from "qrcode";

const encoding = "base32";

const generateQRcode = async (username) => {
  const { base32: secret } = generateSecret();
  const url = otpauthURL({
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
  const verified = totp.verify({
    secret,
    encoding,
    token,
  });
  return verified;
};

export default { generateQRcode, verifyOTP };