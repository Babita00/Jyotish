declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.svg?url" {
  const content: string;
  export default content;
}

declare module "*.webp" {
  const content:
    | {
        src: string;
        height: number;
        width: number;
        blurDataURL?: string;
      }
    | string;
  export default content;
}

declare module "*.jpg" {
  const content:
    | {
        src: string;
        height: number;
        width: number;
        blurDataURL?: string;
      }
    | string;
  export default content;
}
