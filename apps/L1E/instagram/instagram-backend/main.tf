terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "0.16.0"
    }
  }
}

resource "vercel_project" "instagram-backend-prod" {
  name             = "instagram-backend-prod"
  build_command    = "nx build --skip-nx-cache instagram-backend"
  output_directory = "./dist/apps/L1E/instagram/instagram-backend/.next"
  framework        = "nextjs"
}
resource "vercel_project" "instagram-backend-testing" {
  name             = "instagram-backend-testing"
  build_command    = "nx build --skip-nx-cache instagram-backend"
  output_directory = "./dist/apps/L1E/instagram/instagram-backend/.next"
  framework        = "nextjs"
}
resource "vercel_project" "instagram-backend-dev" {
  name             = "instagram-backend-dev"
  build_command    = "nx build --skip-nx-cache instagram-backend"
  output_directory = "./dist/apps/L1E/instagram/instagram-backend/.next"
  framework        = "nextjs"
}



provider "vercel" {
  api_token = "9iuEHjyGIAyN9780eGafxG7z"
}
