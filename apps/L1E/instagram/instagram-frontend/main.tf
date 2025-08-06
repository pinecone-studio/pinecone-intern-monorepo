terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "0.16.0"
    }
  }
}

resource "vercel_project" "instagram-frontend-prod" {
  name             = "instagram-frontend-prod"
  build_command    = "nx build --skip-nx-cache instagram-frontend"
  output_directory = "./dist/apps/L1E/instagram/instagram-frontend/.next"
  framework        = "nextjs"
}
resource "vercel_project" "instagram-frontend-test" {
  name             = "instagram-frontend-testing"
  build_command    = "nx build --skip-nx-cache instagram-frontend"
  output_directory = "./dist/apps/L1E/instagram/instagram-frontend/.next"
  framework        = "nextjs"
}
resource "vercel_project" "instagram-frontend-dev" {
  name             = "instagram-frontend-dev"
  build_command    = "nx build --skip-nx-cache instagram-frontend"
  output_directory = "./dist/apps/L1E/instagram/instagram-frontend/.next"
  framework        = "nextjs"
}



provider "vercel" {
  # from the VERCEL_API_TOKEN environment variable
  api_token = "9iuEHjyGIAyN9780eGafxG7z"

}
