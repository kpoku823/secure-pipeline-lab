provider "aws" {
  region = "eu-west2"
}

resource "aws_s3_bucket" "insecure_bucket" {
  bucket = "my-insecure-bucket-demo-12345"
}