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
    const { Email, Code, Password } = await req.json(),
        Users = await User.find({}),
        getuser = Users.find((item) => item.Email == Email)
    if (getuser) {
        let valid
        const date = new Date()
        const diffInMs = date - getuser.ChangePasswordCodeUpdate;
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        if (diffInMinutes > 10) {
            valid = false
        }
        if (valid == false) {
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
                Hello ${getuser.Username},<br><br>
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
            await User.updateOne({ Email: Email }, { $set: { ChangePasswordCodeUpdate: date, CPCode: OtpCode } })
            return new NextResponse(JSON.stringify({
                message: 'A new OTP has been sent because the previous one expired.', Email: Email
            }), {
                status: 400,
                headers: {
                    'Access-Control-Allow-Origin': allowedOrigin,
                },
            });
        } else {
            if (Code == getuser.CPCode) {
                await User.updateOne({ Email: Email }, { $set: { CPCode: 0, Password: Password } })
                return new NextResponse(JSON.stringify({
                    message: 'Login to continue.',
                }), {
                    status: 200,
                    headers: {
                        'Access-Control-Allow-Origin': allowedOrigin,
                    },
                });
            } else {
                return new NextResponse(JSON.stringify({
                    message: 'Invalid.',
                }), {
                    status: 400,
                    headers: {
                        'Access-Control-Allow-Origin': allowedOrigin,
                    },
                });
            }
        }
    } else {
        return new NextResponse(JSON.stringify({
            message: 'The email you entered is not associated with any account.',
        }), {
            status: 400,
            headers: {
                'Access-Control-Allow-Origin': allowedOrigin,
            },
        });
    }
}