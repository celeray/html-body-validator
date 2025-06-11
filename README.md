# HTML Body Validator

一个专门用于验证和处理HTML响应体的JavaScript工具包（ES Module），特别适用于Cloudflare Workers和其他边缘计算环境。

## 特性

- ✅ 纯 ES Module 格式
- ✅ 轻量级，无外部依赖
- ✅ 内置文件大小验证功能
- ✅ 智能处理空内容和404状态码
- ✅ 灵活的配置选项
- ✅ 完全兼容 Web API Response 对象

## 安装

```bash
npm install html-body-validator
```

## 快速开始

### ES Module

```javascript
import { validBody } from 'html-body-validator';

export default {
  async fetch(request, env, ctx) {
    // 获取HTML内容
    let html = await publicHandler(request, env, ctx);
    
    // 验证并返回Response
    return validBody(html);
  }
};
```

### 默认导入

```javascript
import validator from 'html-body-validator';

export default {
  async fetch(request, env, ctx) {
    let html = await publicHandler(request, env, ctx);
    return validator.validBody(html);
  }
};
```

## API 文档

### validBody(html, options?)

验证HTML响应体的有效性，自动处理空内容、文件大小验证和404状态码。

**参数：**
- `html`: `Response | string` - HTML响应对象或HTML字符串
- `options`: `Object` - 可选配置项

**配置选项：**
```javascript
{
  maxAge: '86400',           // 缓存最大时间（秒），默认86400
  cacheControl: 's-maxage=86400', // 缓存控制头，默认's-maxage=86400'
  contentType: 'text/html',  // 内容类型，默认'text/html'
  notFoundHtml: '<center><h1>404 Not Found</h1></center><hr><center>nginx</center>', // 404页面HTML内容
  maxSize: 10000            // 最大文件大小（字节），默认10000（10KB）
}
```

**验证逻辑：**
1. 如果内容为空或只有空白字符 → 返回404错误页面
2. 如果原始Response状态码为404 → 直接返回原始Response对象
3. 如果内容大小小于maxSize限制 → 返回404错误页面
4. 如果通过所有验证 → 返回处理后的Response，保留原始状态码和重要Headers

**示例：**
```javascript
import { validBody } from 'html-body-validator';

// 基础用法
const response1 = await validBody(htmlContent);

// 自定义配置
const response2 = await validBody(htmlContent, {
  maxAge: '3600',
  maxSize: 5000, // 5KB限制
  notFoundHtml: '<h1>页面未找到</h1>'
});

// 处理Response对象
const fetchResponse = await fetch('https://example.com');
const validatedResponse = await validBody(fetchResponse, {
  maxSize: 15000 // 15KB限制
});
```

## 实际使用案例

### Cloudflare Workers

```javascript
import { validBody } from 'html-body-validator';
import { handler as publicHandler } from './public.js';

export default {
  async fetch(request, env, ctx) {
    try {
      // 处理请求获取HTML内容
      let html = await publicHandler(request, env, ctx);
      
      // 验证并返回响应
      return validBody(html, {
        maxSize: 20000, // 20KB限制
        notFoundHtml: `
          <html>
            <head><title>页面未找到</title></head>
            <body>
              <center>
                <h1>404 - 页面未找到</h1>
                <p>您访问的页面不存在或内容过小</p>
              </center>
            </body>
          </html>
        `
      });
    } catch (error) {
      return new Response('Internal Server Error', { status: 500 });
    }
  }
};
```

### 文件大小控制

```javascript
import { validBody } from 'html-body-validator';

// 小文件限制（适用于移动端）
const mobileResponse = await validBody(htmlContent, {
  maxSize: 5000, // 5KB
  notFoundHtml: '<h1>内容太小，无法显示</h1>'
});

// 大文件限制（适用于桌面端）
const desktopResponse = await validBody(htmlContent, {
  maxSize: 50000, // 50KB
  cacheControl: 's-maxage=3600, max-age=1800'
});
```

### 处理不同来源的内容

```javascript
import { validBody } from 'html-body-validator';

// 处理外部API响应
const apiResponse = await fetch('https://api.example.com/content');
const validatedContent = await validBody(apiResponse, {
  maxSize: 8000,
  contentType: 'text/html; charset=utf-8'
});

// 处理静态内容
const staticHtml = '<html><body><h1>Static Content</h1></body></html>';
const staticResponse = await validBody(staticHtml, {
  maxAge: '7200'
});

// 404状态码的特殊处理
const response404 = new Response('<h1>Not Found</h1>', { status: 404 });
const result = await validBody(response404); // 直接返回原始Response对象
```

## 测试

运行测试：

```bash
npm test
```

测试覆盖以下场景：
- 有效内容处理
- 空内容处理
- 大文件处理（>10KB）
- 小文件处理（<10KB）
- Response对象输入
- 404状态码处理

## 兼容性

- ✅ Node.js 18+ (ESM 支持)
- ✅ Cloudflare Workers
- ✅ Deno
- ✅ 浏览器环境（需要支持ES2020+）

## 许可证

MIT

## 贡献

欢迎提交 Issues 和 Pull Requests！

## 更新日志

### 1.0.7
- 🔄 重构为纯 ES Module 格式
- ➕ 新增文件大小验证功能（maxSize参数）
- 🗑️ 简化API，只保留核心 validBody 函数
- ⚡ 优化性能和文件体积
- 🔧 更新测试用例和配置

### 1.0.6
- 🐛 修复Headers处理问题
- 📝 完善文档和示例

### 1.0.0
- 🎉 初始版本发布
- ✅ 支持基础HTML验证功能 