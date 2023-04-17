provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "example" {
  ami           = "ami-06e46074ae430fba6"
  instance_type = "t2.micro"
  key_name      = "myapp"

  # Replace with your own security group ID
  vpc_security_group_ids = [var.security_group_id]
  
  user_data = <<EOF
              #!/bin/bash
              # Install Docker
              sudo apt-get update
              sudo apt-get install -y docker.io
              
              # Run your Next.js app container
              sudo docker run -p 3000:3000 your-docker-image
              EOF
}
resource "aws_key_pair" "mykey" {
  key_name    = "myapp"
  public_key  = file(var.PATH_TO_PUBLIC_KEY)
}

output "public_ip" {
  value = aws_instance.example.public_ip
}
