# Vite-Electron-App

Drop webpack and enjoy vite! [中文文档](https://git.acgme.cn/saya/vite-electron-app/blob/master/READMECN.MD)

## Dependencies

1. Vite 2.6.7
2. ESBuild 0.13.6
3. Electron 15.1.2
4. React 17.0.2
5. Typescript 4.4.4

## Contribute

### 1. First clone this project.

```
// from my private source
$ git clone https://git.acgme.cn/saya/vite-electron-app.git --depth=1

// from github source
$ git clone https://github.com/AlishaHawkward/vite-electron-app.git --depth=1
```

### 2. Show your intelligent!

```
Electron service entry: ./src/background.ts
React entry: ./src/main.tsx
```

### 3. Test your app.

```
$ npm run dev
```

### 4. Build your app.

```
$ npm run build
```

### 5. Lint your code.

```
$ npm run lint
$ npm run lint:fix
```

### 6. Other useful commands.

Clean dist dir: `npm run clean`

## Communicate with main process

1. Use `window.ipcRenderer.send()` from renderer process to main process.

2. Use `window.ipcRenderer.on()` from main process to renderer process.

## What you need to know

1. Main process & Render process use ipcRenderer to communicate.

2. You can use and distribute this project anywhere, but I hope you could keep the original README.MD.

3. Enjoy it!
