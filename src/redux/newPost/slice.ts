import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const name = 'newPost';

export type NewPostState = {
  selectedImageDataUri: SelectedImageDataUri;
};

export const initialState: NewPostState = {
  selectedImageDataUri: '',
};

const newPostSlice = createSlice({
  name,
  initialState,
  reducers: {
    setSelectedImageDataUri(
      state,
      action: PayloadAction<SelectedImageDataUri>
    ) {
      state.selectedImageDataUri = action.payload;
    },
  },
});

export const { setSelectedImageDataUri } = newPostSlice.actions;

export const newPostReducer = newPostSlice.reducer;

export type SelectedImageDataUri = string;
