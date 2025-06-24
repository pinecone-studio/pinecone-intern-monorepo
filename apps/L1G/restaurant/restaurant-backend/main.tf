terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "0.16.0"
    }
  }
}

resource "vercel_project" "restaurant-backend-prod" {
  name             = "restaurant-backend-prod"
  build_command    = "nx build --skip-nx-cache restaurant-backend"
  output_directory = "./dist/apps/L1G/restaurant/restaurant-backend/.next"
  framework        = "nextjs"
}
resource "vercel_project" "restaurant-backend-testing" {
  name             = "restaurant-backend-testing"
  build_command    = "nx build --skip-nx-cache restaurant-backend"
  output_directory = "./dist/apps/L1G/restaurant/restaurant-backend/.next"
  framework        = "nextjs"
}
resource "vercel_project" "restaurant-backend-dev" {
  name             = "restaurant-backend-dev"
  build_command    = "nx build --skip-nx-cache restaurant-backend"
  output_directory = "./dist/apps/L1G/restaurant/restaurant-backend/.next"
  framework        = "nextjs"
}



provider "vercel" {
  api_token = "xj5qgHzKDGw64IhMVGaY1mDc"
}