declare module 'react-native-html-to-pdf' {
    export interface Options {
        html: string;
        fileName?: string;
        base64?: boolean;
        directory?: string;
        height?: number;
        width?: number;
        padding?: number;
        paddingLeft?: number;
        paddingRight?: number;
        paddingTop?: number;
        paddingBottom?: number;
        fonts?: string[];
        bgColor?: string;
    }

    export interface Pdf {
        filePath?: string;
        base64?: string;
    }

    export function convert(options: Options): Promise<Pdf>;
}
