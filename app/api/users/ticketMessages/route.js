import { connect } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

connect();

export async function PATCH(request, response) {
  try {
    const reqBody = await request.json();
    const { ticketId, userId, ticketMessage } = reqBody;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      // User not found
      return response.json({ message: "User not found" }, { status: 401 });
    }

    const ticket = user.ticketObj.find(
      (ticket) => ticket.ticketId === ticketId
    );

    if (!ticket) {
      // Ticket not found
      return response.json({ message: "Ticket not found" }, { status: 408 });
    }

    await User.updateOne(
      { _id: userId, "ticketObj.ticketId": ticketId },
      {
        $push: {
          "ticketObj.$.ticketMessage": {
            message: ticketMessage,
            date: new Date().toLocaleString(),
          },
        },
      }
    );

    const ticketMessages = user.ticketObj
      .map((item) => item.ticketMessage)
      .flat();
    console.log(ticketMessages);

    return NextResponse.json({
      message: "Message updated successfully",
      success: true,
      messages: ticketMessages,
    });
  } catch (err) {
    return response.json(
      { err: err.message || "An error occurred" }

      //{ status: 500 }
    );
  }
}
