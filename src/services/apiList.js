import baseURL from "../config";
export const getMomDiariesAPI = () => baseURL + `users/momdiary`;
export const addMomDiariesAPI= () => baseURL + `users/momdiary`;
export const getOneMomDiaryAPI = (diaryId) => baseURL + `users/momdiary/${diaryId}`;
export const updateMomDiaryAPI = (diaryId) => baseURL + `users/momdiary/${diaryId}`;
export const removeMomDiaryAPI = (diaryId) => baseURL + `users/momdiary/${diaryId}`;
