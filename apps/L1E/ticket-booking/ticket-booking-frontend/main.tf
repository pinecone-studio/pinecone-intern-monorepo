terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "0.16.0"
    }
  }
}

resource "vercel_project" "ticket-booking-frontend-prod" {
  name             = "ticket-booking-frontend-prod"
  build_command    = "nx build --skip-nx-cache ticket-booking-frontend"
  output_directory = "./dist/apps/L1E/ticket-booking/ticket-booking-frontend/.next"
  framework        = "nextjs"
}
resource "vercel_project" "ticket-booking-frontend-test" {
  name             = "ticket-booking-frontend-testing"
  build_command    = "nx build --skip-nx-cache ticket-booking-frontend"
  output_directory = "./dist/apps/L1E/ticket-booking/ticket-booking-frontend/.next"
  framework        = "nextjs"
}
resource "vercel_project" "ticket-booking-frontend-dev" {
  name             = "ticket-booking-frontend-dev"
  build_command    = "nx build --skip-nx-cache ticket-booking-frontend"
  output_directory = "./dist/apps/L1E/ticket-booking/ticket-booking-frontend/.next"
  framework        = "nextjs"
}



provider "vercel" {
  # from the VERCEL_API_TOKEN environment variable
  api_token = "wsZ8QIWpp8RAnnmDsUPc4p0m"

}