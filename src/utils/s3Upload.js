import AWS from 'aws-sdk';
import { accessKeyId, secretAccessKey, sessionToken, region, bucket } from '../constant/constants';

AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    sessionToken: sessionToken,
    region: region,
});

const s3 = new AWS.S3();

const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

export const uploadToS3 = async (file) => {
    const randomString = generateRandomString(8);
    const fileName = `${file.name.split('.')[0]}-${randomString}.${file.name.split('.').pop()}`;

    const params = {
        Bucket: bucket,
        Key: fileName,
        Body: file,
        ContentType: file.type,
    };

    try {
        const data = await s3.upload(params).promise();
        // console.log('File uploaded successfully:', data.Location);
        return data.Location;
    } catch (error) {
        // console.error('Error uploading file:', error);
        return null;
    }
};

export const deleteFromS3 = async (fileUrl) => {
    const fileName = fileUrl.split('/').pop();
  
    const params = {
        Bucket: bucket,
        Key: fileName,
    };
  
    try {
        await s3.deleteObject(params).promise();
        // console.log('File deleted successfully:', fileName);
        return true;
    } catch (error) {
        // console.error('Error deleting file:', error);
        return false;
    }
};