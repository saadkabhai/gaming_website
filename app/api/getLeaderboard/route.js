import { connectDB } from "@/Components/lib/dbConnect";
import { User } from "@/Components/models/User";

export async function GET() {
    await connectDB();
    const users = await User.find({Status:'A'});
    const sortedUsers = users.sort((a, b) => b.Points - a.Points);
    const simplifiedUsers = sortedUsers.map(user => {
        return {
            Username: user.Username,
            Points: user.Points
        };
    });
    return Response.json({ Leaderboard: simplifiedUsers });
}
