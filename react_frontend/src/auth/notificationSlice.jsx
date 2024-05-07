import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from 'nanoid';

const initialState = [];

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(stateType, requestStatus) {
        return {
          payload: {
            id: nanoid(), // Generate unique ID using nanoid
            stateType,
            requestStatus
          }
        };
      },
    }, 
    removeNotification: (state, action) => {
      return state.filter(notification => notification.id !== action.payload.id);
     
    },
  },
});

export const { addNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;