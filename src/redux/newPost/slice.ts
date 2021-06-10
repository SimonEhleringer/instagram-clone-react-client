import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const name = 'newPost';

export type NewPostState = {
  selectedImageDataUrl: SelectedImageDataUrl;
};

export const initialState: NewPostState = {
  selectedImageDataUrl: '',
};

const newPostSlice = createSlice({
  name,
  initialState,
  reducers: {
    setImage(state, action: PayloadAction<SelectedImageDataUrl>) {
      state.selectedImageDataUrl = action.payload;
    },
  },
});

export const { setImage } = newPostSlice.actions;

export const newPostReducer = newPostSlice.reducer;

export type SelectedImageDataUrl = string;
