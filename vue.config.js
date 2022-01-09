/*配置别名alias
①脚手架2里边在webpack.base.config.js；
②脚手架3中，在src下创建vue.config.js在该文件中进行设置，使用时会将该配置文件和公共配置文件进行合并，
只能识别vue.config.js该名称配置文件
*/
module.exports={
  configureWebpack:{/*configureWebpack表名配置webpack的config*/
    resolve: {
      alias: {
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views',
      }
    }
  },

  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-px-to-viewport")({
            unitToConvert: "px",//要转化的单位
            viewportWidth: 750,//UI设计稿的宽度
            unitPrecision: 3,//转换后的精度，即小数点位数
            propList: [
              "*"
            ],//指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            viewportUnit: 'vw',//指定需要转换成的视窗单位，默认vw
            fontViewportUnit: "vw",//指定字体需要转换成的视窗单位，默认vw
            landscapeUnit: 'vh',//横屏时使用的单位
            landscapeWidth: 667,//横屏时使用的视口宽度
            selectorBlackList: [],//指定不转换为视窗单位的类名
            minPixelValue: 1,//小于或等于'1px'不转化为视窗单位
            mediaQuery: false,//是否在媒体查询的css代码中也进行转换，默认false
            replace: true,//是否转换后直接更换属性值
            //landscape: false,//是否处理横屏情况
            exclude: /(\/|\\)(node_modules)(\/|\\)/,//设置忽略文件，用正则做目录名匹配
          })
        ]
      }
    }
  }
}
/*alias别名，extensions排除后缀名*/
/*在src下还需要创建.editorconfig文件，统一设计风格*/
