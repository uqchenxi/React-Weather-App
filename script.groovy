def buildDockerImage() {
    echo "build the docker image..."
    sh "docker build -t react-weather-app:1.0"
    sh "docker tag react-weather-app:1.0 sunshinerxx/react-weather-app:1.0"
}

def dockerLogin() {
    echo "login docker hub..."
    withCredentials([
        usernamePassword(
            credentialsId: "docker-hub",
            usernameVariable: "USER",
            passwordVariable: "PASS"
        )
    ]) {
        sh "echo $PASS | docker login -u $USER --password-stdin"
    }
}

def dockerPushImage() {
    echo "push docker image..."
    sh "docker push sunshinerxx/react-weather-app:1.1 ."
}

def deploy() {
    echo "dploy the app to ec2 server"
}

return this