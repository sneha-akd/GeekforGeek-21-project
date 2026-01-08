import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  wishlistCourse: [],
  cartCourses: [],
};

export const geeksSlice = createSlice({
  name: "geeks",
  initialState,
  reducers: {
    setCoursedata: (state, action) => {
      state.courses = action.payload;
    },
    addToWishlistCourse: (state, action) => {
      const courseIndex = state.wishlistCourse.findIndex(
        (data) => data.id === Number(action.payload)
      );
      if (courseIndex !== -1) return;
      const course = state.courses.find(
        (data) => data.id === Number(action.payload)
      );

      if (course) {
        state.wishlistCourse.push(course);
      }
    },
    removeFromWishlistCourse: (state, action) => {
      const courseIndex = state.wishlistCourse.findIndex(
        (data) => data.id === Number(action.payload)
      );
      if (courseIndex === -1) return;
      state.wishlistCourse.splice(courseIndex, 1);
    },
    addToCartCourse: (state, action) => {
      const courseIndex = state.cartCourses.findIndex(
        (data) => data.id === Number(action.payload)
      );
      if (courseIndex !== -1) return;
      const course = state.courses.find(
        (data) => data.id === Number(action.payload)
      );

      if (course) {
        state.cartCourses.push(course);
      }
    },
    removeFromCartCourse: (state, action) => {
      const courseIndex = state.cartCourses.findIndex(
        (data) => data.id === Number(action.payload)
      );
      if (courseIndex === -1) return;
      state.cartCourses.splice(courseIndex, 1);
    },
  },
});

export const {
  setCoursedata,
  addToWishlistCourse,
  removeFromWishlistCourse,
  addToCartCourse,
  removeFromCartCourse,
} = geeksSlice.actions;

export default geeksSlice.reducer;