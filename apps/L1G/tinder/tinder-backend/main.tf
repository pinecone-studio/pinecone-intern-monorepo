terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "0.16.0"
    }
  }
}

resource "vercel_project" "tinder-backend-prod" {
  name             = "tinder-backend-prod"
  build_command    = "nx build --skip-nx-cache tinder-backend"
  output_directory = "./dist/apps/L1G/tinder/tinder-backend/.next"
  framework        = "nextjs"
}
resource "vercel_project" "tinder-backend-testing" {
  name             = "tinder-backend-testing"
  build_command    = "nx build --skip-nx-cache tinder-backend"
  output_directory = "./dist/apps/L1G/tinder/tinder-backend/.next"
  framework        = "nextjs"
}
resource "vercel_project" "tinder-backend-dev" {
  name             = "tinder-backend-dev"
  build_command    = "nx build --skip-nx-cache tinder-backend"
  output_directory = "./dist/apps/L1G/tinder/tinder-backend/.next"
  framework        = "nextjs"
}



provider "vercel" {
  api_token = "RkzRvsWpfXnhiyioQ5r9pInL"
}