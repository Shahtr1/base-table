pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                      // Use the correct SSH URL for your GitHub repository
                      checkout([$class: 'GitSCM',
                                branches: [[name: '*/main']],
                                userRemoteConfigs: [[
                                  url: 'git@github.com:Shahtr1/base-table.git',
                                  credentialsId: 'jenkins'
                                ]]])
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
