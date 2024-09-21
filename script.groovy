def buildDockerImage() {
    echo "build the docker image..."
    sh "docker build -t react-weather-app:1.1 ."
    sh "docker tag react-weather-app:1.1 sunshinerxx/react-weather-app:1.1"
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
    sh "docker push sunshinerxx/react-weather-app:1.1"
}

def deploy() {
    echo "dploy the app to ec2 server..."

    def dockerCmd = "docker run -d -p 80:80 --name react-weather-app sunshinerxx/react-weather-app:1.1"
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
            sh "ssh -o StrictHostKeyChecking=no ${ec2Instance} ${dockerCmd}"
        }
    }
}

return this