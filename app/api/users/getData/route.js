import { connect } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

connect();

export async function GET(request, response) {
  try {
    const { nextUrl } = request;
    const params = nextUrl.search.replace("?userEmail=", "");

    const user = await User.findOne({ email: params });
   
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json(
      {
        err: (err.message, "this is error"),
      },
      { status: 500 }
    );
  }
}
