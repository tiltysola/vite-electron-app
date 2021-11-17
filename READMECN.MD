# Vite-Electron-App

抛弃掉繁重的Webpack吧！

## 依赖项

1. Vite 2.6.7
2. ESBuild 0.13.6
3. Electron 15.1.2
4. React 17.0.2
5. Typescript 4.4.4

## 使用说明

### 1. 克隆当前项目

```
// 从 私有源 进行克隆
$ git clone https://git.acgme.cn/saya/vite-electron-app.git --depth=1

// 从 Github 源进行克隆
$ git clone https://github.com/AlishaHawkward/vite-electron-app.git --depth=1
```

### 2. 发挥你的才华！

```
主入口: ./src/background.ts
渲染入口: ./src/main.tsx
```

### 3. 测试你的程序

```
$ npm run dev
```

### 4. 构建你的程序

```
$ npm run build
```

### 5. 执行代码检查

```
$ npm run lint
$ npm run lint:fix
```

### 6. 其它有用的功能

清空dist目录: `npm run clean`

## 和主进程进行通信

1. 在渲染进程中使用 `window.ipcRenderer.send()` 来向主进程发送通信。

2. 在主进程中使用 `window.ipcRenderer.on()` 来接受渲染进程发送来的消息。

## 注意

1. 主进程和渲染进程之间使用 ipcRenderer 进行通讯。

2. 你可以在任何地方使用和分发本项目，但是如果你要开源发布，希望您可以保留当前README.MD。

3. 尽情的使用吧！
