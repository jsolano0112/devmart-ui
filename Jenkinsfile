pipeline {

    agent any

    environment {
        IMAGE_NAME = 'jsolano0112/devmart-ui'
    }

    stages {

        stage('Build') {
            steps {
                script {
                    def API_CREDENTIAL_ID            = ''
                    def USERS_API_CREDENTIAL_ID      = ''
                    def NOTIFICATIONS_API_CREDENTIAL_ID = ''
                    def SOCKET_CREDENTIAL_ID         = ''

                    if (env.BRANCH_NAME == 'qa') {
                        API_CREDENTIAL_ID            = 'qa-devmart-api-url'
                        USERS_API_CREDENTIAL_ID      = 'qa-users-api-url'
                        NOTIFICATIONS_API_CREDENTIAL_ID = 'qa-notifications-api-url'
                        SOCKET_CREDENTIAL_ID         = 'qa-socket-url'
                    } else if (env.BRANCH_NAME == 'main') {
                        API_CREDENTIAL_ID            = 'prod-devmart-api-url'
                        USERS_API_CREDENTIAL_ID      = 'prod-users-api-url'
                        NOTIFICATIONS_API_CREDENTIAL_ID = 'prod-notifications-api-url'
                        SOCKET_CREDENTIAL_ID         = 'prod-socket-url'
                    } else {
                        error("❌ Branch no soportada: ${env.BRANCH_NAME}")
                    }

                    withCredentials([
                        string(credentialsId: API_CREDENTIAL_ID,            variable: 'REACT_APP_DEVMART_API'),
                        string(credentialsId: USERS_API_CREDENTIAL_ID,      variable: 'REACT_APP_USERS_API'),
                        string(credentialsId: NOTIFICATIONS_API_CREDENTIAL_ID, variable: 'REACT_APP_NOTIFICATIONS_API'),
                        string(credentialsId: SOCKET_CREDENTIAL_ID,         variable: 'REACT_APP_SOCKET_SERVER_URL')
                    ]) {
                        bat """
                            docker build ^
                            --build-arg REACT_APP_DEVMART_API=%REACT_APP_DEVMART_API% ^
                            --build-arg REACT_APP_USERS_API=%REACT_APP_USERS_API% ^
                            --build-arg REACT_APP_NOTIFICATIONS_API=%REACT_APP_NOTIFICATIONS_API% ^
                            --build-arg REACT_APP_SOCKET_SERVER_URL=%REACT_APP_SOCKET_SERVER_URL% ^
                            -t %IMAGE_NAME%:%BUILD_NUMBER% ^
                            -t %IMAGE_NAME%:latest ^
                            .
                        """
                    }
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
                bat """
                    docker rmi %IMAGE_NAME%:%BUILD_NUMBER% 2>nul
                    docker rmi %IMAGE_NAME%:latest 2>nul
                    docker image prune -f
                    exit /b 0
                """
            }
        }

        stage('Aprobación PROD') {
            when {
                branch 'main'
            }
            steps {
                input message: '¿Confirmas deploy de devmart-ui en PROD?', ok: 'Sí, deployar'
            }
        }

        stage('Deploy') {
            steps {
                script {
                    def EC2_IP_CREDENTIAL = env.BRANCH_NAME == 'main' ? 'prod-ec2-ip' : 'qa-ec2-ip'
                    def SSH_KEY_CREDENTIAL = env.BRANCH_NAME == 'main' ? 'devmart-ssh-key-prod' : 'devmart-ssh-key-qa'

                    withCredentials([
                        string(credentialsId: EC2_IP_CREDENTIAL, variable: 'EC2_IP'),
                        sshUserPrivateKey(credentialsId: SSH_KEY_CREDENTIAL, keyFileVariable: 'SSH_KEY')
                    ]) {
                        bat """
                            icacls "%SSH_KEY%" /inheritance:r
                            icacls "%SSH_KEY%" /grant:r "%USERNAME%:R"

                            ssh -o StrictHostKeyChecking=no ^
                            -i "%SSH_KEY%" ^
                            ubuntu@%EC2_IP% ^
                            "cd /home/ubuntu/devmart-infra && docker compose pull devmart-ui-1 && docker compose up -d devmart-ui-1"
                        """
                    }
                }
            }
        }
    }

    post {
        success { echo "✅ devmart-ui desplegado en ${env.BRANCH_NAME == 'main' ? 'PROD' : 'QA'}" }
        failure { echo '❌ Falló el pipeline de devmart-ui' }
    }
}