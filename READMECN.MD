# Vite-Electron-App

一个使用 Vite 构建的现代化 Electron 应用程序模板。该模板为使用 React 和 TypeScript 构建跨平台桌面应用程序提供了坚实的基础。

## 特性

- ⚡️ 闪电般的 HMR（热模块替换）
- 🚀 Vite 驱动的构建系统
- 📦 Electron 跨平台桌面应用
- ⚛️ React UI 开发
- 🔷 TypeScript 类型安全
- 🎨 现代化开发体验

## 依赖项

- Vite 5.x
- Electron 28.x
- React 18.x
- TypeScript 5.x
- ESBuild（随 Vite 打包）

## 开始使用

### 前置要求

- Node.js 18.x 或更高版本
- npm 9.x 或更高版本

### 安装

```bash
# 克隆仓库
git clone https://github.com/AlishaHawkward/vite-electron-app.git --depth=1

# 进入项目目录
cd vite-electron-app

# 安装依赖
npm install
```

### 开发

```bash
# 启动开发服务器
npm run dev
```

### 构建

```bash
# 构建生产版本
npm run build
```

### 代码质量

```bash
# 运行代码检查
npm run lint

# 修复代码检查问题
npm run lint:fix

# 清理构建目录
npm run clean
```

## 项目结构

```
├── src/
│   ├── main/           # Electron 主进程
│   ├── render/         # React 应用
│   └── types/          # TypeScript 类型定义
└── build/              # 构建脚本
```

## 进程间通信

应用程序使用 Electron 的 IPC（进程间通信）在主进程和渲染进程之间进行通信：

```typescript
// 从渲染进程到主进程
window.ipcRenderer.send('channel-name', data);

// 从主进程到渲染进程
window.ipcRenderer.on('channel-name', (event, data) => {
  // 处理数据
});
```

## 许可证

本项目是开源的，采用 MIT 许可证。您可以自由地使用和修改它。

## 贡献

欢迎贡献！请随时提交 Pull Request。

## 致谢

- 原始模板由 [AlishaHawkward](https://github.com/AlishaHawkward) 创建
- 使用 [Vite](https://vitejs.dev/) 构建
- 由 [Electron](https://www.electronjs.org/) 提供支持
