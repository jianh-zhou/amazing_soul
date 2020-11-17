
window.$docsify = {
  name: 'Amazing document',//文档标题,侧边栏显示
  // repo: 'Amazing document',//右上角的github图标
  loadSidebar: true,//定制自己的侧边栏
  subMaxLevel: 2,//侧边栏的目录
  loadNavbar: true,//导航栏
  // hideSidebar: true,//隐藏侧边栏
  // 嵌套侧边栏
  alias: {
    '/.*/_sidebar.md': '/_sidebar.md'
  },
  executeScript: true,
  coverpage: true,//开启封面渲染的功能,
  maxLevel: 3,//支持4级渲染的标题层级
  auto2top: true,//切换页面是否跳转到顶部
  // routerMode: 'history', // default: 'hash'
  // topMargin: 40, //页面设置锚点跳转到对应位置时,让其与页面顶部有一定的距离,默认值为0
  // 字数统计的配置
  count: {
    countable: true,
    fontsize: '1em',
    color: 'rgb(90,90,90)',
    language: 'chinese'
  },
  // 全局搜索的关键字
  search: {
    paths: 'auto',
    placeholder: '请输入要搜索的关键字',//文本框输入的提示信息
    noData: '没有结果',//没有搜索到对应数据的提示信息
    depth: 10,
  },
  // 根据 _sidebar.md 的内容自动为每个页面增加标题
  loadSidebar: true,
  autoHeader: true,
  mergeNavbar: true,//小屏幕下合并导航栏到侧边栏
  // logo: '/media/icon.svg',//侧边栏的logo
}




