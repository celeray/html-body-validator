/**
 * HTML Body Validator
 * 一个用于验证和处理HTML响应体的工具包
 */

/**
 * 验证HTML响应体的有效性
 * @param {Response|string} html - HTML响应对象或HTML字符串
 * @param {Object} options - 配置选项
 * @param {number} options.maxAge - 缓存最大时间（秒），默认86400
 * @param {string} options.cacheControl - 缓存控制头，默认's-maxage=86400'
 * @param {string} options.contentType - 内容类型，默认'text/html'
 * @param {string} options.notFoundHtml - 404页面HTML内容
 * @param {number} options.maxSize - 最小（bytes），默认10KB
 * @returns {Response} 处理后的Response对象
 */
export async function validBody(html, options = {maxSize: 10000}) {
  const {
    maxAge = '86400',
    cacheControl = 's-maxage=86400',
    contentType = 'text/html',
    notFoundHtml = '<center><h1>404 Not Found</h1></center><hr><center>nginx</center>',
    maxSize = 10000 // 默认最小10KB
  } = options;

  let text;
  let originalStatus = 200; // 默认状态码
  let originalHeaders = new Headers(); // 保留原始headers
  
  // 如果传入的是Response对象，提取文本内容、状态码和headers
  if (html && typeof html.text === 'function') {
    text = await html.text();
    originalStatus = html.status; // 提取原始状态码
    originalHeaders = new Headers(html.headers); // 复制原始headers
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
  
  if(originalStatus == 404){
	  return new Response(text, {
		status: originalStatus,
		headers: {
			'Content-Type': contentType
		  }
	  });
	}
  // 验证html文件大小是否超过限制
  const textSizeInBytes = new TextEncoder().encode(text).length;
  if (textSizeInBytes < maxSize) {
    return new Response(`<script>console.error('html size small')</script>${text}`, {
      status: 404,
      headers: {
        'Content-Type': contentType
      }
    });
  }

  // 设置基本headers，但保留原始的重要headers
  const responseHeaders = new Headers(originalHeaders);
  // responseHeaders.set('Content-Type', contentType);
  // responseHeaders.set('max-age', maxAge);
  // responseHeaders.set('Cache-Control', cacheControl);

  // 返回有效的HTML响应，保留原始状态码和重要headers
  return new Response(text, {
    status: originalStatus,
    headers: responseHeaders,
  });
}


// 默认导出
export default {
  validBody
}; 