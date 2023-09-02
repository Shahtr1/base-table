pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout your GitHub repository
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/Shahtr1/base-table.git']]])
            }
        }

        stage('Build and Test') {
            steps {
                // Build and test your Angular library
                sh 'npm install --force'
                sh 'npm test'
            }
        }

        stage('Release') {
            steps {
                // Run release-it with options
                sh 'npx release-it --ci --no-version=0.1.0'
            }
        }
    }
}
