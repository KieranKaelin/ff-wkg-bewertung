import * as jose from "jose";
import { LocalStorage } from "@/store/localStorage";

const alg = "RS256";

export const getSheetsAccessToken = async () => {
  const settings = LocalStorage.get();
  if (!settings) {
    throw new Error("settings is not defined");
  }

  const privateKey = await jose.importPKCS8(settings.privateKey, alg);

  const jwt = await new jose.SignJWT({
    scope: "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/spreadsheets": true,
  })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer(settings.serviceAccount)
    .setAudience("https://accounts.google.com/o/oauth2/token")
    .setExpirationTime("10m")
    .sign(privateKey);

  const { access_token } = await fetch(
    "https://accounts.google.com/o/oauth2/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwt,
      }),
    },
  ).then((response) => response.json());

  return access_token;
};
