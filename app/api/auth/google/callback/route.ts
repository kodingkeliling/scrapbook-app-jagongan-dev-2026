import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code) {
        return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    try {
        const url = "https://oauth2.googleapis.com/token";
        const values: Record<string, string> = {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID as string,
            client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
            redirect_uri: process.env.OAUTH_REDIRECT_URL as string,
            grant_type: "authorization_code",
        };

        const response = await axios.post(url, new URLSearchParams(values), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        const { access_token } = response.data;

        // Return the token as JSON so the client-side callback page can handle it
        return NextResponse.json({ access_token });
    } catch (error: any) {
        console.error("OAuth Error:", error.response?.data || error.message);
        return NextResponse.json({ error: "OAuth failed" }, { status: 500 });
    }
}
