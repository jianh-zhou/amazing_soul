## TS 编译选项

#### 1 tsconfig.json,该文件是 TS 的配置文件,TS 可以根据他的信息对代码进行编译

- 1 include 用来指定 TS 要指定编译那些文件
  - "include":["./src/**/*"] 包含 src 文件夹下的所有文件夹下的所有文件都会进行编译 \**表示所有文件夹,*表示所有文件
- 2 exclude 用来指定 TS 指定某些文件不需要编译,与 include 相反
  - "exclude":["./src/**/*"]
  - 默认值:["node_modules","bower_components","jspm_psckages"]
- 3 extends 定义被继承的配置文件,在有多个配置文件时,这个文件可以通过这个方式继承到其他配置文件的配置
  - "extends":"./code/part2/tsconfig.json"
- 4 files 表示要指定某些文件要被 TS 编译,和 includes 有点类型
- 5 complierOptions 编译器的选项,最重要的配置选项,里面的配置子选项决定怎么编译 TS
  - "target":"es2015" 该配置选项用来指定 TS 编译的 ES 的版本
  - "module":"es2015" 配置 TS 编译的模块化的规范
  - "lib":[] 指定项目使用的库
  - "outDir":"./dist" 用来指定编译后的文件存放的位置
  - "outFile":"" 可以将编译后的所有全局作用域的代码合并在一起
  - "allowJs":false 是否对 js 文件进行编译,默认不编译
  - "checkJs":false 是否检查 js 代码符合 TS 规范,默认是 false
  - "removeCommonts":false 是否在编译时去掉注释
  - "noEmit":false 不生成编译后的文件,
  - "noEmitOnError":false 当有错误时就不会编译对应的文件,默认为 false
  - "alwaysStrict":false 设置编译后的文件不使用严格模式,默认不使用
  - "noImplicitAny":false 允许隐式的 any 类型
  - "noImpLisitThis":true 设置为 true,在 this 不明确时会报错
  - "strictNullChecks":true 严格的检查空值,就是如果一个元素为空值时会报错,默认为 false
  - "strict":false 所有严格模式的总开关 ,默认为 false
