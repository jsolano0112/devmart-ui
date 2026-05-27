pipeline {
    agent any

    environment {
        IMAGE_NAME = 'jsolano0112/devmart-ui'
        AWS_REGION = 'us-east-1'
        ECS_CLUSTER = 'devmart-cluster'
        ECS_SERVICE = 'devmart-ui'
    }

    stages {
        stage('Build') {
            steps {
                withCredentials([
                    string(credentialsId: 'qa-base-url', variable: 'BASE_URL')
                ]) {
                    bat '''
                        docker build ^
                        --build-arg REACT_APP_DEVMART_API=%BASE_URL%/api/v1/ ^
                        --build-arg REACT_APP_USERS_API=%BASE_URL%/api/v1/ ^
                        --build-arg REACT_APP_NOTIFICATIONS_API=%BASE_URL%/api/v1/ ^
                        --build-arg REACT_APP_SOCKET_SERVER_URL=%BASE_URL% ^
                        -t %IMAGE_NAME%:%BUILD_NUMBER% ^
                        -t %IMAGE_NAME%:latest ^
                        .
                    '''
                }
            }
        }

        stage('Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat '''
                        docker login -u %DOCKER_USER% -p %DOCKER_PASS% || exit /b 1
                        docker push %IMAGE_NAME%:%BUILD_NUMBER% || exit /b 1
                        docker push %IMAGE_NAME%:latest || exit /b 1
                        docker logout
                    '''
                }
            }
        }

        stage('Deploy to ECS') {
            steps {
                withCredentials([
                    string(credentialsId: 'AWS_ACCESS_KEY_ID',     variable: 'AWS_ACCESS_KEY_ID'),
                    string(credentialsId: 'AWS_SECRET_ACCESS_KEY', variable: 'AWS_SECRET_ACCESS_KEY'),
                ]) {
                    bat '''
                        aws ecs update-service --cluster %ECS_CLUSTER% --service %ECS_SERVICE% --force-new-deployment --region %AWS_REGION%
                    '''
                }
            }
        }

        stage('Limpiar') {
            steps {
                bat '''
                    docker rmi %IMAGE_NAME%:%BUILD_NUMBER% 2>nul
                    docker rmi %IMAGE_NAME%:latest 2>nul
                    docker image prune -f
                    exit /b 0
                '''
            }
        }
    }

    post {
        success { 
            echo '======================================================='
            echo " devmart-ui actualizado exitosamente" 
            echo '======================================================='
        }
        failure { 
            echo 'Fallo el pipeline de construcción/despliegue de devmart-ui' 
        }
    }
}