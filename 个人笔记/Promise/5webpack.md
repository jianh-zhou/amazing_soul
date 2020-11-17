# 5webpack

## 介绍

### 1 webpack是一个模块打包器(bulder)

### 2 在webpack看来,前端所有的文件(png/js/css/less/sass...),作为模块处理

### 3 它根据模块的的依赖关系进行静态分析.生成对应的静态资源

## 5个核心概念

### Entry

- 入口起点(entry point)指示webpack应该使用哪个模块,来作为其作为内部依赖图的开始

### Output

- Output属性告诉webpack它在哪里输它创建的budles,以及如何命名这些文件

### Loader

- Loader可以让webpack能够处理非js文件

### Plugins

- 可以执行更广泛的任务,例如打包优化

### Mode

- 模式,有生产环境prodction和开发环境development

## Loader

### webpack本身只能加载js/json模块,如果要加载其他模块(文件),则需要使用对应的loader进行转换加载

### Loader是运行在node.js环境中的javascript模块

### 本身是一个函数,接收源文件作为参数,返回转换的结果

### loader一般以xxx-loader命名,xxx代表这个loader转换的功能,比如less-loader

## Plugins

### 插件可以完成loader不能完成的功能

### 插件的使用一半是在webpack的配置信息中的plugins选项中指定

## 零配置

### 零配置它不需要配置,会默认将src文件夹下的index.js文件进行打包

### 默认打包到生产环境

### 默认打包到dist文件夹下,打包后的文件时main.js

## 开启项目

### 1 初始化项目,生成pack.json文件

### 安装webpack

- npm install webpack webpack-cli -g  //全局安装,作为指令使用
- npm install webpack webpack-cli -D //本地安装,作为本地依赖使用

## 使用webpack配置文件

### 1 创建一个webpack.config.json配置文件

### //node内置核心模块，用来设置路径。
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

### 3  运行指令： webpack

## 其他配置减webpack.md文件

