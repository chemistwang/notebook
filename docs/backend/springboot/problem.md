# 问题

## 多数据源 `primary`

``` bash
Caused by: org.springframework.beans.factory.NoUniqueBeanDefinitionException: No qualifying bean of type 'javax.sql.DataSource' available: more than one 'primary' bean found among candidates: [oracleDataSource, postgreDataSource, tdengineDataSource]
```

``` java
@Configuration
@MapperScan(basePackages = {"com.herin.gaoling.wisdom.police.mapper.postgre"}, sqlSessionTemplateRef = "postgreSqlSessionTemplate")
public class PostgreSqlServerConfig {

    @Bean(name = "postgreDataSource")
    @ConfigurationProperties(prefix = "spring.datasource.postgre-server")
    @Primary
    public DataSource postgreDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "postgreSqlSessionFactory")
    @Primary
    public SqlSessionFactory postgreSqlSessionFactory(@Qualifier("postgreDataSource") DataSource dataSource) throws Exception {
        SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
        bean.setDataSource(dataSource);
        bean.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath:mapper/postgre/*.xml"));
        return bean.getObject();
    }

    @Bean(name = "postgreTransactionManager")
    @Primary
    public DataSourceTransactionManager postgreTransactionManager(@Qualifier("postgreDataSource") DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }

    @Bean(name = "postgreSqlSessionTemplate")
    @Primary
    public SqlSessionTemplate postgreSqlSessionTemplate(@Qualifier("postgreSqlSessionFactory") SqlSessionFactory sqlSessionFactory) {
        return new SqlSessionTemplate(sqlSessionFactory);
    }
}
```

``` java
@Configuration
@MapperScan(basePackages = {"com.herin.gaoling.wisdom.police.mapper.oracle"}, sqlSessionTemplateRef = "oracleSqlSessionTemplate")
public class OracleSqlServerConfig {

    @Bean(name = "oracleDataSource")
    @ConfigurationProperties(prefix = "spring.datasource.oracle-server")
    // @Primary
    public DataSource postgreDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "oracleSqlSessionFactory")
    // @Primary
    public SqlSessionFactory oracleSqlSessionFactory(@Qualifier("oracleDataSource") DataSource dataSource) throws Exception {
        SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
        bean.setDataSource(dataSource);
        bean.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath:mapper/oracle/*.xml"));
        return bean.getObject();
    }

    @Bean(name = "oracleTransactionManager")
    // @Primary
    public DataSourceTransactionManager postgreTransactionManager(@Qualifier("oracleDataSource") DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }

    @Bean(name = "oracleSqlSessionTemplate")
    // @Primary
    public SqlSessionTemplate oracleSqlSessionTemplate(@Qualifier("oracleSqlSessionFactory") SqlSessionFactory sqlSessionFactory) {
        return new SqlSessionTemplate(sqlSessionFactory);
    }
}
```

只能存在一个 `primary` 数据源，注释掉一个即可

## ZHS16GBK报错

``` bash
java.sql.SQLException: 不支持的字符集 (在类路径中添加 orai18n.jar): ZHS16GBK
```

需要在 `pom.xml` 文件中添加

``` xml
<!-- https://mvnrepository.com/artifact/com.oracle.database.nls/orai18n -->
<dependency>
    <groupId>com.oracle.database.nls</groupId>
    <artifactId>orai18n</artifactId>
    <version>21.3.0.0</version>
</dependency>
```