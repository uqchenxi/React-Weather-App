def gv

pipeline {
    agent any

    environment {
        EC2_IP = "13.236.118.179"
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
        stage('upload environment file') {
            steps {
                script {
                    gv.uploadEnv()
                }
            }
        }
        stage('test') {
            steps {
                script {
                    gv.appTest()
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
                    gv.deploy(EC2_IP)
                }
            }
        }
    }
}