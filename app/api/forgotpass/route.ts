import { NextRequest, NextResponse } from "next/server";
import { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { clientPromise } from "../mongodb";
import { isValidEmail } from "../auth/login/email/functions";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if(!isValidEmail(email)){
    return NextResponse.json({error:"Invalid Email address"})
  }
  const transport = createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_PASS,
    },
  });
  const client = await clientPromise;
  const db = client.db("BusinessManager");
  const users = db.collection("users");
  const tokens = db.collection("tokensTemp");
  const user = await users.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "User Not Found" });
  }
  if(!user.hashedPassword){
    return NextResponse.json({ error: "User Not Created with email" });
  }
  const token = tokenGen(7);
  const name = user.name as string;
  const userId = user._id;
  const expires = Date.now() + (10 * 60 * 1000)
  tokens.insertOne({token, userId, expires})
  const mailOpt: Mail.Options = {
    from: process.env.GMAIL,
    to: email,
    subject: "Reset Password",
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f7f7f7;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border: 1px solid #dddddd;
                border-radius: 8px;
                overflow: hidden;
            }
            .header {
                background-color: #007BFF;
                color: #ffffff;
                padding: 20px;
                text-align: center;
            }
            .content {
                padding: 20px;
            }
            .footer {
                background-color: #f1f1f1;
                color: #666666;
                text-align: center;
                padding: 10px;
                font-size: 12px;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                margin: 20px 0;
                color: #ffffff;
                background-color: #007BFF;
                border-radius: 5px;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Password Reset</h1>
            </div>
            <div class="content">
                <p>Dear ${name},</p>
                <p>You requested a password reset. Please use the following token to reset your password:</p>
                <p><strong>${token}</strong></p>
                <p>If you did not request this, please ignore this email.</p>
                <a href="http://localhost:3000/reset-password?token=${token}" class="button">Reset Password</a>
            </div>
            <div class="footer">
                <p>© 2024 BusinessManager. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>`,
  };
  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOpt, function (err) {
        if (!err) {
          resolve('Email sent');
        } else {
          reject(err.message);
        }
      });
    });
    try {
        await sendMailPromise()
        return NextResponse.json({})
    } catch (e:any) {
        return NextResponse.json({error: e.message})
    }
}

function tokenGen(size: number) {
  const tokens =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_&?$%- ";
  let token = "";
  for (let i = 0; i < size; i++) {
    token += tokens.charAt(Math.floor(Math.random() * tokens.length));
  }
  return token;
}
