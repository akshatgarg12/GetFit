import cloudinary from 'cloudinary'

const client = () => {
    return cloudinary.v2.config({
        cloud_name: "akshat",
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    })
};

export default client
