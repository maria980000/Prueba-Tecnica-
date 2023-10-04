// src/config/awsconfig.ts
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: 'PRUEBA TECNICA',
  secretAccessKey: '1234567',
  region: 'TU_REGION',
});

const s3 = new AWS.S3();

export default s3;
