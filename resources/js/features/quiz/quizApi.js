//  crud the quiz data  by admin
import axiosInstance from "../../axiosInstance";

export const getQuizes = () => {
    return axiosInstance
    .get("quizes")
    .then((res) => {
      return res.data.quizes;
    })
    .catch((error) => {
      throw error;
    });
};

export const postQuiz = (formData) => {
    return axiosInstance
    .post("quizes",formData)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};
export const singleQuiz = (id) => {
    return axiosInstance
    .get(`quizes/${id}`)
    .then((res) => {
      return res.data.quizes;
    })
    .catch((error) => {
      throw error;
    });
};
export const getEditedQuiz = (id) => {
    return axiosInstance
    .get(`quizes/${id}/edit`)
    .then((res) => {
      return res.data.quizes;
    })
    .catch((error) => {
      throw error;
    });
};
export const getQuizAnalyz = (id) => {
    return axiosInstance
    .get(`quizes/analyz/quiz/${id}`)
    .then((res) => {
      console.log(res.data.quizes);
      
      return res.data.quizes;
    })
    .catch((error) => {
      throw error;
    });
};
export const getUpdateQuiz = (formData,id) => {
    return axiosInstance
    .put(`quizes/${id}`,{formData})
    .then((res) => {
      return res.data.quizes;
    })
    .catch((error) => {
      throw error;
    });
    
};
export const deleteQuize = (id) => {
    return axiosInstance
    .delete(`quizes/${id}`)
    .then((res) => {
      return id;
    })
    .catch((error) => {
      throw error;
    });
};
