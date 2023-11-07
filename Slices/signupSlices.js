import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  signupFullname: "",
  signupGender: "",
  signupNationalCode: "",
  signupBirthdate: null,
  signupEmail: "",
  signupUsername: "",
  signupPassword: "",
  signupPasswordConfirm: "",
  signupCountry: "",
  signupPhoneNumber: "",
  signupTerms: false,
  signupGoogle: false,
  signupGoogleToken: "",
};

export const signupHandler = createAsyncThunk(
  "signup/signupHandler",
  async (e, { dispatch, getState }) => {
    e.preventDefault();

    const {
      signupFullname,
      signupGender,
      signupNationalCode,
      signupBirthdate,
      signupEmail,
      signupUsername,
      signupPassword,
      signupCountry,
      signupPhoneNumber,
      signupTerms,
    } = getState().signup;

    const user = {
      signupFullname,
      signupGender,
      signupNationalCode,
      signupBirthdate,
      signupEmail,
      signupUsername,
      signupPassword,
      signupCountry,
      signupPhoneNumber,
      signupTerms,
    };

    try {
      const response = await axios.post("/api/users/signup", user);
      console.log(response.data, "signup success");
      dispatch(ResetSignupHandler());
      dispatch(RsetFormErrors(""));
      router.push("/login");
    } catch (err) {
      //err.response is how to make the message from the api
      // toast.error(err.response.data.message);
      if (err.response.status === 400) {
        toast.error(t("SignupEmailExist"));
      }
      if (err.response.status === 401) {
        toast.error(t("SignupUsernameExist"));
      }
      console.log(err.message, "signup failed");
    }
  }
);
export const ResetSignupHandler = createAsyncThunk(
  "signup/ResetSignupHandler",
  (obj, { dispatch, getState }) => {
    dispatch(RsetSignupFullname(""));
    dispatch(RsetSignupGender(""));
    dispatch(RsetSignupNationalCode(""));
    dispatch(RsetSignupBirthdate(null));
    dispatch(RsetSignupEmail(""));
    dispatch(RsetSignupUsername(""));
    dispatch(RsetSignupPassword(""));
    dispatch(RsetSignupPasswordConfirm(""));
    dispatch(RsetSignupCountry(""));
    dispatch(RsetSignupPhoneNumber(""));
    dispatch(RsetSignupTerms(false));
  }
);

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    RsetSignupFullname: (state, action) => {
      return { ...state, signupFullname: action.payload };
    },
    RsetSignupGender: (state, action) => {
      return { ...state, signupGender: action.payload };
    },
    RsetSignupNationalCode: (state, action) => {
      return { ...state, signupNationalCode: action.payload };
    },
    RsetSignupBirthdate: (state, action) => {
      return { ...state, signupBirthdate: action.payload };
    },
    RsetSignupEmail: (state, action) => {
      return { ...state, signupEmail: action.payload };
    },
    RsetSignupUsername: (state, action) => {
      return { ...state, signupUsername: action.payload };
    },
    RsetSignupPassword: (state, action) => {
      return { ...state, signupPassword: action.payload };
    },
    RsetSignupPasswordConfirm: (state, action) => {
      return { ...state, signupPasswordConfirm: action.payload };
    },
    RsetSignupCountry: (state, action) => {
      return { ...state, signupCountry: action.payload };
    },
    RsetSignupPhoneNumber: (state, action) => {
      return { ...state, signupPhoneNumber: action.payload };
    },
    RsetSignupTerms: (state, action) => {
      return { ...state, signupTerms: action.payload };
    },
    RsetSignupGoogle: (state, action) => {
      return { ...state, signupGoogle: action.payload };
    },
    RsetSignupGoogleToken: (state, action) => {
      return { ...state, signupGoogleToken: action.payload };
    },
  },
});

export const {
  RsetSignupFullname,
  RsetSignupGender,
  RsetSignupNationalCode,
  RsetSignupBirthdate,
  RsetSignupEmail,
  RsetSignupUsername,
  RsetSignupPassword,
  RsetSignupPasswordConfirm,
  RsetSignupCountry,
  RsetSignupPhoneNumber,
  RsetSignupTerms,
  RsetSignupGoogle,
  RsetSignupGoogleToken,
} = signupSlice.actions;

export const selectSignupFullname = (state) => state.signup.signupFullname;
export const selectSignupGender = (state) => state.signup.signupGender;
export const selectSignupNationalCode = (state) =>
  state.signup.signupNationalCode;
export const selectSignupBirthdate = (state) => state.signup.signupBirthdate;
export const selectSignupEmail = (state) => state.signup.signupEmail;
export const selectSignupUsername = (state) => state.signup.signupUsername;
export const selectSignupPassword = (state) => state.signup.signupPassword;
export const selectSignupPasswordConfirm = (state) =>
  state.signup.signupPasswordConfirm;
export const selectSignupCountry = (state) => state.signup.signupCountry;
export const selectSignupPhoneNumber = (state) =>
  state.signup.signupPhoneNumber;
export const selectSignupTerms = (state) => state.signup.signupTerms;
export const selectSignupGoogle = (state) => state.signup.signupGoogle;
export const selectSignupGoogleToken = (state) =>
  state.signup.signupGoogleToken;

export default signupSlice.reducer;
