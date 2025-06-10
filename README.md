# HTML Body Validator

一个专门用于验证和处理HTML响应体的JavaScript工具包，特别适用于Cloudflare Workers和其他边缘计算环境。

## 特性

- ✅ 支持 CommonJS 和 ES Module 两种模块格式
- ✅ TypeScript 类型支持
- ✅ 轻量级，无外部依赖
- ✅ 支持多种HTML验证场景
- ✅ 灵活的配置选项
- ✅ 完全兼容 Web API Response 对象

## 安装

```bash
npm install html-body-validator
```

## 快速开始

### CommonJS

```javascript
const { validBody } = require('html-body-validator');

export default {
  async fetch(request, env, ctx) {
    // 获取HTML内容
    let html = await publicHandler(request, env, ctx);
    
    // 验证并返回Response
    return validBody(html);
  }
};
```

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

## API 文档

### validBody(html, options?)

验证HTML响应体的有效性，自动处理空内容返回404错误页面。

**参数：**
- `html`: `Response | string` - HTML响应对象或HTML字符串
- `options`: `ValidBodyOptions` - 可选配置项

**配置选项：**
```javascript
{
  maxAge: '86400',           // 缓存最大时间（秒）
  cacheControl: 's-maxage=86400', // 缓存控制头
  contentType: 'text/html',  // 内容类型
  notFoundHtml: '<center><h1>404 Not Found</h1></center><hr><center>nginx</center>' // 404页面内容
}
```

**示例：**
```javascript
import { validBody } from 'html-body-validator';

// 基础用法
const response1 = await validBody(htmlContent);

// 自定义配置
const response2 = await validBody(htmlContent, {
  maxAge: '3600',
  notFoundHtml: '<h1>页面未找到</h1>'
});
```

### validBodyWithScenarios(html, scenarios?)

支持多种验证场景的高级验证函数。

**参数：**
- `html`: `Response | string` - HTML内容
- `scenarios`: `ValidationScenarios` - 场景配置

**场景配置：**
```javascript
{
  empty: {    // 空内容场景
    status: 404,
    html: '<center><h1>404 Not Found</h1></center>'
  },
  error: {    // 错误场景
    status: 500,
    html: '<center><h1>500 Internal Server Error</h1></center>'
  },
  success: {  // 成功场景
    maxAge: '86400',
    cacheControl: 's-maxage=86400'
  }
}
```

**示例：**
```javascript
import { validBodyWithScenarios } from 'html-body-validator';

const response = await validBodyWithScenarios(htmlContent, {
  empty: {
    status: 404,
    html: '<h1>内容为空</h1>'
  },
  error: {
    status: 500,
    html: '<h1>服务器错误</h1>'
  },
  success: {
    maxAge: '3600'
  }
});
```

### isValidHtml(htmlString)

同步验证HTML字符串的有效性。

**参数：**
- `htmlString`: `string` - HTML字符串

**返回值：**
- `boolean` - 是否为有效HTML

**示例：**
```javascript
import { isValidHtml } from 'html-body-validator';

console.log(isValidHtml('<h1>Hello</h1>')); // true
console.log(isValidHtml(''));               // false
console.log(isValidHtml('   '));            // false
```

### createHtmlResponse(html, options?)

创建标准的HTML Response对象。

**参数：**
- `html`: `string` - HTML内容
- `options`: `HtmlResponseOptions` - 配置选项

**示例：**
```javascript
import { createHtmlResponse } from 'html-body-validator';

const response = createHtmlResponse('<h1>Hello World</h1>', {
  status: 200,
  maxAge: '3600'
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
        notFoundHtml: `
          <html>
            <head><title>页面未找到</title></head>
            <body>
              <center>
                <h1>404 - 页面未找到</h1>
                <p>您访问的页面不存在</p>
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

### 错误处理场景

```javascript
import { validBodyWithScenarios } from 'html-body-validator';

const response = await validBodyWithScenarios(htmlContent, {
  empty: {
    status: 404,
    html: `
      <html>
        <head><title>404</title></head>
        <body><h1>页面不存在</h1></body>
      </html>
    `
  },
  error: {
    status: 500,
    html: `
      <html>
        <head><title>服务器错误</title></head>
        <body><h1>服务器内部错误</h1></body>
      </html>
    `
  },
  success: {
    maxAge: '7200',
    cacheControl: 's-maxage=7200, max-age=3600'
  }
});
```

## TypeScript 支持

这个包完全支持TypeScript，包含了完整的类型定义：

```typescript
import { validBody, ValidBodyOptions } from 'html-body-validator';

const options: ValidBodyOptions = {
  maxAge: '3600',
  contentType: 'text/html',
  notFoundHtml: '<h1>Not Found</h1>'
};

const response: Response = await validBody(htmlContent, options);
```

## 兼容性

- ✅ Node.js 14+
- ✅ Cloudflare Workers
- ✅ Deno
- ✅ 浏览器环境（需要支持ES2017+）

## 许可证

MIT

## 贡献

欢迎提交 Issues 和 Pull Requests！

## 更新日志

### 1.0.0
- 初始版本发布
- 支持基础HTML验证功能
- 提供多场景验证支持
- 完整的TypeScript类型定义 