import { connectDB } from "@/Components/lib/dbConnect";
import { User } from "@/Components/models/User";

export async function GET(request) {
    const url = new URL(request.url);
    const Username = url.searchParams.get('Username');
    if (Username) {
        await connectDB();
        const users = await User.find({ InvitedBy: Username, Status: 'A' });
        const simplifiedUsers = users.map(user => {
            const date = new Date(user.CreatedAt); // ✅ Correct key: "CreatedAt" not "CreatedAT"
            const formatted = `${date.toLocaleString('en-US', { month: 'short' })},${date.getDate()} ${date.getFullYear()}`;

            return {
                Username: user.Username,
                Color: user.Color,
                CreatedAt: formatted,
            };
        });
        return Response.json({ Reffrerrals: simplifiedUsers });
    } else {
        return Response.json({ message: 'No Username' });
    }
}
