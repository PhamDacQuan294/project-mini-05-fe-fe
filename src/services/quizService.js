import { post } from "../utils/request";

export const createAnswer = async (options) => {
  const result = await post(`api/v1/answers/create`, options);
  return result;
}