// Fetch the user/performers data and delete apis by admin 
import axiosInstance from "../../axiosInstance";

//  get user/performers list  - admin
export const getPerformers = () => {
    return axiosInstance
    .get("performers")
    .then((res) => {
      return res.data.performers;
    })
    .catch((error) => {
      throw error;
    });
};

// delete a user/perfomers - admin
export const removePerformer = (id) => {
    return axiosInstance
    .delete(`performers/${id}`)
    .then((res) => {
      return id;
    })
    .catch((error) => {
      throw error;
    });
};