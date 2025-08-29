terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "0.16.0"
    }
  }
}

resource "vercel_project" "ticket-booking-backend-prod" {
  name             = "ticket-booking-backend-prod"
  build_command    = "nx build --skip-nx-cache ticket-booking-backend"
  output_directory = "./dist/apps/L1E/ticket-booking/ticket-booking-backend/.next"
  framework        = "nextjs"
}
resource "vercel_project" "ticket-booking-backend-testing" {
  name             = "ticket-booking-backend-testing"
  build_command    = "nx build --skip-nx-cache ticket-booking-backend"
  output_directory = "./dist/apps/L1E/ticket-booking/ticket-booking-backend/.next"
  framework        = "nextjs"
}
resource "vercel_project" "ticket-booking-backend-dev" {
  name             = "ticket-booking-backend-dev"
  build_command    = "nx build --skip-nx-cache ticket-booking-backend"
  output_directory = "./dist/apps/L1E/ticket-booking/ticket-booking-backend/.next"
  framework        = "nextjs"
}



provider "vercel" {
  api_token = "wsZ8QIWpp8RAnnmDsUPc4p0m"
}