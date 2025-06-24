terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "0.16.0"
    }
  }
}

resource "vercel_project" "tinder-frontend-prod" {
  name             = "tinder-frontend-prod"
  build_command    = "nx build --skip-nx-cache tinder-frontend"
  output_directory = "./dist/apps/L1G/tinder/tinder-frontend/.next"
  framework        = "nextjs"
}
resource "vercel_project" "tinder-frontend-test" {
  name             = "tinder-frontend-testing"
  build_command    = "nx build --skip-nx-cache tinder-frontend"
  output_directory = "./dist/apps/L1G/tinder/tinder-frontend/.next"
  framework        = "nextjs"
}
resource "vercel_project" "tinder-frontend-dev" {
  name             = "tinder-frontend-dev"
  build_command    = "nx build --skip-nx-cache tinder-frontend"
  output_directory = "./dist/apps/L1G/tinder/tinder-frontend/.next"
  framework        = "nextjs"
}



provider "vercel" {
  # from the VERCEL_API_TOKEN environment variable
  api_token = "RkzRvsWpfXnhiyioQ5r9pInL"

}