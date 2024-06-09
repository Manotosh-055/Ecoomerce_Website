import dotenv from "dotenv";
dotenv.config();
import cloudinary from 'cloudinary';

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.API_SECRET
})

class Cloudinary{
    static cloudinaryUploadImg = async (fileToUploads) => {
        return new Promise((resolve) => {
            cloudinary.uploader.upload(fileToUploads,(result)=>{
                resolve(
                  {
                    url: result.secure_url,
                    asset_id: result.asset_id,
                    public_id: result.public_id,
                },
                {
                    resource_type:'auto',
                }
              );
            });
        });
    }
    static cloudinaryDeleteImg = async (fileToDelete) => {
        return new Promise((resolve) => {
          cloudinary.uploader.destroy(fileToDelete, (result) => {
            resolve(
              {
                url: result.secure_url,
                asset_id: result.asset_id,
                public_id: result.public_id,
              },
              {
                resource_type: "auto",
              }
            );
          });
        });
      };
}

export default Cloudinary;

