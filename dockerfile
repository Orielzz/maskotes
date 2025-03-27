# Etapa 1: Construção da aplicação
FROM maven:3.9.8-eclipse-temurin-21 AS build
WORKDIR /app

# Copia o arquivo pom.xml
COPY ./spring/loja/pom.xml /app/pom.xml

# Baixa as dependências sem copiar o código-fonte
RUN mvn dependency:go-offline

# Copia o código-fonte restante
COPY ./spring/loja/src /app/src

# Compila a aplicação
RUN mvn clean install -DskipTests

# Etapa 2: Execução da aplicação
FROM eclipse-temurin:21-jre
WORKDIR /app

# Copia o JAR compilado da etapa de build
COPY --from=build /app/target/*.jar app.jar

# Comando de entrada para executar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]
