# nodejs核心模块

## Buffer缓冲器

### Bufffer 是什么

- 类似于数组的对象,专门用来储存二进制数据(存储二进制数据,性能最好)
- 不需要利用require()引入模块

### 特点

- 1 在定义时就确定了Buffer的大小,不能进行更改
- 2 每个元素为1字节
- 3 性能较好,直接对计算机的内存进行操作

### 创建Buffer

- Buffer.alloc(size[, fill[, encoding]])

	- 在内存中寻找一片区域,清空并创建一个空的Buffer
	- 不写第二个参数,默认全部都是0
	- 第二个参数是要填充的字符串

- Buffer.allocUnsafe(size)

	- 在内存中寻找一片区域,但不会初始化,可能就会包括一些敏感的数据

		- 因为计算机清除内存时,是在空闲时才删除,所以可能会有残留的数据

	- 该方法是创建最快的

- Buffer.from(str)

	- 返回一个被String初始化的实例

### 存储单位的换算

- 1byte  是由8个二进制数组成的
- 1byte(字节)=8bit
- 1kb=1024byte
- 1个汉字=3个字节
- 1个字母=1个字节

## process

### 提供nodejs进程的相关信息,并对其进行控制 

### 在使用该模块时,不需要require()引用,直接使用即可

### argv属性

- 该属性返回一个数组
- 数组的第一个值是nodejs命令安装路径 
- 数组的第二个值是当前js文件的绝对路径
- 启动命令

	- node ./文件名 
	- node ./文件名 hello

		- 数组的第三个元素就是文件名后面的hello
		- 可以同过对应的启动命令,执行相应的操作

### argv0属性

- 返回的是nodejs程序目录

### env属性

- 返回值是包含返回或设置用户环境的对象

	- path-->遍历各个路径,找到程序运行

- NODE_ENV属性

	- 可以通过该属性设置生产环境还是开发环境,从而进行判断

### exit( )

- 可以用来结束进程

### cwd( )

- 返回nodejs运行环境的绝对路径
- 就是启动时候所在的绝对路径,不是当前文件所在的绝对路径

## path路径

### 在使用该模块时,需要利用require()引入该模块

### path.resolve([...paths])

- 将路径或路径片段的序列解析为绝对路径
- 参数可以是相对路径,如果是相对路径可能不准确
- path.resolve(__dirname,'./01.txt')

	- 可以通过第一个参数为绝对路径,可以得到一个准确的路径地址
	- __dirname

		- 当前js文件的所在文件夹的绝对路径地址

## fs 文件系统

### fs文件系统

- 在使用该模块时,需要利用require( )方法引入模块
- 里面的大部分方法都有同步和异步之分

	- 同步

		- 带有sync字样
		- 不会阻塞代码运行
		- 返回值就是该方法的返回值

	- 异步

		- 会阻塞代码运行
		- 方法得到的返回值,在回调函数中

### 同步写入

- 需要通过path.resolve( )获得文件的绝对路径
- 打开文件

	- fs.openSync(path[, flags, mode]),

		- path

			- 要打开文件的绝对路径

		- flags

			- 'w'

				- 没有该文件时,会创建该文件,在写入时,会覆盖之前的

			- 'a'

				- 没有该文件时,会创建该文件,在写入时,会对之前的内容进行追加

			- 's'

				- 只对文件进行读取,如果没有该文件,会出错

		- mode

			- mode:默认值一般是0o666 一般不会修改（尤其windows系统）
      

		- 返回值

			- 返回一个fd(句柄).是一个数字,是唯一的

- 文件写入

	- fs.writeSync(fd, string[, position[, encoding]])

		- fd

			- 文件的句柄

		- string

			- 要在文件中写入的内容

		- encoding

			-  写入文件的编码，默认utf-8

		- positon

			- 写入的起始位置

				- 代表多少个字节

- 关闭文件

	-  fs.closeSync(fd)

		- fd 文件的句柄

### 异步写入

- 需要通过path.resolve( )获得文件的绝对路径
- 打开文件

	- fs.open(path, flags[, mode], callback)

		- path

			- 要打开文件的绝对路径

		- flags

			- 'w'

				- 没有该文件时,会创建该文件,在写入时,会覆盖之前的

			- 'a'

				- 没有该文件时,会创建该文件,在写入时,会对之前的内容进行追加

			- 's'

				- 只对文件进行读取,如果没有该文件,会出错

		- mode

			- mode:默认值一般是0o666 一般不会修改（尤其windows系统）
       

		- callback

			- 参数

				- 第一个参数为err,表示错误对象

					- nodejs中,我们提倡错误优先原则,遇到错误优先执行,该错误对象不发生错误时为null,发生错误时为一个对象
					- 可以通过该对象是否为null,来执行是否退出该阶段

				- 第二个参数 文件的句柄

- 写入文件

	- fs.write(fd, string[, position[, encoding]], callback)

		- fd

			- 文件的句柄

		- string

			- 要在文件中写入的内容

		- encoding

			-  写入文件的编码，默认utf-8

		- positon

			- 写入的起始位置

				- 代表多少个字节

		- callback

			- 参数

				- err,错误对象
				- 写入内容的字节大小

- 文件关闭

	- fs.close(fd, callback)

		- fd

			- 文件的句柄

		- callback

			- 参数

				- err,错误对象

### 简单写入

- 1 引入对应模块
- 2 获取写入文件绝对路径
- 3 fs.writeFile(file, data[, options], callback)

	- 参数1 file

		- 要写入文件的绝对路径

	- 参数2 data

		- 要写入的数据

			- string
			- Buffer

	- 参数3 options

		- 配置对象( 默认)

			- {encoding:"utf8",flag:"w",mode:0666}

	- 参数4 callback

		- 回调函数

			- 回调函数参数

				- 错误error

### 创建可写流

- 1 引入对应的 path模块和fs模块
- 2 利用path的resolve,得到引入文件的绝对路径
- 3 创建一个可写流

	- const  ws=fs.createWriteStream(path1) 

- 4 写入数据

	- ws.write(data)

- 5 关闭可写流

	- ws.end( )

		- 关闭可写流的起始端,不会造成数据的流失

	- ws.close( )

		- 关闭可写流的末端,可能会造成数据的流失

- 事件

	- 可写流开始写入触发

		- ws.once( 'open',( )=>{     })

	- 可写流关闭触发

		- ws.once( 'close' ( )=>{     }) 

	- on会一直监听,once只会触发一次

### 简单读取文件

- 1 引入对应的 path模块和fs模块
- 2 利用path的resolve,得到引入文件的绝对路径
- 3 fs.readFile(path[, options], callback)

	- 参数1 file

		- 要写入文件的绝对路径

	- 参数2 options

		- 配置对象( 默认)

			- {encoding:"utf8",flag:"w",mode:0666}

	- 参数3 callback

		- 参数1 error
		- 参数2 data

			- 读取到的数据(Buffer) 

### 创建可读流

- 1 引入对应的 path模块和fs模块
- 2 利用path的resolve,得到引入文件的绝对路径
- 3 创建一个可读流

	- const rs=fs.createReadStream( path1)

- 4 读取数据

	- rs.on('data' .(chuck)=>{ console. log(chuck.toString( )}

- 5 关闭可读流

	- rs.on('end', ( )=>{console.log('可读流关闭了')}

### 读写流

- 方法1

	- 1 引入对应的 path模块和fs模块
	- 2 利用path的resolve,得到引入文件的绝对路径
	- 3 创建可读流和可写流
	- 4 在可读流中的读的事件的回调函数中将chuck数据写入到可写流中
	- 5 关闭可读流

- 方法2 

	- 1 引入对应的 path模块和fs模块和stream模块中的pipeline模块
	- 2 利用path的resolve,得到引入文件的绝对路径
	- 3 创建可读流和可写流
	- 5 rs.pipe( ws)

		- 读写完自动关闭
		- 是可读流的一个方法

### promiify

- 是util工具包中的一个对象

	- const {promisify} =require('util')

- 该方法传入指定的对象,返回一个promise对象,,如果不出现错误,则返回成功状态

## events 事件触发器

### 使用时需要require( ) 引入

- const events=require('events)

### 设置一个类继承events类

- class myevets extends events{  }
- const myEventsObject=new myevents( )
- myEventsObject.on('lalala',( )=>{ console.log('啦啦啦')}

### 触发事件

- events.emit('lalala')

### 在使用时,我么不直接使用events,而是让一个类继承events,通过该类的实例化对象,来自定义事件,因为是自定义事件,项目中都用这个events定义事件,可能会出现重复

## crypto 加密器

### 在使用时需要require( )引入该模块

### 提供了一种加密功能,包括对 OpenSSL 的哈希、HMAC、加密、解密、签名、以及验证功能的一整套封装

### 采用的是消息摘要加算法

- MD5  sha1 sha256 sha512
- 1 得到的密文长度固定
- 2 一样的明文得到的密文一样
- 3 不可逆(密文不能转换为明文)

### 创建一个密文

- const secret=crypto.createHash('MD5' , str).digest('hex')
- digest('hex')

	- 该方法可以将createHmac方法返回的对象,转换为哈希值

### 对密文进行加料

- crypto.createHmac(MD5,'hhhh')

