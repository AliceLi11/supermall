//这样的配置设置，最后会将这个配置和公共配置做一个合并
module.exports = {
    configureWebpack:{
        resolve:{
          // entensions:[],这个配置可以省略后缀名，.js,.vue,.css已经配置过了
            alias:{
                // 'src':"@",默认已经配置好了
                'assets':"@/assets",
                'common':"@/common",
                'components':"@/components",
                'network':"@/network",
                'views':"@/views"
                // 'router':"@/router"一般情况下不需要设置别名，因为只有main.js中有引用
                //'store':"@/store"也不用设置别名，因为都可以通过this.$router和this.$store获取
            }
        }
    }
}