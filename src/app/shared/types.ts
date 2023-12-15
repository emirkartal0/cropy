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