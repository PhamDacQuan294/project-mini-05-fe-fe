import { post } from "../utils/request";

export const login = async (options) => {
  const result = await post(`api/v1/users/login`, options);
  return result;
}

export const register = async (options) => {
  const result = await post(`api/v1/users/register`, options);
  return result;
}
