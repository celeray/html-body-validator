/**
 * HTML Body Validator TypeScript定义
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
}

export interface HtmlResponseOptions {
  /** HTTP状态码，默认200 */
  status?: number;
  /** 缓存最大时间（秒），默认86400 */
  maxAge?: string;
  /** 缓存控制头，默认's-maxage=86400' */
  cacheControl?: string;
  /** 内容类型，默认'text/html' */
  contentType?: string;
}

export interface ScenarioConfig {
  /** HTTP状态码 */
  status?: number;
  /** HTML内容 */
  html?: string;
  /** 缓存最大时间（秒） */
  maxAge?: string;
  /** 缓存控制头 */
  cacheControl?: string;
}

export interface ValidationScenarios {
  /** 空内容场景配置 */
  empty?: ScenarioConfig;
  /** 错误场景配置 */
  error?: ScenarioConfig;
  /** 成功场景配置 */
  success?: ScenarioConfig;
}

/**
 * 验证HTML响应体的有效性
 * @param html - HTML响应对象或HTML字符串
 * @param options - 配置选项
 * @returns 处理后的Response对象
 */
export function validBody(html: Response | string, options?: ValidBodyOptions): Promise<Response>;

/**
 * 验证HTML字符串的有效性（同步版本）
 * @param htmlString - HTML字符串
 * @returns 是否为有效的HTML
 */
export function isValidHtml(htmlString: string): boolean;

/**
 * 创建标准的HTML Response对象
 * @param html - HTML内容
 * @param options - 配置选项
 * @returns Response对象
 */
export function createHtmlResponse(html: string, options?: HtmlResponseOptions): Response;

/**
 * 验证并处理多种HTML场景
 * @param html - HTML内容
 * @param scenarios - 不同场景的配置
 * @returns 处理后的Response对象
 */
export function validBodyWithScenarios(html: Response | string, scenarios?: ValidationScenarios): Promise<Response>; 