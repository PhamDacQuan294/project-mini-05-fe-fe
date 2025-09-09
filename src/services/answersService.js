import {  get } from "../utils/request";
import { getCookie } from "../helpers/cookie";

export const getAnswersByUserId = async () => {
  const userId = getCookie("id");
  const result = await get(`api/v1/answers?userId=${userId}`);
  return result;
}

export const getAnswer = async (id) => {
  const result = await get(`api/v1/answers/${id}`);
  return result;
}