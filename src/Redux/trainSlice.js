import { createSlice } from '@reduxjs/toolkit';

const initialState = {
       trained : false,
       prediction : null,
       location : null
}

const trainSlice = createSlice({
       name : 'train',
       initialState,
       reducers : {
           setTrained : (state , action) => {
              state.trained = action.payload;
           },
           setPrediction : (state , action) => {
                 state.prediction = action.payload
           },
           setLocation : (state , action) => {
                  state.location = action.payload
           }
       }
});

export const { setTrained , setPrediction , setLocation } = trainSlice.actions;
export default trainSlice.reducer;