import { WebsiteURL } from "@/Components/BASEURL";
import { connectDB } from "@/Components/lib/dbConnect";
import { User } from "@/Components/models/User";

const allowedOrigin = WebsiteURL; // or your frontend domain

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': allowedOrigin,
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Credentials': 'true',
        },
    });
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { username, Points } = body;
        await connectDB();
        const user = await User.findOne({ Username: username });
        const CurrentPoints = user.Points
        const invitedby = user.InvitedBy
        if (invitedby) {
            const InvitedByUser = await User.findOne({ Username: invitedby });
            if (InvitedByUser) {
                const InvitedByUserCurrentpoints = InvitedByUser.Points
                await User.updateOne({ Username: invitedby }, { $set: { Points: InvitedByUserCurrentpoints + Points / 2 } })
            }
        }
        await User.updateOne({ Username: username }, { $set: { Points: CurrentPoints + Points } })
        return new Response(JSON.stringify({ User: user }), {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': allowedOrigin,
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error' }), {
            status: 400,
            headers: {
                'Access-Control-Allow-Origin': allowedOrigin,
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'application/json',
            },
        });
    }
}
