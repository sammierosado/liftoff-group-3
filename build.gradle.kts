plugins {
	java
	id("org.springframework.boot") version "3.2.0"
	id("io.spring.dependency-management") version "1.1.4"
}

group = "brainyBunch"
version = "0.0.1-SNAPSHOT"

java {
	sourceCompatibility = JavaVersion.VERSION_17
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	implementation ("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation ("org.springframework.boot:spring-boot-starter-validation")
	implementation ("org.springframework.boot:spring-boot-starter-web")
	implementation ("org.springframework.boot:spring-boot-starter-thymeleaf")
	runtimeOnly ("com.mysql:mysql-connector-j")
	//Robert: Added additional implementation "mysql:mysql-connector-java:8.0.32" for database connectivity.
	//if it causes issues, please delete.
	implementation ("mysql:mysql-connector-java:8.0.32")
	implementation ("org.json:json:20231013")

}

tasks.withType<Test> {
	useJUnitPlatform()
}
