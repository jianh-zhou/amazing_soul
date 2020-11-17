## webpack快速入门教程
### 1、webpack 介绍
* 什么是webpack<https://www.webpackjs.com/>
  * Webpack是一个模块打包器(bundler)。
  * 在Webpack看来, 前端的所有资源文件(js/json/css/img/less/...)都会作为模块处理
  * 它将根据模块的依赖关系进行静态分析，生成对应的静态资源
* 五个核心概念
  * Entry：入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。
  * Output：output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件
  * Loader：loader 让 webpack 能够去处理那些非 JavaScript 文件
  * Plugins：插件则可以用于执行范围更广的任务。例如：打包优化、压缩，
  * Mode：模式，有生产模式 production 和开发模式 development 
* 理解 Loader
  * Webpack 本身只能加载 JS/JSON 模块，如果要加载其他类型的文件(模块)，就需要使用对应的loader 进行转换/加载
  * Loader 本身也是运行在 node.js 环境中的 JavaScript 模块
  * 本身是一个函数，接受源文件作为参数，返回转换的结果
  * loader 一般以 xxx-loader 的方式命名，xxx 代表了这个 loader 要做的转换功能，比如 less-loader。
* 理解 Plugins
  * 插件可以完成一些loader不能完成的功能。
  * 插件的使用一般是在 webpack 的配置信息 plugins 选项中指定。
* 配置文件(默认)
  * webpack.config.js : 是一个node模块，返回一个 json 格式的配置信息对象

### 2、开启项目
* 初始化项目：
  * 生成package.json文件
      ```   json
      {
        "name": "webpack-learn",
        "version": "1.0.0"
      }
      ```
* 安装webpack
  * npm install webpack webpack-cli -g  //全局安装,作为指令使用
  * npm install webpack webpack-cli -D //本地安装,作为本地依赖使用

### 3、编译打包应用
* 创建js文件
  * src/js/app.js
  * src/js/module1.js
  * src/js/module2.js
  * src/js/module3.js
* 创建json文件
  * src/json/data.json  
* 创建主页面: 
  * src/index.html
* 运行指令
  * 开发配置指令：webpack src/js/app.js -o build/js/app.js --mode=development
    * 功能: webpack能够编译打包js和json文件，并且能将es6的模块化语法转换成浏览器能识别的语法
  * 生产配置指令：webpack src/js/app.js -o build/js/app.js --mode=production
    * 功能: 在开发配置功能上加上一个压缩代码
* 结论：
  * webpack能够编译打包 js 和 json 文件
  * 能将 es6 的模块化语法转换成浏览器能识别的语法
  * 能压缩代码
* 缺点：
  * 不能编译打包 css、img 等文件
  * 不能将 js 的 es6 基本语法转化为 es5 以下语法
* 改善：使用 webpack 配置文件解决，自定义功能

### 4、使用 webpack 配置文件
* 目的：在项目根目录定义配置文件，通过自定义配置文件，还原以上功能
* 文件名称：webpack.config.js
* 文件内容：
    ```js
    //node内置核心模块，用来设置路径。
    const { resolve } = require('path');
    //只能使用 CommonJS 规范暴露
    module.exports = {
      // 入口文件配置
      entry: './src/js/app.js',   			
      // 输出配置
      output: {         
        // 输出文件名
        filename: './js/built.js',    
        //输出文件路径配置
        path: resolve(__dirname, 'build')   
      },
      // development 与 production 开发环境(二选一)
      mode: 'development'   				
    };
    ```
* 运行指令： webpack

### 5、打包 less 资源
less 文件 webpack 不能解析，需要借助 loader 编译解析，使用步骤如下：

1. 创建less文件
  * src/less/test1.less
  * src/less/test2.less

2. 入口app.js文件

  ```js
  //引入两个 less 文件
  import '../css/test1.less';
  import '../css/test2.less';
  ```

3. 安装 loader

  ```shell
  npm install css-loader style-loader less-loader less --save-dev 
  ```

4. 配置 loader
    ```js
    module.exports = {
        .
        .
        .
        module:{
            rules:[
                {
                    test:/\.less$/,  		// 检查文件是否以.less结尾（检查是否是less文件）
                    use:[					// 数组中loader执行是从下到上，从右到左顺序执行
                        'style-loader', 	// 创建style标签，添加上js中的css代码
                        'css-loader', 		// 将css以commonjs方式整合到js文件中
                        'less-loader' 		// 将less文件解析成css文件
                    ]
                }
            ]
        },
    }
    ```

5. 运行指令

    ```shell
    > webpack
    ```

### 6、JS 语法检查
webpack 使用 ESLint（<https://eslint.bootcss.com/>） 能对 JS 基本语法错误/隐患进行提前检查，==但是不能检测运行时错误==，使用步骤	

1. 安装loader

   ```shell
   npm install eslint-loader eslint --save-dev
   ```

   > eslint 是语法检查的包
   >
   > eslint-loader 是 eslint 在 webpack 中的 loader 包

2. webpack.config.js 配置 loader

   ```js
   module.exports = {
       .
       .
       .
       module: {
           rules: [
       		.
       		.
       		.
               {
                   test: /\.js$/,                  //只检测js文件
                   exclude: /node_modules/,        //排除node_modules文件夹
                   enforce: "pre",                 //提前加载使用
                   use: {                          
                       loader: "eslint-loader"		//使用eslint-loader解析
                   }
               }
           ]
       }
   }
   ```


3. 创建 `.eslintrc.js` 文件

    ```js
    module.exports = {
        "parserOptions": {
            "ecmaVersion": 6, 				// 支持es6
            "sourceType": "module"			// 使用es6模块化
        },
        "env": { 							// 设置环境
            "browser": true,   				// 支持浏览器环境： 能够使用window上的全局变量
            "node": true       				// 支持服务器环境:  能够使用node上global的全局变量
        },
        "globals": {						// 声明使用的全局变量, 这样即使没有定义也不会报错了
            "$": "readonly"					// $ 不允许重写变量
        },
        "rules": {  						// eslint检查的规则  0 忽略 1 警告 2 错误
            "no-console": 0, 				// 不检查console
            "eqeqeq": 0,					// 用 == 而不用 === 就报错
            "no-alert": 0 					// 不能使用alert
        },
        "extends": "eslint:recommended" 	// 使用eslint推荐的默认规则
    }
    ```

4. 运行指令

   ```shell
   > webpack
   ```


### 7、JS 语法转换
借助 Babel 可以将浏览器不能识别的新语法（ES6, ES7）转换成原来识别的旧语法（ES5），浏览器兼容性处理

1. 安装loader

   ```shell
   >{
   ```

   > @babel/core  是 babel 的核心库
   >
   > @babel/preset-env  是 babel 的预设的工具包，默认可以将所有最新的语法转为为 ES5
   >
   > babel-loader   是 babel 在 webpack 中的 loader 包

2. 配置loader

    ```js
    module: {
      rules: [
        .
        .
        .
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
    ]
    }
    ```

3. 运行指令
  ```
  > webpack	
  ```


### 8、JS 兼容性处理

Polyfill 是一块代码（通常是 Web 上的 JavaScript），用来为旧浏览器提供它没有原生支持的较新的功能

1. 安装 polyfill

   ```shell
   > npm install @babel/polyfill
   ```

2. app.js（入口文件）引入

  ```js
  import '@babel/polyfill';
  ```

> 解决 babel 只能转换语法的问题(如：let/const/解构赋值...)，引入polyfill可以转换高级语法(如:Promise...)



### 9、打包样式文件中的图片资源

图片文件 webpack 不能解析，需要借助 url-loader编译解析

1.  两张资源图片:
   * 小图, 小于8kb: src/images/vue.png
   * 大图, 大于8kb: src/images/react.jpg

2. 在 less 文件中通过背景图的方式引入图片

    ```css
    .react {
      width: 200px;
      height: 200px;
      background: url('../images/react.png') no-repeat;
      background-size: cover;
    }

    .vue {
      width: 200px;
      height: 200px;
      background: url('../images/vue.png') no-repeat;
      background-size: cover;
    }
    ```

3. 安装 loader
  ```shell
  > npm install file-loader url-loader --save-dev 
  ```

  > 补充：url-loader是对象file-loader的上层封装，使用时需配合file-loader使用。

4. webpack.config.js 配置 loader
    ```js
    module.exports = {
        .
        .
        .
        module: {
            rules: [
                .
                .
        		.
                {
                    test: /\.(png|jpg|gif)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,               		// 8kb以下的图片会base64处理
                            outputPath: 'images',           // 文件本地输出路径
                            publicPath: '../build/images',   // 图片的url路径
                            name: '[hash:8].[ext]',         // 修改文件名称和后缀 
                        }
                    }
                },
            ]
        }

    }
    ```

5. 运行指令

    ```shell
    > webpack
    ```


### 10、打包 HTML 文件
 HTML 文件不能直接被 webpack 解析，需要借助 `HtmlWebpackPlugin` 插件编译解析

1. 在 src 目录下创建 index.html 文件，==注意不要在 HTML 中引入任何 CSS 和  JS  文件==

2. 安装插件 

   ```shell
   > npm install html-webpack-plugin --save-dev 
   ```

3. webpack.config.js 修改配置

   ```js
   // 插件都需要手动引入
   const HtmlWebpackPlugin = require('html-webpack-plugin');
   .
   .
   module.exports = {
       .
       .
       plugins: [
           new HtmlWebpackPlugin({
               template: './src/index.html', // 设置要编译的 HTML 源文件路径
           })
       ]
   }
   ```

4. 运行指令

    ```
    > webpack
    ```

> src 目录就是源文件目录，所有的代码和资源都保存在该目录，index.html 也是如此

### 11、打包 HTML 中图片资源
url-loader 只能处理 JS 和 CSS 中引入的图片，无法处理 HTML 中的 img 图片，需要 html-loader 处理。

1. src/index.html 添加 img 标签

  ```html
  <img src="./images/sun.jpg" alt="">
  ```

2. 安装loader

  ```shell
  > npm install html-loader --save-dev 
  ```

3. 配置loader
    ```js
    module.exports = {
        .
        .
        .
        module: {
            rules: [
                .
                .
                .
                {
                    test: /\.(html)$/,
                    use: {
                        loader: 'html-loader'
                    }
                }
            ]
        }
    }
    ```

4. 运行指令
  ```
  > webpack
  ```

### 12、打包字体资源
字体文件需要借助 file-loader 编译解析，以 iconfont 为例，下载一个项目

1. 将字体文件保存在 `src/fonts` 目录下
  * src/fonts/iconfont.eot
  * src/fonts/iconfont.svg
  * src/fonts/iconfont.ttf
  * src/fonts/iconfont.woff
  * src/fonts/iconfont.woff2

2. 创建 src/css/iconfont.less 并将 iconfont 的 css 样式粘到 less 文件中，并修改字体路径
    ```css
    @font-face {
      font-family: 'iconfont';
      src: url('../fonts/iconfont.eot');
      src: url('../fonts/iconfont.eot?#iefix') format('embedded-opentype'),
          url('../fonts/iconfont.woff2') format('woff2'),
          url('../fonts/iconfont.woff') format('woff'),
          url('../fonts/iconfont.ttf') format('truetype'),
          url('../fonts/iconfont.svg#iconfont') format('svg');
    }

    .iconfont {
      font-family: "iconfont" !important;
      font-size: 16px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    ```

3. 修改 `src/index.html`

    ```html
    <span class="iconfont">&#xe8ab;</span>
    ```

4. 配置 loader
    ```js
    module.exports = {
        .
        .
        .
        module: {
            rules: [
                .
                .
                .
                {
                    test: /\.(eot|svg|woff|woff2|ttf|mp3|mp4|avi)$/,  // 处理字体文件
                    loader: 'file-loader',
                    options: {
                      outputPath: 'fonts',
                      name: '[hash:8].[ext]'
                    }
                }
            ]
        }
    }
    ```

5. 运行指令

    ```shell
    > webpack
    ```



### 13、自动编译打包运行

之前的操作，每次修改代码都需要重新执行 webpack 命令，可以使用 webpack-dev-server 自动打包运行

1. 安装 loader

  ```shell
  > npm install webpack-dev-server --save-dev
  ```

2. 详细配置见官网 <https://www.webpackjs.com/configuration/dev-server/>

3. 修改 webpack.config.js
    ```js
    .
    .
    .
    module.exports = {
        .
        output: {
            path: resolve(__dirname, 'build'),
            filename: 'js/app.js',
            //1. 添加 devServer 服务后需要调整输出的路径
            publicPath: '/'
        },
        module: {
            rules: [
                .
                .
                .
                {
                    test: /\.(png|jpg|gif)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,               		
                            outputPath: 'images',           
                            name: '[hash:8].[ext]',       
                			//2. 删除 publicPath 配置
                        }
                    }
                },
                

            ]
        },
        .
        .
        //3. 增加 devServer 配置
        devServer: {
            open: true, 	// 自动打开浏览器
            compress: true, // 启动gzip压缩
            port: 3000, 	// 端口号
        },
        mode: 'development'
    }
    ```
4. 现在就可以启动服务
  ```shell
  > npx webpack-dev-server
  ```

5. 配置 package.json 中 scripts 指令。增加 server 配置

   ```json
   {
      .
      .
      .
      "scripts": {
           "server": "webpack-dev-server" 
       },
      .
      .
      .
    }
    
   ```

6. 运行指令

   ```shell
   > npm run server 
   ```



### 14、热模替换功能
模块热替换 (HMR - Hot Module Replacement) 功能会在应用程序运行过程中替换、添加或删除模块，而无需重新加载整个页面，详细配置地址（<https://www.webpackjs.com/guides/hot-module-replacement/>）

修改 webpack.config.js 的 devServer 配置
```js
.
.
.
module.exports = {
    //index.html 不能自动刷新的解决方法
    //新增一个入口，解决开启热模块替换后首页无法刷新的问题
    entry: {
        main:['./src/js/app.js','./src/index.html']
    },
    .
    .
    .
    devServer: {
        open: true, 	
        compress: true, 
        port: 3000, 	
        hot: true		// 开启热模块替换功能
    },
    mode: 'development'
}
```



### 15、devtool

devtool 是 webpack 中的一个配置， 可以将压缩/编译文件中的代码映射回源文件中的原始位置，便于调试代码

详细配置官网地址 <https://www.webpackjs.com/configuration/devtool/>

配置 webpack.config.js 

```js
.
.
.
module.exports = {
    .
    .
    .
    devtool:  'cheap-module-eval-source-map', //设置 devtool 策略
    mode: 'development'
}
```

推荐使用：
* 开发环境： cheap-module-eval-source-map
* 生产环境： source-map     none

### 16、准备生产环境
webpack 可以使用不同的配置文件，进行不同的编译。

1. 创建文件夹 config，将 webpack.config.js 复制两份

    * ./config/webpack.dev.js
    * ./config/webpack.prod.js

2. 修改 webpack.prod.js 配置，删除 webpack-dev-server 配置

    ```js
    .
    .
    .
    module.exports = {
        entry: {
            main:['./src/js/app.js','./src/index.html']
        },
        .
        .
        .
        //1. 设置 devtool
        devtool: 'source-map',
        //2. 设置 mode
        mode: 'production'
        //3. 删除 devServer 配置
    }
    ```
3. 修改 package.json 的指令

  ```json
  {
  	.
  	.
  	.
  	"scripts": {
          "dev": "webpack-dev-server --config ./config/webpack.dev.js",
          "build": "webpack --config ./config/webpack.prod.js"
      }
      .
      .
      .
  }
  ```

4. 开发环境指令
  * npm run dev   		用于开发环境   不打包文件
  * npm run build        用于生产环境    打包文件 （==打包后的index.html不能直接双击打开，需要启动服务==）
### 17、清除打包文件目录
每次打包生成了文件，都需要手动删除，引入插件 `clean-webpack-plugin` 帮助我们自动删除上一次生成的文件

1. 安装插件

   ```shell
   > npm install clean-webpack-plugin --save-dev
   ```

2. `webpack.prod.js` 引入插件

   ```js
   //1. 引入插件
   const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
   .
   .
   .
   module.exports = {
       .
       .
       .
       plugins: [
           new HtmlWebpackPlugin({
               template: './src/index.html', 
           }),
           //2. 配置插件
           new CleanWebpackPlugin() 
       ],
   }
   ```

3. 运行指令

   ```shell
   > npm run build
   ```

### 18、提取 CSS 成单独文件

前面的 CSS 样式代码都是放在 style 标签中，这里可以借助 mini-css-extract-plugin 抽离 CSS 文件

1. 安装插件

  ```shell
  > npm install mini-css-extract-plugin --save-dev 
  ```

2. 配置 webpack.prod.js

  ```js
  .
  .
  // 1. 引入插件
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");

  module.exports = {
      .
      .
      .
      module: {
          rules: [
              {
                  test: /.less$/,
                  use: [
                      MiniCssExtractPlugin.loader,   	// 2. 修改配置 loader
                      'css-loader',
                      'less-loader'
                  ]
              }
          ]
      },
      plugins: [
          .
          .
          new MiniCssExtractPlugin({					// 3. 配置插件
              filename: "css/[hash:8].css",
          })
      ]
      .
      .
  }
  ```

3. 运行指令
  ```
  > webpack
  ```

### 19、添加 CSS 兼容
* 安装 loader

  ```shell
  > npm install postcss-loader autoprefixer --save-dev 
  ```

* 配置 loader
  ```js
  .
  .
  .
  module.exports = {
     	.
      .
      module: {
          rules: [
              {
                  test: /\.less$/, 
                  use: [
                      MiniCssExtractPlugin.loader,
                      'css-loader',
                      {
                          loader: 'postcss-loader',      		// 1. 设置 postcss-loader
                          options: {
                              plugins: [
                                  require("autoprefixer") 	// 2. 配置插件
                              ]
                          }
                      },
                      'less-loader',
                  ]
              },
              .
              .
          ]
      }
      
  }
  ```

* 在项目目录下创建 `.browserslistrc`  ==这里一要加目标浏览器设置==
  ```con
  chrome 50
  last 1 versions
  ie 10
  iOS 7
  ```

* 运行指令：

  ```shell
  > npm run build
  ```

  ​

### 20、压缩 CSS
1. 安装插件

   ```shell
   > npm install optimize-css-assets-webpack-plugin --save-dev 
   ```

2. 引入插件，配置插件

    ```js
    //1. 引入插件
    const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

    module.exports = {

        plugins: [
            .
            .
            .
            //2. 配置插件
            new OptimizeCssAssetsPlugin({
                cssProcessorPluginOptions: {
            		//移除所有的注释
                    preset: ['default', {discardComments: {removeAll: true}}],
                },
                // 解决没有source map问题
                cssProcessorOptions: {                  
                    map: true
                }
            })
        ],
        mode: 'production'
    }
    ```

3. 运行指令

   ```shell
   > npm run build
   ```


## 附录

### browserslist 

browserslist 目标浏览器配置表，可以针对目标浏览器进行编译处理，避免不必要的兼容代码

配置的方法有两种，一种是在 package.json 中，一种是创建 `.browserslistrc`

package.json 形式

```json
{
	.
	.
	.
	"browserslist": [
        "> 1%",
        "last 2 versions"
    ]
}
```

`.browserslistrc` 形式

```
> 1%
last 2 versions
```

配置规则介绍

| 规则                     | 介绍                               |
| ---------------------- | -------------------------------- |
| > 1%                   | 全球超过1%人使用的浏览器                    |
| > 5% in US             | 指定国家使用率覆盖                        |
| last 2 versions        | 所有浏览器兼容到最后两个版本根据CanIUse.com追踪的版本 |
| Firefox > 20           | 指定浏览器的版本范围                       |
| not ie <=8             | 排除 ie8 及以下                       |
| Firefox 12.1           | 指定浏览器的兼容到指定版本                    |
| since 2013             | 2013年之后发布的所有版本                   |
| not dead with > 0.2%   | 仍然还在使用且使用率大于 0.2%                |
| last 2 Chrome versions | 最新的两个 Chrome 配置                  |
| cover 99.5%            | 99.5% 的浏览器都是目标                   |



​							