pipeline {
    agent any

    environment {
        IMAGE_NAME = 'devmart-ui'
    }

    stages {
        stage('Instalar Dependencias') {
            steps {
                echo 'Instalando dependencias...'
                script {
                    if (isUnix()) {
                        sh 'npm install'
                    } else {
                        bat 'npm install'
                    }
                }
            }
        }

        stage('Construir Imagen Docker') {
            steps {
                echo 'Construyendo imagen Docker...'
                script {
                    if (isUnix()) {
                        // sh "docker build -t ${IMAGE_NAME}:latest ."
                        sh "docker compose down -d ${IMAGE_NAME}:latest"
                        sh "docker compose up -d ${IMAGE_NAME}:latest"
                    } else {
                        bat 'docker compose down -d %IMAGE_NAME%:latest .'
                        bat 'docker compose up -d %IMAGE_NAME%:latest .'
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Imagen devmart-ui construida correctamente'
        }
        failure {
            echo 'Error al construir la imagen'
        }
    }
}
