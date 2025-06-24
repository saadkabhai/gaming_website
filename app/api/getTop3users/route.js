import { connectDB } from "@/Components/lib/dbConnect";
import { User } from "@/Components/models/User";

export async function GET() {
    await connectDB();
    const users = await User.find({ Status: 'A' })
        .sort({ Points: -1 }) // Descending order
        .limit(3);
    const simplifiedUsers = users.map(user => {
        return {
            Username: user.Username
        };
    });
    return Response.json({ Top3: simplifiedUsers });
}
