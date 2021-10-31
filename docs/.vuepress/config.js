module.exports = {
    title: '后知的笔记本',
    description: 'Just Coding Around',
    dest: "dist",
    themeConfig: {
        lastUpdated: 'Last Updated', // string | boolean
        // logo: '/assets/img/logo1.jpg',
        logo: '/assets/img/logo2.jpg',
        // 导航相关
        nav: [
            { text: 'Home', link: '/' },
            {
                text: '前端开发',
                ariaLabel: 'Frontend Menu',
                items: [
                    { text: 'Html', link: '/frontend/html/' },
                    { text: 'CSS', link: '/frontend/css/' },
                    { text: 'Javascript', link: '/frontend/js/' },
                    { text: 'Typescript', link: '/frontend/ts/' },
                    { text: 'Chart', link: '/frontend/chart/' },
                    { text: 'Vue', link: '/frontend/vue/' },
                    { text: 'Vue3', link: '/frontend/vue3/' },
                    { text: 'Angular', link: '/frontend/angular/' },
                    { text: 'React', link: '/frontend/react/' },
                    { text: 'Flutter', link: '/frontend/flutter/' },
                    { text: 'Webpack', link: '/frontend/webpack/' },
                    { text: 'Vite', link: '/frontend/vite/' },
                    { text: 'Infrastructure', link: '/frontend/infrastructure/' },
                ]
            },
            {
                text: '编码',
                ariaLabel: 'Code Menu',
                items: [
                    { text: 'Leetcode', link: '/code/leetcode/' },
                    { text: 'CodeWar', link: '/code/codewar/' },
                    { text: '算法', link: '/code/algorithm/' },
                ]
            },
            {
                text: '后端开发',
                ariaLabel: 'Backend Menu',
                items: [
                    { text: 'Linux', link: '/backend/linux/' },
                    { text: 'Node', link: '/backend/node/' },
                    { text: 'Java', link: '/backend/java/' },
                    { text: 'Maven', link: '/backend/maven/' },
                    { text: 'Gradle', link: '/backend/gradle/' },
                    { text: 'Spring', link: '/backend/spring/' },
                    { text: 'SpringMVC', link: '/backend/springmvc/' },
                    { text: 'Spring Boot', link: '/backend/springboot/' },
                    { text: 'Spring Security', link: '/backend/springsecurity/' },
                    { text: 'Spring Cloud', link: '/backend/springcloud/' },
                    { text: 'Zookeeper', link: '/backend/zookeeper/' },
                    { text: 'Kafka', link: '/backend/kafka/' },
                    { text: 'Nginx', link: '/backend/nginx/' },
                    { text: 'OpenResty', link: '/backend/openresty/' },
                    { text: 'Rust', link: '/backend/rust/' },
                    { text: 'Python', link: '/backend/python/' },
                ]
            },
            {
                text: '数据库',
                ariaLabel: 'DB Menu',
                items: [
                    { text: 'SQL', link: '/db/sql/' },
                    { text: 'Mongo', link: '/db/mongo/' },
                    { text: 'Redis', link: '/db/redis/' },
                    { text: 'PostgresQL', link: '/db/postgresql/' },
                    { text: 'Oracle', link: '/db/oracle/' },
                    { text: 'Mybatis', link: '/db/mybatis/' },
                    { text: 'Sequelize', link: '/db/sequelize/' },
                    { text: '案例', link: '/db/case/' },
                ]
            },
            {
                text: '大数据',
                ariaLabel: 'BigData Menu',
                items: [
                    { text: 'Hadoop', link: '/bigdata/hadoop/' },
                    { text: 'Sqoop', link: '/bigdata/sqoop/' },
                    { text: 'Hive', link: '/bigdata/hive/' },
                    { text: 'Hbase', link: '/bigdata/hbase/' },
                    { text: 'Kettle', link: '/bigdata/kettle/' },
                    { text: 'Scala', link: '/bigdata/scala/' },
                    { text: 'Spark', link: '/bigdata/spark/' },
                    { text: 'Flink', link: '/bigdata/flink/' },
                    { text: 'Kylin', link: '/bigdata/kylin/' },
                    { text: 'Azkaban', link: '/bigdata/azkaban/' },
                    { text: 'Oozie', link: '/bigdata/oozie/' },
                ]
            },
            {
                text: '开发工具',
                ariaLabel: 'Tool Menu',
                items: [
                    { text: 'Brew', link: '/tool/brew/' },
                    { text: 'Vim', link: '/tool/vim/' },
                    { text: 'Vscode', link: '/tool/vscode/' },
                    { text: 'Chrome', link: '/tool/chrome/' },
                    { text: 'Git', link: '/tool/git/' },
                    { text: 'minIO', link: '/tool/minIO/' },
                    { text: 'Docker', link: '/tool/docker/' },
                    { text: 'Docker Compose', link: '/tool/dockercompose/' },
                    { text: 'Kubernetes', link: '/tool/kubernetes/' },
                    { text: 'Jenkins', link: '/tool/jenkins/' },
                    { text: 'Travis', link: '/tool/travis/' },
                    { text: 'Prometheus', link: '/tool/prometheus/' },
                    { text: 'Grafana', link: '/tool/grafana/' },
                    { text: 'Serverless', link: '/tool/serverless/' },
                    { text: 'Raspberrypi', link: '/tool/raspberrypi/' },
                ]
            },
            {
                text: '视频',
                ariaLabel: 'Video Menu',
                items: [
                    { text: '直播', link: '/video/live/' },
                    { text: 'FFmpeg', link: '/video/ffmpeg/' },
                    { text: 'WebRTC', link: '/video/webrtc/' },
                ]
            },
            {
                text: '其他',
                ariaLabel: 'Other Menu',
                items: [
                    { text: 'Gateway', link: '/other/gateway/' },
                    { text: 'SSO', link: '/other/sso/' },
                    { text: '知识点', link: '/other/point/' },
                ]
            },
            {
                text: '课堂学习笔记',
                ariaLabel: 'ClassNotebook Menu',
                items: [
                    { text: '腾讯云学堂', link: '/class/tencentcloud/' },
                    { text: 'Udacity', link: '/class/udacity/' },
                ]
            }, 
            { text: '资源列表', link: '/link/' },
            // { text: '个人博客', link: 'https://chemistwang.github.io' },
            { text: '介绍', link: '/introduce/' },
        ],
        //侧边栏相关
        // sidebar: 'auto',
        sidebar: {
            //前端开发
            '/frontend/html/': ['html'],
            '/frontend/css/': ['basic', 'animation', 'module', 'case', 'preprocessor', 'interview'],
            '/frontend/js/': ['basic', 'loop', 'function', 'object', 'memory', 'es6', 'module', 'async', 'network', 'eventloop', 'domevent', 'animation', 'canvas', 'test', 'security', 'case'],
            '/frontend/react/': ['init', 'basic', 'redux', 'hooks', 'sourcecode', 'interview'], 
            '/frontend/vue/': ['sourcecode', 'vuerouter', 'vuex', 'problem', 'interview'],
            '/frontend/vue3/': ['sourcecode'],
            '/frontend/flutter/': ['install', 'ios', 'problem', 'case'],
            '/frontend/chart/': ['echarts'],
            //后端开发
            '/backend/linux/': ['intro', 'centos', 'command', 'network', 'shortcut'],
            '/backend/node/': ['basic', 'install', 'npm', 'express', 'koa', 'nest', 'io', 'rpc', 'performance', 'engineering'],
            '/backend/java/': ['base', 'jdbc', 'interview'],
            '/backend/maven/': ['mavenIntro', 'mavenProblem'],
            '/backend/spring/': ['spring'],
            '/backend/springboot/': ['springbootJourney', 'case', 'problem'],
            '/backend/springcloud/': [],
            '/backend/springsecurity/': ['temp'],
            '/backend/mybatis/': ['problem'],
            '/backend/nginx/': ['install', 'https', 'conf', 'tengine'],
            '/backend/openresty/': [],
            '/backend/rust/': ['rocket'],
            '/backend/python/': ['jupyter'],
            '/backend/zookeeper/': ['intro', 'install', 'code'],
            '/backend/kafka/': ['scene', 'intro', 'install', 'code', 'interview'],
            //数据库
            '/db/mongo/': ['install', 'mongo', 'problem'],
            '/db/redis/': ['intro', 'install', 'redis', 'code', 'problem'],
            '/db/postgresql/': ['intro', 'install', 'command', 'code', 'problem'],
            '/db/oracle/': [],
            '/db/sequelize': ['problem'],
            '/db/case/': [],
            //大数据
            '/bigdata/hadoop/': ['route', 'cloud', 'hadoop', 'hdfs', 'mapreduce', 'yarn', 'hive'],
            //开发工具
            '/tool/brew/': ['problem'],
            '/tool/vim/': ['vim', 'gvimrc'],
            '/tool/chrome/': ['ch'],
            '/tool/vscode/': ['vs'],
            '/tool/git/': ['install', 'gitCommand', 'gitflow', 'gitServer', 'gitlab', 'gitlfs', 'problem'],
            '/tool/docker/': ['docker', 'version', 'harbor', 'portainer'],
            '/tool/dockercompose/': ['dockercompose', 'problem'],
            '/tool/kubernetes/': ['introduce', 'centosDeploy'],
            '/tool/jenkins/': ['jenkins'],
            '/tool/travis/': [''],
            '/tool/prometheus/': ['install', 'plugin'],
            '/tool/grafana/': ['install', 'plugin'],
            '/tool/serverless/': [],
            '/tool/raspberrypi/': ['frp', 'problem'],
            //视频
            '/video/live/': ['basic', 'protocol', 'tool', 'analysis', 'push', 'pull', 'server', 'testaddr', 'extra'],
            '/video/ffmpeg/': ['basic', 'practice', 'case'],
            //其他
            '/other/gateway/': [],
            '/other/sso/': ['cas'],
            //课堂学习笔记
            '/class/tencentcloud/': ['class1', 'class2'],
            '/class/udacity/': ['class1', 'class2'],
            //编码
            '/code/leetcode/': [],
            '/code/codewar/': ['codewar'],
        },
        // sidebarDepth: 3,

    },

}