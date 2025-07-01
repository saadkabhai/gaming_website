import { WebsiteURL } from '@/Components/BASEURL';
import { connectDB } from '@/Components/lib/dbConnect';
import { User } from '@/Components/models/User';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
function generateSixDigitCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ujkmuhj4@gmail.com',
        pass: 'pjyialiwgkfrrpzg',
    },
})
const profileColors = ['#2c3e50', '#34495e', '#6c5ce7', '#2d3436', '#1e272e', '#3c40c6', '#0a3d62', '#1e3799', '#2f3542', '#1b1464', '#353b48', '#2b2d42', '#3b3b98', '#2e294e', '#222f3e', '#4b4b4b', '#5f27cd', '#341f97', '#3d3d3d', '#2a2a72'];
function getRandomProfileColor() {
  return profileColors[Math.floor(Math.random() * profileColors.length)];
}
const allowedOrigin = WebsiteURL;
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': allowedOrigin,
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
export async function POST(req) {
    await connectDB();
    const { Email, Password, Ref, Username } = await req.json();
    const OtpCode = generateSixDigitCode()
    let mailOptions = {
        from: "Play2Win Team <support@play2win.com>",
        to: Email,
        subject: 'Your OTP',
        html: `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Play2Win OTP</title>
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
</head>
<body style="margin:0; padding:0; background-color:#ffe0ad; font-family:Arial, sans-serif; color:#24282d;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" 
         style="background-color:#ffe0ad; width:100%; border-collapse:collapse;">
    <tr>
      <td align="center" valign="top" style="padding:40px 10px; background-color:#ffe0ad; color:#24282d;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" 
               style="max-width:600px; background-color:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #ddd;">
          <tr>
            <td style="padding:30px 20px; text-align:center; background-color:#ffffff; color:#24282d;">
              <h2 style="margin:0; font-size:24px; color:#24282d;">Play2Win Security</h2>
              <p style="margin:8px 0 0; font-size:16px; color:#24282d;">Your One-Time Password (OTP)</p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:20px; background-color:#ffffff;">
              <div style="font-size:40px; font-weight:bold; letter-spacing:8px; background-color:#ffe0ad; color:#24282d; padding:15px 30px; border-radius:10px; display:inline-block;">
                ${OtpCode}
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 30px 10px 30px; text-align:center; background-color:#ffffff; color:#24282d;">
              <p style="font-size:16px; margin:0; color:#24282d;">
                Hello ${req.body.Username},<br><br>
                Use the above code to complete your verification. This OTP is valid for the next <strong style="color:#24282d;">10 minutes</strong>.<br><br>
                If you did not request this code, please ignore this email or contact our support team.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:30px 20px 20px; text-align:center; background-color:#ffffff;">
              <p style="font-size:14px; color:#555555; margin:0;">Thank you,<br>The Play2Win Team</p>
            </td>
          </tr>
        </table>

        <p style="font-size:12px; color:#777777; margin-top:20px; text-align:center; background-color:#ffe0ad;">
          This is an automated message. Please do not reply.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>



`
    };
    const Users = await User.find({})
    const checkemail = Users.find((item) => item.Email == Email)
    let checkUsername
    let unique = false
    let update = false
    if (checkemail) {
        if (checkemail.Status == 'UA') {
            const filterUsers = Users.filter((item) => item.Email !== Email)
            checkUsername = filterUsers.find((item) => item.Username == Username)
            if (!checkUsername) {
                unique = true
                update = true
            } else {
                return new NextResponse(JSON.stringify({
                    message: 'Username is already taken.',
                }), {
                    status: 400,
                    headers: {
                        'Access-Control-Allow-Origin': allowedOrigin,
                    },
                });
            }
        } else {
            return new NextResponse(JSON.stringify({
                message: 'Email is already taken.',
            }), {
                status: 400,
                headers: {
                    'Access-Control-Allow-Origin': allowedOrigin,
                },
            });
        }
    } else {
        checkUsername = Users.find((item) => item.Username == Username)
        if (!checkUsername) {
            unique = true
        } else {
            return new NextResponse(JSON.stringify({
                message: 'Username is already taken.',
            }), {
                status: 400,
                headers: {
                    'Access-Control-Allow-Origin': allowedOrigin,
                },
            });
        }
    }
    if (unique == true) {
        try {
            await transporter.sendMail(mailOptions);
        } catch (err) {
            console.log('Email error:', err);
            return new NextResponse(JSON.stringify({
                message: 'Enter Valid Email',
            }), {
                status: 400,
                headers: {
                    'Access-Control-Allow-Origin': allowedOrigin,
                },
            });
        }
        const newuser = {
            Username: Username,
            Email: Email,
            Password: Password,
            OTPCode: OtpCode,
            Status: 'UA',
            Color: getRandomProfileColor(),
            Points: 0,
            Money: 0,
            InvitedBy: Ref,
            CreatedAt: Date.now(),
            OTPCodeUpdate: Date.now(),
        }
        if (update) {
            await User.updateOne({ Email: Email }, { $set: newuser })
        } else {
            await User.create(newuser)
            Users.push(newuser)
        }
        return new NextResponse(JSON.stringify({
            message: 'User registered',
        }), {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': allowedOrigin,
            },
        });
    }
}