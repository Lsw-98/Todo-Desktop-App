# 记录开发过程中踩的坑以及开发过程

# 所用技术栈
react + umi + electron（开发桌面应用程序）+ express + antd + IconPark（图标库）  

antd官网地址：https://ant.design/index-cn  
umiJS官方地址：https://umijs.org/zh-CN/docs/getting-started   
IconPark官方地址：https://iconpark.oceanengine.com/home   
Electron官方地址：https://www.electronjs.org/zh/docs/latest/tutorial/quick-start  
express官方地址：http://expressjs.com/en/starter/generator.html

# 安装umiJS 
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

# 知识点：TypeScript中的PropsType
在TypeScript中，使用接口对props进行类型限制，例如：
```js
// 对props进行类型限制
interface IProps {
  name: string    // 任务名称
  count: number   // 计数器
  active: boolean // 是否处于激活（选中）状态
  icon?: ReactNode   // 图标
  onClick: () => void
}
```

TypeScript 的类型检查是静态的，PropTypes 可以在运行时进行检查。

# 在IconPark中引入图标
1. 复制图标SVG
2. 新建组件Icon，贴入SVG
```js
// 在IconPark中引入一个加号图标

export const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" fill="white" fillOpacity="0.01" />
    <path d="M24.0607 10L24.024 38" stroke="#333" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 24L38 24" stroke="#333" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
```

# 知识点：TypeScript语法下使用useState()可以对useState限制参数类型
```js
type TaskType = {
  title: string  // 任务标题
  desc: string  // 任务描述
  endTime: moment.Moment   // 结束时间
}

// tasks：创建的任务
const [tasks, setTasks] = useState<TaskType[]>([])
```

通过在外部定义tasks的类型，可以在useState后面紧跟着引用tasks的类型。

# 知识点：react.memo和useMemo()
## 什么是 memoization？
memoization是一个过程，允许我们<font color="#FF6347">缓存递归/昂贵的函数调用值</font>，在下次使用相同参数调用函数时，直接返回缓存之还不是重新计算。有时我们的代码会做很多冗余的操作，使性能变差。使用memoization可以使我们的程序运行得更快，提高性能。

## React中的memoization
在React函数组件中，当组件中的某些props发生变化时，默认情况下整个组件都会重新渲染，包括其它未更改的props值。如果一个组件显示上万条数据，每个用户点击一次按钮，该组件中的每条数据都会重新渲染一次，这将是很大的开销。所以必须要使用memoization对这些数据进行管理，提升性能。

## React.memo
<font color="#FF6347">React.memo是一个高阶组件(HOC)</font>。它接受一个组件A作为参数并返回一个组件B，如果组件B中的props没有改变，则组件B会阻止组件A重新渲染。使用方法就是在想要监听的组件外包裹React.meo。例如：React.memo(component)

## useMemo
使用 useMemo()，我们可以返回<font color="#FF6347">记忆值</font>来避免函数的依赖项没有改变的情况下重新渲染。

## React.memo和useMemo的区别
 - React.memo是一个高阶组件，我们可以使用它来<font color="#FF6347">包装我们不想重新渲染的组件</font>，除非其中的props发生变化。
 - useMemo()是一个react hooks，我们可以使用它<font color="#FF6347">在组件中包装函数，确保依赖项之一发生变化，才重新渲染。</font>

# 项目问题：express如何解决跨域问题
在app.js中配置如下代码：
```js
app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "http://localhost:8000");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
    res.send(200);  //让options尝试请求快速结束
  else
    next();
});
```

# 知识点：useEffect
```js
useEffect(() => {
  // effect函数
  first

  return () => {
    // 返还函数
    second
  }
}, [third])
```
 - 第一个参数进行发送请求，修改数据
 - 第二个参数是return的返还函数，在组件将要卸载时做一些事情
 - 第三个参数是函数依赖项，如果函数依赖想发生变化，才会执行useEffect函数  
## *useEffect的执行机制
 - 挂载阶段：先执行useEffect函数，并把effect函数存入队列等待执行
 - 挂在完成：执行effect函数队列
## *更新阶段
 - 执行新的useEffect函数，并将新的effect函数存入队列等待执行
 - 执行effect函数和返还函数队列，并观察是否有依赖参数, 有依赖参数, 追踪依赖参数是否改变, 改变执行, 没有改变不执行
## *卸载阶段
 - 执行返还函数队列

# 知识点：Object.assign
Object.assign方法用来将源对象（source）的所有可枚举属性，复制到目标对象（target）。它至少需要两个对象作为参数，第一个参数是目标对象，后面的参数都是源对象。

```js
let targetObj1 = { a: 1 };
let sourceObj1 = { b: 1 };
let sourceObj11 = { c: 3 };
Object.assign(targetObj1, sourceObj1, sourceObj11);
console.log(targetObj1);  // { a: 1, b: 1, c: 3 } 
```

如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
```js
let targetObj1 = { a: 1, b: 2 };
let sourceObj1 = { b: 1 };
let sourceObj11 = { c: 3 };
Object.assign(targetObj1, sourceObj1, sourceObj11);
console.log(targetObj1);  // { a: 1, b: 1, c: 3 } 
```

如果只有一个参数，Object.assign会直接返回该参数。
```js
let targetObj1 = { a: 4 }
Object.assign(targetObj1);
console.log(targetObj1)   // { a: 4 }
```

# 项目难点：统一管理taskItem和menu
2022/3/13  
之前主要在开发任务列表这一块，菜单项只是简单写了一个active属性，判断当前选中的菜单项是哪一个，然后高亮显示。今天考虑到在不同的菜单项下（已完成/进行中）显示的任务列表是不同的，就将<font color="#FF6347">activeKey（当前激活的是已完成/进行中的其中一项）</font>提到最外层管理，然后将<font color="#FF6347">activeKey</font>分别传给TaskList和MainMenu组件，让TaskList和MainMenu组件根据activeKey展示不同的内容。在此记录一下。

做法：
1. 首先在最外层组件创建了一个tab状态，表示菜单栏状态，默认选中进行中的任务；
2. 将tab传给TaskList和MainMenu组件，再给MainMenu组件传一个onChange()函数，用于在点击菜单栏时改变<font color="#FF6347">tab状态</font>；
3. 在TaskList中使用useEffect，将activeKey当作useEffect的依赖项，当activeKey变化时，才会触发useEffect中的函数；

其实这里只是一个简单的父子组件通信过程，但是将状态提升到父组件这种思想先开始并没有考虑到，在两个组件的公共父组件中管理状态比较方便，省去了很多不必要的操作。