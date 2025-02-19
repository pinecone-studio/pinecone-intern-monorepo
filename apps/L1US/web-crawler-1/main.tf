terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.3"
    }
  }
}

resource "vercel_project" "web-crawler-1" {
  name             = "web-crawler-1"
  build_command    = "nx build --skip-nx-cache web-crawler-1"
  output_directory = "./dist/apps/L1US/web-crawler-1/.next"
  framework        = "nextjs"
  team_id          = "team_0ASDilhqwPl5fll9OnzqDM30"
}
resource "vercel_project" "web-crawler-1" {
  name             = "web-crawler-1"
  build_command    = "nx build --skip-nx-cache web-crawler-1"
  output_directory = "./dist/apps/L1US/web-crawler-1/.next"
  framework        = "nextjs"
  team_id          = "team_0ASDilhqwPl5fll9OnzqDM30"
}
resource "vercel_project" "web-crawler-1" {
  name             = "web-crawler-1"
  build_command    = "nx build --skip-nx-cache web-crawler-1"
  output_directory = "./dist/apps/L1US/web-crawler-1/.next"
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