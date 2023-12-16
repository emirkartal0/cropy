export enum mimeTypes {
    png = "image/png",
    jpg = "image/jpeg",
    webp = "image/webp"
}

export const recommendedResolution: Array<{ width: number, height: number }> = [
    { width: 3840, height: 2160 },
    { width: 2560, height: 1440 },
    { width: 1920, height: 1080 },
    { width: 1280, height: 720 },
];

export const recommendedRatio: Array<aspectRatio> = [
    { name:'No Changes', width: 1, height: 1 },
    { name:'16:9', width: 16, height: 9 },
    { name:'4:3', width: 4, height: 3 },
];

export interface aspectRatio {
    name: string;
    width: number;
    height: number;
}