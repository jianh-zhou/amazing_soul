#### 1 webpack 是什么

- webpack 是一个前端资源构建工具,一个静态模块打包器,在 webpack 看来,前端所有的文件都可以作为一个模块来处理,它将根据模块的依赖关系进行静态分析,打包生成对应的静态资源(bundle)
- 根据入口文件的依赖关系,将资源引进来,形成 chunk 代码块,根据不同的资源对代码块进行编译,这个处理我们称之为打包,打包之后的文件交 bundle

#### webpack 的五个核心概念

###### Entry

- 入口指示以哪个文件为起点进行打包,分析构建内部依赖图,

###### OutPut

- 设置打包后的文件资源存储的位置,以及文件如何命名

###### Loader

- webpack 只认识 javascript 文件,通过 loader 让其认识其他文件,并且进行处理

###### Plugins

- 插件可以执行更广泛的任务,做一些 Loader 无法做的事情,比如打包优化,代码压缩,一直到定义环境中的变量等

##### Mode

- 设置 webpack 使用的模式的配置
  - development(开发环境),设置 process.ecv.NODE_ENV 为 development,将会启用一些插件,保证代码可以运行即可
  - production(生产环境),设置 process.ecv.NODE_ENV 为 production,将会启用更多的插件,保证代码优化上线

#### webpack 基础知识

- 1 webpack ./src/index.js -o ./bulid --mode-development
  以./src/index.js 文件为入口文件开始打包,打包后输出到./bulid 文件夹下,打包环境为开发环境
- 2 webpack 只能处理 js 和 json 文件,不能处理 css 等其他文件
- 3 开发环境比生产环境打包多了一个代码压缩
- 4 生产环境和开发环境都会将 ES6 模块化编译为浏览器能够识别的模块化
