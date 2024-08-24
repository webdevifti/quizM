//  Performer Quiz Apis
import axiosInstance from "../../../axiosInstance";

export const getData = (user_id) => {
    return axiosInstance
    .get(`get/quizes/${user_id}`)
    .then((res) => {
      return res.data.quizes;
    })
    .catch((error) => {
      throw error;
    });
};

export const quiz = ({id,userID}) => {
    return axiosInstance
    .get(`get/quiz/${id}/${userID}`,)
    .then((res) => {
      return res.data.quizes;
    })
    .catch((error) => {
      throw error;
    });
};

export const submitQuiz = ({formData,userID}) => {
    return axiosInstance
    .post("submit/quiz",{...formData,user_id:userID})
    .then((res) => {
      console.log(res.data);
      
      return res.data.quizes;
    })
    .catch((error) => {
      throw error;
    });
};