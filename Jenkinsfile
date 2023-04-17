pipeline {
  agent any
  
  stages {
    stage('Build and Push Docker Image') {
      steps {
        script {
          def dockerImage = "punk77/furniture-catalog"
          sh "docker build -t $dockerImage ."
          sh "docker push $dockerImage"
          env.DOCKER_IMAGE = dockerImage
        }
      }
    }
    
    stage('Deploy Docker Container') {
      steps {
        script {
          def sshKey = credentials('your-ssh-key-credential-id')
          def sshUser = 'ec2-user'
          def sshCommand = "ssh -o StrictHostKeyChecking=no -i ${sshKey} ${sshUser}@${env.IP_ADDRESS}"
          sh "${sshCommand} 'sudo yum update -y'"
          sh "${sshCommand} 'sudo amazon-linux-extras install docker'"
          sh "${sshCommand} 'sudo service docker start'"
          sh "${sshCommand} 'sudo usermod -a -G docker ec2-user'"
          sh "${sshCommand} 'docker stop your-nextjs-app || true'"
          sh "${sshCommand} 'docker rm your-nextjs-app || true'"
          sh "${sshCommand} 'docker run -d --name your-nextjs-app -p 3000:3000 ${env.DOCKER_IMAGE}'"
        }
      }
    }
  }
}
