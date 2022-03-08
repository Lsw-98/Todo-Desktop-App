# 记录开发过程中踩的坑以及开发过程

# 所用技术栈
react + umi + electron（开发桌面应用程序）+ express

# 安装umiJS
umiJS官方网站：https://umijs.org/zh-CN/docs/getting-started  
安装命令：yarn create @umijs/umi-app
## <font color="#FF6347">文件名、目录名或卷标语法不正确</font>
我在安装umiJS时，报一下错误:
```js
[################################################] 48/48文件名、目录名或卷标语法不正确。
error Command failed.
Exit code: 1
Command: D:\IDE\nodeJS\node_global\bin\create-umi-app
Arguments:
Directory: D:\project\Todo_Desktop_App\main
Output:

info Visit https://yarnpkg.com/en/docs/cli/create for documentation about this command.
```
该问题的本质原因是因为yarn的安装路径在C盘，而如果在D盘使用yarn安装umiJS会导致没有权限访问，<font color="#FF6347">可以修改yarn的全局安装路径来解决</font>。
1. 首先修改yarn的全局安装路径到D盘：  
    - 在D盘下新建yarn文件夹
    - 然后cd到yarn文件夹并创建global和cache两个文件夹
    - 执行如下两个命令来设置yarn的全局安装路径和缓存路径
    - 最后检查是否设置成功

```js
yarn config set global-folder "D:\Program Files\yarn\global"
yarn config set cache-folder "D:\Program Files\yarn\cache"
```
![avatar](/img/umiJS/%E8%AE%BE%E7%BD%AEyarn%E8%B7%AF%E5%BE%84.png)  

2. 再次执行yarn create @umijs/umi-app  
![avatar](/img/umiJS/umiJS%E5%AE%89%E8%A3%85%E6%88%90%E5%8A%9F.png)  
安装成功

# 安装Electron
Electron官方网站：**https://www.electronjs.org/zh/docs/latest/tutorial/quick-start**  
使用以下命令进行安装：
```js
yarn init
yarn add --dev electron
```

然后在目录下创建index.html和index.js入口文件。  
index.html如下：
```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
  <meta http-equiv="X-Content-Security-Policy" content="default-src 'self'; script-src 'self'">
  <title>Hello World!</title>
</head>

<body>
  <h1>Hello World!</h1>
  We are using Node.js <span id="node-version"></span>,
  Chromium <span id="chrome-version"></span>,
  and Electron <span id="electron-version"></span>.
</body>

</html>
```

index.js文件如下：
```js
const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
```

然后在package.json文件中配置启动脚本:
```json
"scripts": {
  "start": "electron ."
}
```

最后输入yarn start启动项目。
![avatar](/img/Electron/Electron%E5%AE%89%E8%A3%85%E6%88%90%E5%8A%9F.png) 

# 创建express
在app文件夹下新建server文件夹，cd到server文件夹后执行下面命令：
```js
npx express-generator
yarn
```

# 编译前端资源到express访问
1. 首先回到main文件夹下执行yarn build命令
2. 等待执行完成，main目录下会多一个dist文件夹，复制dist文件夹下的umi.css、umi.js和index.html到/app/server/public/路径下
3. 输入yarn start命令，就可以访问到之前配置的umi前端资源
4. 至此实现了express访问前端资源的整个过程

# 配置express和electron
1. 在/app/server/bin/www.js文件中，写入如下代码，其中函数体内部代码为www.js已有代码，需要剪切过来。
```js
function startServer() {
  /**
   * Listen on provided port, on all network interfaces.
   */

  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
}

module.exports = startServer;
```

2. 找到/app下的index.js的文件中的createWindow()方法中加入startServer()方法
```js
function createWindow() {
  startServer()   // 加入这行代码
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}
```

3. 将server停掉，然后进入到app文件夹下，将index.html替换为以下内容：
```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta name="viewport"
    content="width=device-width, initial-scale=1, maximum-scale=1,minimum-scale=1,user-scalable=no" />
  <title>Hello World!</title>
  <style>
    * {
      padding: 0;
      margin: 0;
    }

    iframe {
      width: 100%;
      height: 100%;
      border: 0;
    }

    #container {
      width: 100vw;
      height: 100vh;
      overflow: hidden;
    }
  </style>
</head>

<body>
  <div id="container">
    <iframe src="http://localhost:3000/"></iframe>
  </div>
</body>

</html>
```
4. 启动项目即可
