import {  get } from "../utils/request";

export const getListQuestion = async (topicId) => {
  const result = await get(`api/v1/questions?topicId=${topicId}`);
  return result;
}
