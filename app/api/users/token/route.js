import { connect } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

connect();

export async function GET(request, response) {
  try {
    const token = request.cookies.get("token");

    //how verify the token on the backend
    // jwt.verify(token , process.env.TOKEN_SECRET)
    //also you can handle the show pass or not with .select(-password)

    return NextResponse.json(
      {
        success: true,
        tokenStored: token ? token : "",
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        err: (err.message, "this is error"),
      },
      { status: 500 }
    );
  }
}
