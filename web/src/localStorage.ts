import jwtDecode from "jwt-decode";

export type JWTPayload = {
  id: number;
  email: string;
  access_level_id: number;
};

export function getLocalStorage() {
  try {
    let token = localStorage.getItem("token");

    if (token) {
      let decode: JWTPayload = jwtDecode(token);
      let user = {
        id: decode.id,
        email: decode.email,
        access_level_id: decode.access_level_id,
        token: token,
      };
      return user;
    }
  } catch (error) {
    return null;
  }

  return null;
}

export function clearLocalStorage() {
  localStorage.removeItem("token");
}
