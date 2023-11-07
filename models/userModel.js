import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    // required: [true, "username is required"],
  },
  username: {
    type: String,
    // required: [true, "username is required"],
    // unique: true,
  },
  email: {
    type: String,
    // required: [true, "email is required"],
    // unique: true,
  },
  password: {
    type: String,
    // required: [true, "password is required"],
    // minlength: [8, "password must be at least 8 characters"],
  },

  nationalCode: {
    type: String,
    // require: [true, "nationalCode is required"],
    // unique: true,
  },

  birthdate: {
    type: Date || null,
    // required: [true, "birthdate is required"],
  },
  gender: {
    type: String,
    // required: [true, "gender is required"],
  },

  country: {
    type: String,
    // required: [true, "country is required"],
  },
  phoneNumber: {
    type: String,
    // required: [true, "phoneNumber is required"],
  },
  terms: {
    type: Boolean,
    // required: [true, "terms is required"],
    default: false,
  },
  signupGoogle: {
    type: Boolean,
    default: false,
  },
  ticketObj: {
    type: [Object],
    
    default: [],
    // ticket: {
    //   subject: String,
    //   message: {
    //     type: [String],
    //     default: [],
    //   },
    // },
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  Role: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
