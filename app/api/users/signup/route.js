import { connect } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendVerifyEmail } from "@/helpers/verificationMailer";
import { v4 as uuidv4 } from "uuid";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const {
      fullname,
      gender,
      birthdate,
      nationalCode,
      email,
      username,
      password,
      country,
      phoneNumber,
      terms,
      signupGoogle,
      // ticketObj,
    } = reqBody;

    // check if user exist

    const hashedPass = uuidv4();

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        {
          message: "User already exist",
        },
        { status: 400 }
      );
    }
    const userName = await User.findOne({ username });

    if (userName) {
      return NextResponse.json(
        {
          message: "Username already exist",
        },
        { status: 401 }
      );
    }

    // hash Pass
    // const salt = await bcryptjs.genSalt(10);
    // const hashPass = await bcryptjs.hash(password, salt);

    //create new user

    const newUser = new User({
      fullname,
      gender,
      nationalCode,
      birthdate,
      email,
      username: username.toLowerCase(),
      password,
      country,
      phoneNumber,
      terms,
      signupGoogle,
      // ticketObj,
    });

    const savedUser = await newUser.save();
    console.log(user);
    //send verification Email
    await sendVerifyEmail({ email, userId: savedUser._id });

    return NextResponse.json({
      message: "user created successfully",
      success: true,
      savedUser,
    });
  } catch (err) {
    return NextResponse.json(
      {
        err: err.message,
      },
      { status: 500 }
    );
  }
}
