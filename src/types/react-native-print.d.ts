declare module 'react-native-print' {
    export interface PrintOptions {
        html?: string;
        filePath?: string;
        fileName?: string; // Optional, might not be supported on all platforms in the same way
        isLandscape?: boolean;
        jobName?: string;
        baseUrl?: string;
    }

    export interface PrintFileOptions {
        html: string;
        fileName?: string;
        base64?: boolean;
    }

    export interface PrintFileResult {
        filePath: string;
    }

    export default class RNPrint {
        static print(options: PrintOptions): Promise<void>;
        static printToFile(options: PrintFileOptions): Promise<PrintFileResult>;
    }
}
