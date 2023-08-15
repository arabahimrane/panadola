const s3Client = require("../config/aws.config");
const { PutObjectCommand } = require("@aws-sdk/client-s3");

exports.sendToS3 = async (file, path) => {
    const productImgBase64 = file.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
    const productImgBuffer = Buffer.from(productImgBase64, 'base64');


    try {
        const objectKey = `${path}/${Date.now()}.png`;
        const command = new PutObjectCommand({
            Bucket: 'panadola',
            Key: objectKey,
            Body: productImgBuffer,
            ContentEncoding: 'base64', // Add this line
            ContentType: 'image/png',
        });
        await s3Client.send(command);
        const imageUrl = `https://panadola.s3-us-west-2.amazonaws.com/${objectKey}`;
        return imageUrl;
    } catch (err) {
        throw err;
    }
};