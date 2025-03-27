declare module '@ffmpeg/ffmpeg' {
    export function createFFmpeg(options?: {
      corePath?: string;
      log?: boolean;
    }): {
      load(): Promise<void>;
      FS(method: string, ...args: any[]): any;
      run(...args: string[]): Promise<void>;
    };
  }