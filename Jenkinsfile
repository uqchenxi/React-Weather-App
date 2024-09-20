def gv

pipeline {
    agent any

    tools {
        nodejs 'Node-22-9'
    }

    stages {
        stage('init') {
            steps {
                script {
                    gv = load'script.groovy'
                }
            }
        }
        stage('build docker image') {
            steps {
                script {
                    gv.buildDockerImage()
                }
            }
        }
        stage('push docker image') {
            steps {
                script {
                    gv.dockerLogin()
                    gv.dockerPushImage()
                }
            }
        }
        stage('deploy the app') {
            steps {
                script {
                    gv.deploy()
                }
            }
        }
    }
}