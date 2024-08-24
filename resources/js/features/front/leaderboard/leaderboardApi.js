// Performer leaderboard api
import axiosInstance from "../../../axiosInstance";

export const getData = () => {
    return axiosInstance
    .get("get/leaderboards")
    .then((res) => {
      
      return res.data.leaderboards;
    })
    .catch((error) => {
      throw error;
    });
};