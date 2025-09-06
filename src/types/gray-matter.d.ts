declare module 'gray-matter' {
  interface GrayMatterFile<T = any> {
    data: T;
    content: string;
    excerpt?: string;
    orig: Buffer | string;
    language: string;
    matter: string;
    stringify(lang: string): string;
  }

  interface Options {
    parser?: (input: string) => any;
    stringify?: (input: any) => string;
    language?: string;
    delimiters?: string | [string, string];
    engines?: Record<string, (input: string) => any>;
    excerpt?: boolean | ((file: GrayMatterFile) => string);
    excerpt_separator?: string;
  }

  function matter<T = any>(
    input: string | Buffer,
    options?: Options
  ): GrayMatterFile<T>;

  export = matter;
}
