def gv

pipeline {
    agent any

    environment {
        REMOTE_HOST = 'ec2-user@3.107.6.214'
    }

    tools {
        nodejs 'Node-22-9'
    }

    stages {
        stage('init') {
            steps {
                script {
                    gv = load 'script.groovy'
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
                    gv.deploy(REMOTE_HOST)
                }
            }
        }
    }
}