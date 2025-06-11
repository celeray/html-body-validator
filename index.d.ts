/**
 * HTML Body Validator TypeScript 声明文件
 */

export interface ValidBodyOptions {
  /** 缓存最大时间（秒），默认86400 */
  maxAge?: string;
  /** 缓存控制头，默认's-maxage=86400' */
  cacheControl?: string;
  /** 内容类型，默认'text/html' */
  contentType?: string;
  /** 404页面HTML内容 */
  notFoundHtml?: string;
  /** 最小尺寸（bytes），默认10KB */
  maxSize?: number;
}

/**
 * 验证HTML响应体的有效性
 * @param html - HTML响应对象或HTML字符串
 * @param options - 配置选项
 * @returns 处理后的Response对象
 */
export function validBody(
  html: Response | string,
  options?: ValidBodyOptions
): Promise<Response>;

declare const _default: {
  validBody: typeof validBody;
};

export default _default; 