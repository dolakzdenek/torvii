import { storage } from "../../App";

export function getWallet(wallet = "wallet") {
  return null;
  try {
    return JSON.parse(storage?.getString(wallet));
  } catch (error) {
    console.error(error);
    return null;
  }
}
