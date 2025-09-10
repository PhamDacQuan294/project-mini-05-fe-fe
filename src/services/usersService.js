import { get, post } from "../utils/request";

export const login = async (options) => {
  const result = await post(`api/v1/users/login`, options);
  return result;
}

export const register = async (options) => {
  const result = await post(`api/v1/users/register`, options);
  return result;
}

export const logout = async () => {
  const result = await get("api/v1/users/logout");
  return result;
}