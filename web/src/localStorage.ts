import jwtDecode from "jwt-decode";

export type JWTPayload = {
  id: number;
  email: string;
  name: string;
  access_level_id: number;
};

export function getLocalStorage() {
  try {
    let token = localStorage.getItem("token");

    if (token) {
      let decode: JWTPayload = jwtDecode(token);
      console.log("decode:", decode);

      let user = {
        id: decode.id,
        email: decode.email,
        name: decode.name,
        access_level_id: decode.access_level_id,
      };
      return user;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export function clearLocalStorage() {
  localStorage.removeItem("token");
}
