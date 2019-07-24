import {
  getMomDiariesAPI,
  addMomDiariesAPI,
  getOneMomDiaryAPI,
  updateMomDiaryAPI,
  removeMomDiaryAPI
} from "./apiList";
import axios from "axios";

export const getMomDiaries = async user => {
  const res = await axios.get(getMomDiariesAPI(user));
  return res;
};

export const addMomDiaries = async data => {
  const res = await axios.post(addMomDiariesAPI(), data);
  return res;
};

export const getOneMomDiary = async (_id) => {
  const res = await axios.get(getOneMomDiaryAPI(_id));
  return res;
};

export const updateMomDiary = async (data, _id) => {
  const res = await axios.put(updateMomDiaryAPI(_id), data);
  return res;
};

export const removeMomDiary = async _id => {
  const res = await axios.delete(removeMomDiaryAPI(_id));
  return res;
};
