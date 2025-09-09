import {  get } from "../utils/request";

export const getListTopic = async () => {
  const result = await get(`api/v1/topics`);
  return result;
}

export const getTopic = async (id) => {
  const result = await get(`topics/${id}`);
  return result;
}