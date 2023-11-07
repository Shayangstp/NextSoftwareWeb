import { connect } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

connect();

export async function POST(request, res) {
  try {
    const reqBody = await request.json();
    const { email, ticket } = reqBody;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 401 }
      );
    }

    user.ticketObj.push(ticket);

    console.log(user);
    console.log(ticket);
    await user.save();

    const response = NextResponse.json({
      message: "User updated successfully",
      success: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message } /*, { status: 500 }*/);
  }
}
