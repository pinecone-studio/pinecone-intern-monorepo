terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "0.16.0"
    }
  }
}

resource "vercel_project" "restaurant-frontend-prod" {
  name             = "restaurant-frontend-prod"
  build_command    = "nx build --skip-nx-cache restaurant-frontend"
  output_directory = "./dist/apps/L1G/restaurant/restaurant-frontend/.next"
  framework        = "nextjs"
}
resource "vercel_project" "restaurant-frontend-test" {
  name             = "restaurant-frontend-testing"
  build_command    = "nx build --skip-nx-cache restaurant-frontend"
  output_directory = "./dist/apps/L1G/restaurant/restaurant-frontend/.next"
  framework        = "nextjs"
}
resource "vercel_project" "restaurant-frontend-dev" {
  name             = "restaurant-frontend-dev"
  build_command    = "nx build --skip-nx-cache restaurant-frontend"
  output_directory = "./dist/apps/L1G/restaurant/restaurant-frontend/.next"
  framework        = "nextjs"
}



provider "vercel" {
  # from the VERCEL_API_TOKEN environment variable
  api_token = "xj5qgHzKDGw64IhMVGaY1mDc"

}