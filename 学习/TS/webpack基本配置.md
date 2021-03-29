```js
// 引入一个包
const path = require('path')
// 自动生成html文件,并且会自动引入css,js
const htmlWebpackPlugin = require('html-webpack-plugin')
// 每次打包前自动删除打包目录下的文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  // 指定入口文件
  entry: './src/index.ts',
  // 指定打包后的文件所在目录
  output: {
    // 指定打包后的文件目录
    path: path.resolve(__dirname, 'dist'),
    // 指定打包后的文件
    filename: 'bundle.js',
    // 设置webpack的打包配置
    environment: {
      //  设置最外层不用箭头函数包装,用普通函数
      arrowFunction: false,
    },
  },
  // 指定打包后的要使用的模块
  module: {
    // 指定要加载的规则
    rules: [
      {
        // 指定规则生效的文件
        test: /\.ts$/,
        // 指定要使用的loder
        use: [
          {
            // 指定;加载器
            loader: 'babel-loader',
            // 设置babel
            options: {
              // 设置预定义的环境
              presets: [
                [
                  // 指定环境的插件
                  '@babel/preset-env',
                  // 配置信息
                  {
                    // 要兼容的目标浏览器
                    targets: {
                      chrome: '58',
                      ie: '11',
                    },
                    // 指定core-js的版本
                    corejs: '3',
                    // 使用core-js的方式,'usage'表示按需加载
                    useBuiltIns: 'usage',
                  },
                ],
              ],
            },
          },
          'ts-loader',
        ],
        // 指定不使用规则的文件
        exclude: /node_modules/,
      },
    ],
  },
  // 配置webpack插件
  plugins: [
    new htmlWebpackPlugin({
      // 设置html的title
      // title:'这是一个自定义的title'
      // 以这个文件为模板进行生成html
      template: './index.html',
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
}
```
