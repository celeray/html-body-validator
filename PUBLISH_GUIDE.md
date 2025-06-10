# HTML Body Validator 发布指南

这份指南将帮助你将 `html-body-validator` 包发布到 npm 仓库。

## 发布前准备

### 1. 账号准备
- 注册 npm 账号：[https://www.npmjs.com/signup](https://www.npmjs.com/signup)
- 验证邮箱地址

### 2. 登录 npm
```bash
npm login
```
输入你的用户名、密码和邮箱。

### 3. 验证登录状态
```bash
npm whoami
```

### 4. 更新包信息
在发布前，请更新 `package.json` 中的以下信息：

```json
{
  "name": "html-body-validator",  // 如果名称被占用，可以改为 @你的用户名/html-body-validator
  "version": "1.0.0",
  "author": "你的真实姓名或用户名",
  "repository": {
    "type": "git",
    "url": "https://github.com/你的用户名/html-body-validator.git"
  },
  "bugs": {
    "url": "https://github.com/你的用户名/html-body-validator/issues"
  },
  "homepage": "https://github.com/你的用户名/html-body-validator#readme"
}
```

## 发布步骤

### 1. 检查包内容
```bash
npm pack --dry-run
```
这会显示将要包含在包中的文件列表。

### 2. 测试包
```bash
npm test
```

### 3. 发布到 npm
```bash
npm publish
```

如果这是你的第一次发布，可能需要验证邮箱。

### 4. 发布作用域包（可选）
如果名称 `html-body-validator` 已被占用，可以发布为作用域包：

1. 修改 `package.json` 中的 name：
```json
{
  "name": "@你的用户名/html-body-validator"
}
```

2. 发布：
```bash
npm publish --access public
```

## 版本管理

### 更新版本
使用语义化版本控制：

```bash
# 补丁版本（bug修复）
npm version patch

# 小版本（新功能）
npm version minor

# 大版本（破坏性更改）
npm version major
```

然后重新发布：
```bash
npm publish
```

## 使用发布的包

发布成功后，其他项目可以这样安装和使用：

```bash
npm install html-body-validator
# 或者如果是作用域包
npm install @你的用户名/html-body-validator
```

在代码中使用：
```javascript
// CommonJS
const { validBody } = require('html-body-validator');

// ES Module
import { validBody } from 'html-body-validator';
```

## 维护建议

1. **版本控制**：严格遵循语义化版本控制
2. **测试**：添加完整的单元测试
3. **文档**：保持 README 和 API 文档的更新
4. **监控**：定期检查包的下载量和反馈
5. **安全**：使用 `npm audit` 检查安全问题

## 常见问题

### Q: 包名已被占用怎么办？
A: 可以使用作用域包 `@username/package-name` 或者选择其他名称。

### Q: 发布失败怎么办？
A: 检查网络连接、npm 登录状态、包名是否冲突、版本是否已存在。

### Q: 如何撤回发布？
A: 发布后 72 小时内可以撤回：
```bash
npm unpublish html-body-validator@版本号
```

### Q: 如何设为私有包？
A: 修改 package.json：
```json
{
  "private": true
}
```

## 成功案例

发布成功后，你的包将出现在：
- npm 官网：https://www.npmjs.com/package/html-body-validator
- 可以通过 `npm install` 安装
- 支持 CDN 访问：https://unpkg.com/html-body-validator

祝你发布成功！🎉 