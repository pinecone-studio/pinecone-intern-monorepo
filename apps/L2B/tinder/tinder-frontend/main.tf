terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.3"
    }
  }
}

resource "vercel_project" "Tinder-frontend-2025-2B" {
  name             = "Tinder-frontend-2025-2B"
  build_command    = "nx build --skip-nx-cache Tinder-frontend-2025-2B"
  output_directory = "./dist/apps/L2B/tinder/tinder-frontend/.next"
  framework        = "nextjs"
  team_id          = "team_0ASDilhqwPl5fll9OnzqDM30"
}
resource "vercel_project" "Tinder-frontend-2025-2B" {
  name             = "Tinder-frontend-2025-2B"
  build_command    = "nx build --skip-nx-cache Tinder-frontend-2025-2B"
  output_directory = "./dist/apps/L2B/tinder/tinder-frontend/.next"
  framework        = "nextjs"
  team_id          = "team_0ASDilhqwPl5fll9OnzqDM30"
}
resource "vercel_project" "Tinder-frontend-2025-2B" {
  name             = "Tinder-frontend-2025-2B"
  build_command    = "nx build --skip-nx-cache Tinder-frontend-2025-2B"
  output_directory = "./dist/apps/L2B/tinder/tinder-frontend/.next"
  framework        = "nextjs"
  team_id          = "team_0ASDilhqwPl5fll9OnzqDM30"
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
  team = "team_0ASDilhqwPl5fll9OnzqDM30"
}