provider "aws" {
  version = "~> 3.15.0"
  region  = "ap-southeast-1"
}

terraform {
  backend "s3" {
    bucket = "ry-terraform-state"
    key    = "last-poop-service/terraform.tfstate"
    region = "ap-southeast-1"
  }
}