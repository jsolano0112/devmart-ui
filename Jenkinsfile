pipeline {
    agent any

    environment {
        IMAGE_NAME = 'jsolano0112/devmart-ui'
    }

    stages {
        stage('Build') {
            steps {
                bat """
                    docker build ^
                    -t %IMAGE_NAME%:%BUILD_NUMBER% ^
                    -t %IMAGE_NAME%:latest ^
                    .
                """
            }
        }

        stage('Push a DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat """
                        docker login -u %DOCKER_USER% -p %DOCKER_PASS% || exit /b 1
                        docker push %IMAGE_NAME%:%BUILD_NUMBER% || exit /b 1
                        docker push %IMAGE_NAME%:latest || exit /b 1
                        docker logout
                    """
                }
            }
        }

        stage('Limpiar') {
            steps {
                bat 'docker rmi %IMAGE_NAME%:%BUILD_NUMBER% 2>nul & exit /b 0'
            }
        }

        stage('Deploy en EC2') {
            steps {
                withCredentials([
                    string(credentialsId: 'devmart-ec2-ip', variable: 'EC2_IP'),
                    sshUserPrivateKey(
                        credentialsId: 'devmart-ssh-key',
                        keyFileVariable: 'SSH_KEY'
                    )
                ]) {
                    bat """
                        ssh -o StrictHostKeyChecking=no -i "%SSH_KEY%" ubuntu@%EC2_IP% "cd /home/ubuntu/devmart-infra && docker-compose pull devmart-ui-1 && docker-compose up -d devmart-ui-1"
                    """
                }
            }
        }
    }

    post {
        success { echo '✅ devmart-ui desplegado en EC2' }
        failure { echo '❌ Falló el pipeline' }
    }
}