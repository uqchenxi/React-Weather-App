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

def deploy(remoteHost) {
    echo 'dploy the app to ec2 server...'

    sshagent(['ec2-docker-key']) {
        withCredentials([
            usernamePassword(
                credentialsId: 'docker-hub',
                usernameVariable: 'USER',
                passwordVariable: 'PASS'
            )
        ]) {
            sh '''
                ssh -o StrictHostKeyChecking=no $remoteHost << EOF
                echo $PASS | docker login -u $USER --password-stdin
                rm -rf /home/ec2-user/*
                EOF
                '''
            sh "scp ./docker-compose.yaml ${remoteHost}:/home/ec2-user/"
            sh '''
                ssh -o StrictHostKeyChecking=no $remoteHost << EOF
                cd /home/ec2-user/
                docker-compose -f docker-compose.yaml up
                EOF
                '''
        }
    }
}

return this