# Getting Started

## First init and after modify any DTO or Entity
```
mvn clean install
```
## Launch database
```
mvn exec:java -Prun_database
```
## Launch backend

We strongly recommend launching the server in debug mode when you are doing active development. To do this, go to the Application class inside your <code>src/main/java</code> folder.

![Launch in debug](https://i.imgur.com/t4ACRB0.gif)

If you are no longer doing active development on the backend (e.g.: you are developing the frontend), you can launch the backend by running the <code>mvn spring-boot:run</code> command.   To make sure that you are launching the backend with the source code up to date, you can first run a <code>mvn clean install</code> command.

```
mvn clean install
mvn spring-boot:run
```


### Reference Documentation
For further reference, please consider the following sections:

* [Official Apache Maven documentation](https://maven.apache.org/guides/index.html)
* [Spring Boot Maven Plugin Reference Guide](https://docs.spring.io/spring-boot/docs/2.7.7/maven-plugin/reference/html/)
* [Create an OCI image](https://docs.spring.io/spring-boot/docs/2.7.7/maven-plugin/reference/html/#build-image)
* [Spring Web](https://docs.spring.io/spring-boot/docs/2.7.7/reference/htmlsingle/#web)
* [Spring Data JPA](https://docs.spring.io/spring-boot/docs/2.7.7/reference/htmlsingle/#data.sql.jpa-and-spring-data)
* [Spring Session](https://docs.spring.io/spring-session/reference/)

### Guides
The following guides illustrate how to use some features concretely:

* [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
* [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
* [Building REST services with Spring](https://spring.io/guides/tutorials/rest/)
* [Accessing Data with JPA](https://spring.io/guides/gs/accessing-data-jpa/)

