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
  }
}
/*alias别名，extensions排除后缀名*/
/*在src下还需要创建.editorconfig文件，统一设计风格*/
