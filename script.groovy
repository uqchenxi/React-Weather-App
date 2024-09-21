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

def deploy() {
    echo 'deploy the app to ec2 server...'

    def dockerCmd = 'cd /home/ec2-user/ && docker-compose -f docker-compose.yaml up'
    def ec2Instance = "ec2-user@3.107.6.214"
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