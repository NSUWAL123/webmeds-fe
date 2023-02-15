import { getTokenFromLocalStorage } from "./handleToken";

const token = getTokenFromLocalStorage();

export const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
  };