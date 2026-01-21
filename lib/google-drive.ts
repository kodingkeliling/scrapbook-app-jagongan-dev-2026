import axios from "axios";

export const uploadFileToDrive = async (file: File, accessToken: string) => {
    const metadata = {
        name: `scrapbook-${Date.now()}-${file.name}`,
        mimeType: file.type,
    };

    const formData = new FormData();
    formData.append(
        "metadata",
        new Blob([JSON.stringify(metadata)], { type: "application/json" })
    );
    formData.append("file", file);

    // 1. Upload the file
    const response = await axios.post(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
        formData,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    const fileId = response.data.id;

    // 2. Make the file public (anyone with the link can view)
    await axios.post(
        `https://www.googleapis.com/drive/v3/files/${fileId}/permissions`,
        {
            role: "reader",
            type: "anyone",
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        }
    );

    // 3. Get the webViewLink (or direct link)
    const fileInfo = await axios.get(
        `https://www.googleapis.com/drive/v3/files/${fileId}?fields=webViewLink,thumbnailLink`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    // This format is highly compatible with <img> tags for public Google Drive files
    const imageUrl = `https://lh3.googleusercontent.com/d/${fileId}`;

    return {
        fileId,
        imageUrl,
        webViewLink: fileInfo.data.webViewLink,
    };
};

export const getUserInfo = async (accessToken: string) => {
    const response = await axios.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return response.data;
};
