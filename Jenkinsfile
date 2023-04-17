pipeline {
  agent any
  
  stages {
    stage('Build and Push Docker Image') {
      steps {
        script {
          def dockerImage = "punk77/furniture-catalog"
          sh "docker build -t $dockerImage ."
          env.DOCKER_IMAGE = dockerImage
        }
      }
    }
    
    stage('Deploy Docker Container') {
      steps {
        script {
          sh "${sshCommand} 'docker stop punk77/furniture-catalog || true'"
          sh "${sshCommand} 'docker rm punk77/furniture-catalog || true'"
          sh "${sshCommand} 'docker run -d --name punk77/furniture-catalog -p 3000:3000 ${env.DOCKER_IMAGE}'"
        }
      }
    }
  }
}
