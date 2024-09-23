def uploadEnv() {
    echo 'upload .env file..'
    configFileProvider([configFile(fileId: 'b5285b64-92e9-44d3-a220-6e6036c67d0a', variable: 'ENV_FILE')]) {
        sh "cp $ENV_FILE .env"
    }
}

def appTest() {
    echo 'start test...'
}

def buildDockerImage() {
    echo 'build the docker image...'
    sh 'docker build -t react-weather-app:1.1 .'
    sh 'docker tag react-weather-app:1.1 sunshinerxx/react-weather-app:1.1'
}

def dockerLogin() {
    echo 'login docker hub...'
    withCredentials([
        usernamePassword(
            credentialsId: 'docker-hub',
            usernameVariable: 'USER',
            passwordVariable: 'PASS'
        )
    ]) {
        sh "echo $PASS | docker login -u $USER --password-stdin"
    }
}

def dockerPushImage() {
    echo 'push docker image...'
    sh 'docker push sunshinerxx/react-weather-app:1.1'
}

def deploy(ec2IP) {
    echo 'deploy the app to ec2 server...'
    def dockerCmd = 'docker-compose -f /home/ec2-user/docker-compose.yaml up -d'
    def ec2Instance = "ec2-user@${ec2IP}"
    sshagent(['ec2-docker-key']) {
        withCredentials([
            usernamePassword(
                credentialsId: "docker-hub",
                usernameVariable: "USER",
                passwordVariable: "PASS"
            )
        ]) {
            sh "ssh -o StrictHostKeyChecking=no ${ec2Instance} echo $PASS | docker login -u $USER --password-stdin"
            sh "ssh -o StrictHostKeyChecking=no ${ec2Instance} rm -rf /home/ec2-user/*"
            sh "scp ./docker-compose.yaml ${ec2Instance}:/home/ec2-user/"
            sh "ssh -o StrictHostKeyChecking=no ${ec2Instance} ${dockerCmd}"
        }
    }
}

return this