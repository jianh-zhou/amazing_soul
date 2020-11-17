# 1 MongoDB的基础介绍及使用

## 1  数据库的介绍

### 1 内存和磁盘的区别

- 1 内存存储数据,断电后就会消失,但是运行速度很快
- 2 磁盘存储数据,持久化存储,断电后不会消失,运行速度较慢

### 2 关系型数据库和非关系型数据库

- 关系型数据库(MySQL)

	- 1 直接磁盘中进行I/O操作(效率较低)
	- 2 能使用SQL语句
	- 3 只能存储基本数据类型

- 非关系型数据库(MongoDB)

	- 1 在内存和磁盘中进行操作.现在内存中进行存储,一段时间后会在磁盘中进行存储
	- 2 不能使用SQL语句
	- 3 可以存储复杂数据类型

## 2 MongoDB的简单介绍

### use 数据库名称	->	切换当前数 ,如果切换到不存在的数据库,也不会出错据库

### database->数据库

### collection->集合

### document->文档(数据)->key(属性名或者字段名)-value

## 3 MongoDB的CRUD

### 添加数据

- db.collection.insert(需要插入的数据)
- 需要插入的数据可以是对象,也可以是数组(存储多个对象)

### 读取数据

- query对象

	- db.collection.findOne(Query对象)
	- db.collection.find(Query对象)

- 子主题 2
- 条件规则

	- $in

		- 个字段名有多种情况,满足其中一种情况即可
		- db.collection.find({age:{$in:[12,16]}})


	- $nin

		- 与$in相反

	- $and

		- 多个字段名的条件,必须全部满足才行

	- $where	

		- 函数,函数返回值为true代表当前文档对象符合条件,反之则不符合,通过this获取当前的文档对象,例如:this.age

	- 
模糊匹配
依靠正则表达式实现

- 比较符

	- $gt $gte $lt $lte $ne
	- db.collection.find({age:{$lt:数值}})

- 投影

	- db.collection.find(Query对象,投影条件对象)	->字段名:值->
	- 值为0,代表当前文档对象所有的字段名,除了这个不要
	- 值为1,代表当前文档对象所有的字段名,只要这个,其余不要
	- _id,如果不对其进行针对设置,默认会存在

### 更新数据

-  db.<collection>.updateOne(查询条件,更新内容) 

	- 修改某条文档记录

-    db.<collection>.updateMany(查询条件,更新内容)

	- 批量修改文档记录

- 更新修饰符

	-   $set  -->  db.<collection>.updateOne({name:"小明"},{$set:{age:25}})  ------>  将name为小明的文档记录中的age值改为25
	- $inc  -->  db.<collection>.updateMany({},{$inc:{age:1}})  ------>  将所有的文档记录中的age值加1

### delete  删除

- db.<collection>.remove(查询条件)  

	- 删除某条文档记录

- db.<collection>.drop() 

	-  删除某个集合

-  db.dropDatabase()  

	- 删除某个数据库

- 意:在实际开发中,由于数据非常宝贵,我们一般宁愿添加十条,也不愿删除一条
-  软删除

	-  给所有文档记录都添加一个字段,用于标记当前该条文档记录是否应该被删除

## 4 mongoose的基本使用

### 1) 在项目中下载mongoose

### 2) 引入mongoose

### 3) 连接数据库(通过mongoose提供的connect方法连接数据库)

### 4) 通过mongoose.connection.once()监听连接数据库是否成功

### 5) 创建Schema对象(约束对象),声明该集合内部每个字段的配置

- 语法:new Mongoose.Schema(字段配置对象)

	- type声明当前字段值的类型
	- required声明当前字段值是否必传
	- unique声明当前字段值是否可以重复
	- default声明当前字段值的默认值
	- mongoose.SchemaTypes.Mixed声明当前字段值的类型为任意类型(混合
	- [String]声明当前字段值的类型必须是数组,内部数据的类型必须是字符串

### 6 创建模型对象(Model)

- 语法:const studentsModel = mongoose.model(集合名称,约束对象)

### 7)创建文档对象

- 语法:const studentA = new studentsModel(传入所需的配置对象)

### 8)将文档对象保存至集合中

- 语法:studentA.save()  ->  返回值为Promise对象

## 5.通过model对象进行CRUD操作

### 1)添加:

-  StarsModel.create(字段值对象)

### 2)查找:

-  StarsModel.find(字段值对象)
-   StarsModel.findOne(字段值对象)

### 3)修改:

- StarsModel.updateOne({name:"小明"},{$set:{age:25}})  ------>  将name为小明的文档记录中的age值改为25
-   StarsModel.updateMany({},{$inc:{age:1}})  ------>  将所有的文档记录中的age值加1

### 4)删除:

- StarsModel.remove({name:"小明"})  ------>  删除name值为小明的文档对象
- StarsModel.updateMany({name:"小明"},{$set:{isDeleted:false}})  ------>  软删除


## 6.集合之间建立关联,并填充信息

### 1.首先创建存储所有老师信息的集合(teachers集合) ,每个老师都拥有名字和性别字段

### 2.创建所有班级信息的集合(classes集合)

- 每个班级都拥有班级名称和对应老师字段 由于每个班级有对应的老师,所以需要用到老师的信息,但是老师的信息在teachers集合中已经存在,再存储一份过于冗余,所以我们要将classes集合与teachers集合进行关联

### 3 关联语法:

- 通过ref属性声明teacherId字段与teachers集合中的_id字段相对应
		{
		    className:{
        			type:String,
        			unique:true,
        			required:true
            		     }, 
        		    teacherId:{
        			type:mongoose.Schema.Types.ObjectId,
        			ref:"teachers"
            		     }
		}

### 4 填充语法:

- 由于我们与已经通过classes集合中的teacherId与teachers集合进行关联
		输出信息时,可以通过填充语法将对应老师信息一并输出
		classesModel.find({},{_id:0,__v:0})
    		    .populate('teacherId',{_id:0,__v:0})
    		    .then((res)=>{
        			console.log(res)
    		    })

## 分支主题 7

