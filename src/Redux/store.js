import {configureStore} from '@reduxjs/toolkit';
import trainReducer from './trainSlice';

export default configureStore({
       reducer: {
           train : trainReducer
       }
})