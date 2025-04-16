terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.3"
    }
  }
}

resource "vercel_project" "instagram-service-prod" {
  name             = "instagram-service-prod"
  build_command    = "nx build --skip-nx-cache instagram-service"
  output_directory = "./dist/apps/L2A/instagram/service/.next"
  framework        = "nextjs"
  team_id          = "team_8yY6cK1hilG3FkMG2fRJ8dVl"
}
resource "vercel_project" "instagram-service-test" {
  name             = "instagram-service-test"
  build_command    = "nx build --skip-nx-cache instagram-service"
  output_directory = "./dist/apps/L2A/instagram/service/.next"
  framework        = "nextjs"
  team_id          = "team_8yY6cK1hilG3FkMG2fRJ8dVl"
}
resource "vercel_project" "instagram-service-dev" {
  name             = "instagram-service-dev"
  build_command    = "nx build --skip-nx-cache instagram-service"
  output_directory = "./dist/apps/L2A/instagram/service/.next"
  framework        = "nextjs"
  team_id          = "team_8yY6cK1hilG3FkMG2fRJ8dVl"
}

variable "VERCEL_TOKEN" {
  type        = string
  description = "Optionally say something about this variable"
}

provider "vercel" {
  # Or omit this for the api_token to be read
  # from the VERCEL_API_TOKEN environment variable
  api_token = var.VERCEL_TOKEN

  # Optional default team for all resources
  team = "team_8yY6cK1hilG3FkMG2fRJ8dVl"
}