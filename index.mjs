/**
 * HTML Body Validator
 * 一个用于验证和处理HTML响应体的工具包 (ES Module版本)
 */

/**
 * 验证HTML响应体的有效性
 * @param {Response|string} html - HTML响应对象或HTML字符串
 * @param {Object} options - 配置选项
 * @param {number} options.maxAge - 缓存最大时间（秒），默认86400
 * @param {string} options.cacheControl - 缓存控制头，默认's-maxage=86400'
 * @param {string} options.contentType - 内容类型，默认'text/html'
 * @param {string} options.notFoundHtml - 404页面HTML内容
 * @returns {Response} 处理后的Response对象
 */
export async function validBody(html, options = {}) {
  const {
    maxAge = '86400',
    cacheControl = 's-maxage=86400',
    contentType = 'text/html',
    notFoundHtml = '<center><h1>404 Not Found</h1></center><hr><center>nginx</center>'
  } = options;

  let text;
  
  // 如果传入的是Response对象，提取文本内容
  if (html && typeof html.text === 'function') {
    text = await html.text();
  } else if (typeof html === 'string') {
    text = html;
  } else {
    text = '';
  }

  // 验证内容是否为空
  if (!text.trim()) {
    return new Response(notFoundHtml, {
      status: 404,
      headers: {
        'Content-Type': contentType
      }
    });
  }

  // 返回有效的HTML响应
  return new Response(text, {
    headers: {
      'Content-Type': contentType,
      'max-age': maxAge,
      'Cache-Control': cacheControl,
    },
  });
}

/**
 * 验证HTML字符串的有效性（同步版本）
 * @param {string} htmlString - HTML字符串
 * @returns {boolean} 是否为有效的HTML
 */
export function isValidHtml(htmlString) {
  if (typeof htmlString !== 'string') {
    return false;
  }
  return htmlString.trim().length > 0;
}

/**
 * 创建标准的HTML Response对象
 * @param {string} html - HTML内容
 * @param {Object} options - 配置选项
 * @returns {Response} Response对象
 */
export function createHtmlResponse(html, options = {}) {
  const {
    status = 200,
    maxAge = '86400',
    cacheControl = 's-maxage=86400',
    contentType = 'text/html'
  } = options;

  return new Response(html, {
    status,
    headers: {
      'Content-Type': contentType,
      'max-age': maxAge,
      'Cache-Control': cacheControl,
    },
  });
}

/**
 * 验证并处理多种HTML场景
 * @param {Response|string} html - HTML内容
 * @param {Object} scenarios - 不同场景的配置
 * @returns {Response} 处理后的Response对象
 */
export async function validBodyWithScenarios(html, scenarios = {}) {
  const {
    empty = { status: 404, html: '<center><h1>404 Not Found</h1></center><hr><center>nginx</center>' },
    error = { status: 500, html: '<center><h1>500 Internal Server Error</h1></center>' },
    success = { maxAge: '86400', cacheControl: 's-maxage=86400' }
  } = scenarios;

  let text;
  
  if (html && typeof html.text === 'function') {
    text = await html.text();
  } else if (typeof html === 'string') {
    text = html;
  } else {
    text = '';
  }

  // 空内容场景
  if (!text.trim()) {
    return new Response(empty.html, {
      status: empty.status || 404,
      headers: {
        'Content-Type': 'text/html'
      }
    });
  }

  // 检查是否包含错误标识
  if (text.includes('error') || text.includes('Error') || text.includes('ERROR')) {
    return new Response(error.html, {
      status: error.status || 500,
      headers: {
        'Content-Type': 'text/html'
      }
    });
  }

  // 成功场景
  return new Response(text, {
    headers: {
      'Content-Type': 'text/html',
      'max-age': success.maxAge || '86400',
      'Cache-Control': success.cacheControl || 's-maxage=86400',
    },
  });
} 