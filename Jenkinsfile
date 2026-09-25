pipeline {
    agent any

    options {
        timestamps()
        timeout(time: 25, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '20'))
    }

    stages {
        stage('Build') {
            steps {
                sh 'docker compose -f deploy/docker-compose.yml build'
            }
            post {
                success      { publishChecks name: 'Build', conclusion: 'SUCCESS', summary: 'static export + nginx image built' }
                unsuccessful { publishChecks name: 'Build', conclusion: 'FAILURE', summary: 'build failed' }
            }
        }
        stage('Deploy') {
            when { branch 'main' }
            steps {
                sh 'docker compose -f deploy/docker-compose.yml up -d'
            }
            post {
                success      { publishChecks name: 'Deploy', conclusion: 'SUCCESS', summary: 'deployed https://dolinek.dev' }
                unsuccessful { publishChecks name: 'Deploy', conclusion: 'FAILURE', summary: 'deploy failed' }
            }
        }
    }
}
