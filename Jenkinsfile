pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Install') {
            steps {
                script {
                    if (isUnix()) { sh 'npm ci' } else { bat 'npm ci' }
                }
            }
        }

        stage('Lint') {
            steps {
                script {
                    if (isUnix()) { sh 'npm run lint' } else { bat 'npm run lint' }
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    if (isUnix()) { sh 'npm run build' } else { bat 'npm run build' }
                }
            }
        }

        stage('Build Docker') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker build -t devmart-ui .'
                    } else {
                        bat 'docker build -t devmart-ui .'
                    }
                }
            }
        }
    }

    post {
        success { echo '✅ devmart-ui OK' }
        failure { echo '❌ devmart-ui falló' }
        always { cleanWs() }
    }
}