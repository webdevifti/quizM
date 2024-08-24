import axiosInstance from "../../axiosInstance";

export const getData = (user_id) => {
    return axiosInstance
    .get(`profile/${user_id}`)
    .then((res) => {
      return res.data.profile;
    })
    .catch((error) => {
      throw error;
    });
};