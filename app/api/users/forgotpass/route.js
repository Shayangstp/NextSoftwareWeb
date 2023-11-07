import { connect } from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendForgotPassEmail } from "@/helpers/forgotPassMailer";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    await sendForgotPassEmail({ email, userId: user._id });

    return NextResponse.json({
      message: "ForgotEmail send successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
