## 学习 vue.js 发布流程源码

### 1、 文件开头的一些依赖引入和函数声明

### 1.1 第一部分

可以看出这些模块都是通过 require 方式引入的，该引入方式会递归向上级寻找 node_modules 文件夹，如果找不到则会抛出错误

```js
const args = require('minimist')(process.argv.slice(2))
// 文件模块
const fs = require('fs')
// 路径模块
const path = require('path')
// 终端彩色输出
const chalk = require('chalk')
// 语义化版本，用于版本校验比较等
const semver = require('semver')
// 根据package.json文件获取系统版本
const currentVersion = require('../package.json').version
// 简单说就是交互式询问用户输入。
const { prompt } = require('enquirer')
// 执行命令，相当于我们在终端输入命令
const execa = require('execa')
```

#### 1.1.1 semver 语义化版本

语义化版本的 nodejs 的实现,用于版本校验等操，详情可查看<a href=“https://semver.org/lang/zh-CN/”>语义化版本</a>
<br>
版本格式：主版本号：次版本号：修订号

1. 主版本号当你做了不兼容的 Api 修改
2. 次版本号：当你做了向下兼容的新增功能
3. 修订号： 当你做了向下兼容的问题修正
   先行版本号及版本编译信息可以加到“主版本号.次版本号.修订号”的后面，作为延伸。主版本号改变，次版本号和修订号都需要归 0，次版本号类似

#### 1.1.2 execa 执行命令

简单来说就是执行命令的，类似我们在终端输入命令，比如 echo '哈哈哈’

```js
// 自执行函数前面必须要加；号，否则直接报错 这个错误让我一直以为是execa方法参数传递的问题
const execa = require('execa')；
(async () => {
  // 相当于直接在命令行输入 echo 'test'
  const { stdout } = await execa('echo', ['test'])
  console.log(stdout)
})()
```

#### 1.2、第二部分

```js
// 对应 yarn run release --preid=beta
// beta
const preId =
  args.preid ||
  (semver.prerelease(currentVersion) && semver.prerelease(currentVersion)[0])
// 对应 yarn run release --dry
// true
const isDryRun = args.dry
// 对应 yarn run release --skipTests
// true 跳过测试
const skipTests = args.skipTests
// 对应 yarn run release --skipBuild
// true
const skipBuild = args.skipBuild
//  读取packages文件夹不是.ts文件结尾并且 .开头的文件（包括文件夹）
const packages = fs
  .readdirSync(path.resolve(__dirname, '../packages'))
  .filter((p) => !p.endsWith('.ts') && !p.startsWith('.'))
```

#### 1.3 第四部分

```js
// 跳过的包
const skippedPackages = []
// 版本递增
const versionIncrements = [
  'patch', // 补丁版本
  'minor', // 较小的向下兼容版本
  'major', // 不向下的兼容版本
  ...(preId ? ['prepatch', 'preminor', 'premajor', 'prerelease'] : []),
]
const inc = (i) => semver.inc(currentVersion, i, preId)
// 该方法就是为了生成一个版本
semver.inc('3.2.4', 'prerelease', 'beta')
// 3.2.5-beta.0
```

#### 1.4 第四部分

```js
// 获取根据名字获取执行对应的执行文件路径
const bin = (name) => path.resolve(__dirname, '../node_modules/.bin/' + name)
// 真实执行终端命令
const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'inherit', ...opts })
// 打印信息，不执行终端命令
const dryRun = (bin, args, opts = {}) =>
  console.log(chalk.blue(`[dryrun] ${bin} ${args.join(' ')}`), opts)
// 根据命令行参数是否有dry 决定执行那个run方法还是dryRun方法
const runIfNotDry = isDryRun ? dryRun : run
// 获取包的路径
const getPkgRoot = (pkg) => path.resolve(__dirname, '../packages/' + pkg)
// 控制台输出
const step = (msg) => console.log(chalk.cyan(msg))
```

## 2.main 主函数

#### 2.1 获取想要发布的版本

```js
// 根据上文 mini 这句代码意思是 yarn run release 3.2.4
// 取到参数 3.2.4
let targetVersion = args._[0]

if (!targetVersion) {
  /* 
  命令行选择需要的版本。分别是:
    patch (3.2.5)
    minor (3.3。0)
    major (4.0.0)
    返回的release就是最终选中的版本
  */
  const { release } = await prompt({
    type: 'select',
    name: 'release',
    message: 'Select release type',
    choices: versionIncrements
      .map((i) => `${i} (${inc(i)})`)
      .concat(['custom']),
  })

  // 判断是否选则自定义版本
  if (release === 'custom') {
    // 如果选则就会继续在终端输入自己想要的版本
    targetVersion = (
      await prompt({
        type: 'input',
        name: 'version',
        message: 'Input custom version',
        initial: currentVersion,
      })
    ).version
  } else {
    // 通过正则匹配取到 major (4.0.0) 括号里面的版本号
    targetVersion = release.match(/\((.*)\)/)[1]
  }
}

// 校验 版本是否符合 规范
if (!semver.valid(targetVersion)) {
  throw new Error(`invalid target version: ${targetVersion}`)
}

// 终端确定是否要发布(输入y/n)
const { yes } = await prompt({
  type: 'confirm',
  name: 'yes',
  message: `Releasing v${targetVersion}. Confirm?`,
})

// false 直接返回
if (!yes) {
  return
}
```

#### 2.2 执行测试用例

```js
// 终端现在彩色文字 Running tests...
step('\nRunning tests...')
// 没有测试用例而且不是试发布
if (!skipTests && !isDryRun) {
  await run(bin('jest'), ['--clearCache'])
  await run('yarn', ['test', '--bail'])
} else {
  console.log(`(skipped)`)
}
```

#### 2.3 更新所有包的版本号和内部 vue 相关依赖版本号

```js
step('\nUpdating cross dependencies...')
updateVersions(targetVersion)
```

```js
function updateVersions(version) {
  // 1. update root package.json
  updatePackage(path.resolve(__dirname, '..'), version)
  // 2. update all packages
  packages.forEach((p) => updatePackage(getPkgRoot(p), version))
}
```

##### 2.3.1 updatePackage 函数，更新包的版本号

```js
function updatePackage(pkgRoot, version) {
  // 获取当前package.json文件的文件路径
  const pkgPath = path.resolve(pkgRoot, 'package.json')
  // 读取文件并且转成对象
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  // 直接修改版本号
  pkg.version = version
  //  packages.json 中 dependencies 中 vue 相关的依赖修改
  updateDeps(pkg, 'dependencies', version)
  //packages.json 中 peerDependencies 中 vue 相关的依赖修改
  updateDeps(pkg, 'peerDependencies', version)
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
}
```

##### 2.3.2 updateDeps 更新内部 vue 相关依赖的版本号

```js
function updateDeps(pkg, depType, version) {
  const deps = pkg[depType]
  if (!deps) return
  Object.keys(deps).forEach((dep) => {
    if (
      dep === 'vue' ||
      (dep.startsWith('@vue') && packages.includes(dep.replace(/^@vue\//, '')))
    ) {
      console.log(
        chalk.yellow(`${pkg.name} -> ${depType} -> ${dep}@${version}`)
      )
      deps[dep] = version
    }
  })
}
```

#### 2.4 打包编译所有包

```js
step('\nBuilding all packages...')
if (!skipBuild && !isDryRun) {
  await run('yarn', ['build', '--release'])
  // test generated dts files
  step('\nVerifying type declarations...')
  await run('yarn', ['test-dts-only'])
} else {
  console.log(`(skipped)`)
}
```

#### 2.5 生成 changelog

```js
// generate changelog
await run(`yarn`, ['changelog'])
// 对应命令 conventional-changelog -p angular -i CHANGELOG.md -s
```

#### 2.6 提交代码

```js
// 执行git diff命令，比较代码
const { stdout } = await run('git', ['diff'], { stdio: 'pipe' })
// 如果有改动
if (stdout) {
  step('\nCommitting changes...')
  // 执行 git addd -A
  await runIfNotDry('git', ['add', '-A'])
  // 执行git commit -m 'release: v${targetVersion}'
  await runIfNotDry('git', ['commit', '-m', `release: v${targetVersion}`])
} else {
  // 输出没有文件需要提交的日志
  console.log('No changes to commit.')
}
```

#### 2.7 发布

```js
step('\nPublishing packages...')
for (const pkg of packages) {
  await publishPackage(pkg, targetVersion, runIfNotDry)
}
```

```js
async function publishPackage(pkgName, version, runIfNotDry) {
  if (skippedPackages.includes(pkgName)) {
    return
  }
  const pkgRoot = getPkgRoot(pkgName)
  const pkgPath = path.resolve(pkgRoot, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  if (pkg.private) {
    return
  }

  // For now, all 3.x packages except "vue" can be published as
  // `latest`, whereas "vue" will be published under the "next" tag.
  let releaseTag = null
  if (args.tag) {
    releaseTag = args.tag
  } else if (version.includes('alpha')) {
    releaseTag = 'alpha'
  } else if (version.includes('beta')) {
    releaseTag = 'beta'
  } else if (version.includes('rc')) {
    releaseTag = 'rc'
  } else if (pkgName === 'vue') {
    // TODO remove when 3.x becomes default
    releaseTag = 'next'
  }

  // TODO use inferred release channel after official 3.0 release
  // const releaseTag = semver.prerelease(version)[0] || null

  step(`Publishing ${pkgName}...`)
  try {
    await runIfNotDry(
      'yarn',
      [
        'publish',
        '--new-version',
        version,
        ...(releaseTag ? ['--tag', releaseTag] : []),
        '--access',
        'public',
      ],
      {
        cwd: pkgRoot,
        stdio: 'pipe',
      }
    )
    console.log(chalk.green(`Successfully published ${pkgName}@${version}`))
  } catch (e) {
    if (e.stderr.match(/previously published/)) {
      console.log(chalk.red(`Skipping already published: ${pkgName}`))
    } else {
      throw e
    }
  }
}
```

#### 2.8 推送到 github

```js
step('\nPushing to GitHub...')
// 打一个tag
await runIfNotDry('git', ['tag', `v${targetVersion}`])
// 将tag推送
await runIfNotDry('git', ['push', 'origin', `refs/tags/v${targetVersion}`])
// git push 将所有代码推送到远程
await runIfNotDry('git', ['push'])
```
#### 2.9整体流程
1. 确认要发布的版本，可以自定义也可以选择
2. 执行测试用例
3. 更新package.json文件的版本和所有vue内部相关的依赖版本号
4. 打包编译所有包
5. 生成changlog
6. 提交代码
7. 发布包
8. 将最新代码推送到github
### 3.总结
&nbsp;&nbsp;这次的源码学习让我了解到了vue是怎么发布新版本的，总共会经历那些步骤。这次相对于前两次源码学习更难一点，看了好几遍都不知道在干什么，后面决定一边调试一边写笔记，慢慢的发现能懂一些了，由于代码不少，而且很多插件也不知道什么意思，中间都打算放弃这一期学习，后面还是坚持下来了。