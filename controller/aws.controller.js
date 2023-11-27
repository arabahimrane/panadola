const s3Client = require("../config/aws.config");
const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");

exports.sendToS3 = async (file, path) => {
    const productImgBase64 = file.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
    const productImgBuffer = Buffer.from(productImgBase64, 'base64');


    try {
        const objectKey = `${path}/${Date.now()}.png`;
        const command = new PutObjectCommand({
            Bucket: s3Client.config.defaultBucket,
            Key: objectKey,
            Body: productImgBuffer,
            ContentEncoding: 'base64', // Add this line
            ContentType: 'image/png',
        });
        await s3Client.send(command);
        
        return objectKey;
    } catch (err) {
        throw err;
    }
};

exports.delletToS3 = async (file) => {
    console.log("delletToS3: file =", file);
    try {
        const command = new DeleteObjectCommand({
            Bucket: s3Client.config.defaultBucket,
            Key: file,
        });
        return await s3Client.send(command);
    } catch (err) {
        throw err;
    }
}