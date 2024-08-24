// Performer leaderboard api
import axiosInstance from "../../axiosInstance";

export const getData = () => {
    return axiosInstance
    .get("get/dashboard/data")
    .then((res) => {
        console.log(res.data.dashboard);
      return res.data.dashboard;
    })
    .catch((error) => {
      throw error;
    });
};