import { connectDB } from "@/Components/lib/dbConnect";
import { User } from "@/Components/models/User";

export async function GET(request) {
    const url = new URL(request.url);
    const Email = url.searchParams.get('Email');
    await connectDB();
    const user = await User.findOne({ Email: Email });
    if (user) {
        return Response.json({ Points: user.Points });
    } else {
        return Response.json({ Points: 0 });
    }
}
