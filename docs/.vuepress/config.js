module.exports = {
    title: '后知的笔记本',
    description: 'Just coding around',
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
                    { text: 'Css', link: '/frontend/css/' },
                    { text: 'Javascript', link: '/frontend/js/' },
                    { text: 'Echarts', link: '/frontend/echarts/' },
                    { text: 'Axios', link: '/frontend/axios/' },
                    { text: 'Vue', link: '/frontend/vue/' },
                    { text: 'Angular', link: '/frontend/angular/' },
                    { text: 'React', link: '/frontend/react/' },
                    { text: 'Webpack', link: '/frontend/webpack/' },
                    { text: 'Websocket', link: '/frontend/websocket/' },
                    { text: 'Infrastructure', link: '/frontend/infrastructure/' },
                    { text: '面试题', link: '/frontend/interview/' },
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
                    { text: 'Mybatis', link: '/backend/mybatis/' },
                    { text: 'Nginx', link: '/backend/nginx/' },
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
                    { text: 'Git', link: '/tool/git/' },
                    { text: 'Docker', link: '/tool/docker/' },
                    { text: 'Docker Compose', link: '/tool/dockercompose/' },
                    { text: 'Kubernetes', link: '/tool/kubernetes/' },
                    { text: 'Jenkins', link: '/tool/jenkins/' },
                    { text: 'Travis', link: '/tool/travis/' }
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
                    { text: 'Zookeeper', link: '/other/zookeeper/' },
                    { text: 'Kafka', link: '/other/kafka/' },
                    { text: 'Gateway', link: '/other/gateway/' },
                    { text: 'SSO', link: '/other/sso/' },
                    { text: '知识点', link: '/other/point/' },
                    { text: 'Python', link: '/other/python/' },
                    { text: 'minIO', link: '/other/minIO/' },
                ]
            },
            {
                text: '编码',
                ariaLabel: 'Code Menu',
                items: [
                    { text: 'Leetcode', link: '/code/leetcode/' },
                    { text: 'CodeWar', link: '/code/codewar/' },
                ]
            },
            // {
            //     text: '插件',
            //     ariaLabel: 'Plugin Menu',
            //     items: [
            //         { text: 'Chrome', link: '/plugin/chrome/' },
            //         { text: 'Vscode', link: '/plugin/vscode/' },
            //     ]
            // },
            { text: '资源列表', link: '/link/' },
            // { text: '个人博客', link: 'https://chemistwang.github.io' },
            { text: '介绍', link: '/introduce/' },
        ],
        //侧边栏相关
        // sidebar: 'auto',
        sidebar: {
            //前端开发
            '/frontend/html/': ['html'],
            '/frontend/css/': ['css', 'interview'],
            '/frontend/js/': ['ajax', 'animation', 'canvas', 'es6', 'eventloop', 'funcProgram', 'interview'],
            '/frontend/echarts/': ['echarts'],
            '/frontend/vue/': ['vueDev'],
            //后端开发
            '/backend/linux/': ['intro', 'centos', 'command', 'network', 'shortcut'],
            '/backend/node/': ['install', 'npm'],
            '/backend/java/': ['base', 'jdbc', 'interview'],
            '/backend/maven/': ['mavenIntro', 'mavenProblem'],
            '/backend/spring/': ['spring'],
            '/backend/springboot/': ['springbootJourney'],
            '/backend/springsecurity/': ['temp'],
            '/backend/mybatis/': ['problem'],
            '/backend/nginx/': ['install', 'https', 'conf', 'tengine'],
            //数据库
            '/db/mongo/': ['install', 'mongo', 'problem'],
            '/db/redis/': ['intro', 'install', 'redis', 'code', 'problem'],
            '/db/postgresql/': ['intro', 'install', 'command', 'code', 'problem'],
            //大数据
            '/bigdata/hadoop/': ['route', 'cloud', 'hadoop', 'hdfs', 'mapreduce', 'yarn', 'hive'],
            //开发工具
            '/tool/brew/': ['problem'],
            '/tool/vim/': ['vim', 'gvimrc'],
            '/tool/git/': ['gitflow', 'gitCommand', 'gitServer'],
            '/tool/docker/': ['docker', 'portainer'],
            '/tool/dockercompose/': ['dockercompose', 'problem'],
            '/tool/kubernetes/': ['introduce', 'centosDeploy'],
            '/tool/jenkins/': ['jenkins'],
            //视频
            '/video/live/': ['media1', 'media2', 'media3', 'media4', 'media5', 'media6', 'media7'],
            '/video/ffmpeg/': ['ffmpeg1', 'ffmpeg2'],
            //其他
            '/other/zookeeper/': ['zookeeper', 'zookeeperInstall', 'zookeeperCode'],
            '/other/kafka/': ['kafkaScene', 'kafkaIntro', 'kafkaInstall', 'kafkaCode', 'kafkaInterview'],
            '/other/gateway/': [],
            '/other/sso/': ['cas'],
            '/other/python/': ['jupyter'],
            //编码
            '/code/leetcode/': [],
            '/code/codewar/': ['codewar'],
            //插件
            // '/plugin/chrome': ['ch'],
            // '/plugin/vscode': ['vs'],
        },
        // sidebarDepth: 3,

    },

}