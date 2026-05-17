pipeline {
    agent any

    environment {
        IMAGE_NAME = "jsolano0112/devmart-ui"
    }

    stages {

        stage('Build') {
            steps {
                withCredentials([
                    string(credentialsId: 'devmart-api-url',    variable: 'DEVMART_API'),
                    string(credentialsId: 'users-api-url',      variable: 'USERS_API'),
                    string(credentialsId: 'notifications-api-url', variable: 'NOTIF_API'),
                    string(credentialsId: 'socket-server-url',  variable: 'SOCKET_URL')
                ]) {
                    sh """
                        docker build \
                        --build-arg REACT_APP_DEVMART_API=$DEVMART_API \
                        --build-arg REACT_APP_USERS_API=$USERS_API \
                        --build-arg REACT_APP_NOTIFICATIONS_API=$NOTIF_API \
                        --build-arg REACT_APP_SOCKET_SERVER_URL=$SOCKET_URL \
                        -t ${IMAGE_NAME}:${BUILD_NUMBER} \
                        -t ${IMAGE_NAME}:latest \
                        .
                    """
                }
            }
        }

        stage('Push a DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh """
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker push ${IMAGE_NAME}:${BUILD_NUMBER}
                        docker push ${IMAGE_NAME}:latest
                        docker logout
                    """
                }
            }
        }

        stage('Limpiar') {
            steps {
                sh "docker rmi ${IMAGE_NAME}:${BUILD_NUMBER} || true"
            }
        }
    }

    post {
        success { echo "✅ devmart-ui publicado en DockerHub" }
        failure { echo "❌ Falló el build del frontend" }
    }
}