import { AWS_ACCESS_KEY_ID, AWS_FILES_BUCKET, AWS_SECRET_ACCESS_KEY } from '$env/static/private';
import { PUBLIC_AWS_REGION } from '$env/static/public';
import {
    ListObjectsV2Command,
    PutObjectCommand,
    DeleteObjectCommand,
    S3Client
} from '@aws-sdk/client-s3';

const s3Client = new S3Client({
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    },
    region: PUBLIC_AWS_REGION
});

export const getAllObjects = async () => {
    const command = new ListObjectsV2Command({
        Bucket: AWS_FILES_BUCKET
    });

    try {
        let isTruncated = true;
        let contents = [];

        while (isTruncated) {
            const { Contents, IsTruncated, NextContinuationToken } = await s3Client.send(command);
            if (Contents) {
                const contentsList = Contents.map((e) => ({
                    file: e.Key,
                    size: e.Size
                }));
                contents.push(...contentsList);
            }
            isTruncated = IsTruncated!;
            command.input.ContinuationToken = NextContinuationToken;
        }
        return contents;
    } catch (err) {
        console.error(err);
        return [];
    }
};

export const listAlbumObjects = async (prefix: string, bucket: string) => {
    const command = new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: `${prefix}/`
    });

    try {
        let isTruncated = true;
        let contents = [];

        while (isTruncated) {
            const { Contents, IsTruncated, NextContinuationToken } = await s3Client.send(command);
            if (Contents) {
                const contentsList = Contents.map((e) => ({
                    file: e.Key!.split('/')[1],
                    size: e.Size!,
                    url: `https://${bucket}.s3.${PUBLIC_AWS_REGION}.amazonaws.com/${e.Key}`
                }));
                contents.push(...contentsList);
            }
            isTruncated = IsTruncated!;
            command.input.ContinuationToken = NextContinuationToken;
        }
        return contents;
    } catch (err) {
        console.error(err);
        return [];
    }
};

export const saveImage = async (key: string, bucket: string, data: any, contentType: string) => {
    const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: data,
        ContentType: contentType
    });

    try {
        const resp = await s3Client.send(command);
        return {
            success: true,
            resp
        };
    } catch (error) {
        console.error('S3 upload error ', error);
        return {
            success: false,
            error
        };
    }
};

export const removeImage = async (key: string, bucket: string) => {
    const command = new DeleteObjectCommand({
        Bucket: bucket,
        Key: key
    });

    try {
        const resp = await s3Client.send(command);
        return {
            success: true,
            resp
        };
    } catch (error) {
        console.error('S3 delete error ', error);
        return {
            success: false,
            error
        };
    }
};
