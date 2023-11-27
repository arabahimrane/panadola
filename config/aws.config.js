const { S3Client } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  credentials: {
    accessKeyId: 'AKIA6EHD45A7YNQ6D27O',
    secretAccessKey: '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',
  },
  region: 'us-west-2',
  defaultBucket:'panadola',

});


module.exports = s3Client;
