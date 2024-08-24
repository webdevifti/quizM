import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import quizSlice from './features/quiz/quizSlice';
import performerSlice from './features/performer/performerSlice';
import frontQuizSlice from './features/front/quiz/frontQuizSlice';
import leaderboardSlice from './features/front/leaderboard/leaderboardSlice';
import dashboardSlice from './features/dashboard/dashboardSlice';
import profileSlice from './features/profile/profileSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        quizes: quizSlice,
        performers: performerSlice,
        frontQuize: frontQuizSlice,
        leaderboards: leaderboardSlice,
        dashboard: dashboardSlice,
        profile: profileSlice
    },
});
