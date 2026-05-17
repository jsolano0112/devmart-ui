pipeline {
    agent any

    environment {
        IMAGE_NAME = 'devmart-ui'
        COMPOSE_DIR = 'C:\\Users\\LENOVO\\Desktop\\electiva 3'
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
                        sh "docker build -t ${IMAGE_NAME}:latest ."
                    } else {
                        bat "docker build -t %IMAGE_NAME%:latest ."
                    }
                }
            }
        }

        stage('Desplegar Contenedor') {
            steps {
                echo 'Desplegando devmart-ui...'
                script {
                    if (isUnix()) {
                        sh """
                            cd "${COMPOSE_DIR}"
                            docker compose --env-file ./devmart-ui/.env up -d --no-deps --force-recreate devmart-ui-1
                        """
                    } else {
                        bat """
                            cd "%COMPOSE_DIR%"
                            docker compose --env-file ./devmart-ui/.env up -d --no-deps --force-recreate devmart-ui-1
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'devmart-ui desplegado correctamente'
        }
        failure {
            echo 'Error al desplegar devmart-ui'
        }
    }
}