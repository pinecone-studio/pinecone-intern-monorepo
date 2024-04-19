terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.3"
    }
  }
}

resource "vercel_project" "articles-service-dev" {
  name             = "articles-service-dev"
  build_command    = "nx build --skip-nx-cache articles-service"
  output_directory = "./dist/apps/CMS/articles-service/.next"
  framework        = "nextjs"

  team_id = "team_0ASDilhqwPl5fll9OnzqDM30"
}

resource "vercel_project" "articles-service-testing" {
  name             = "articles-service-testing"
  build_command    = "nx build --skip-nx-cache articles-service"
  output_directory = "./dist/apps/CMS/articles-service/.next"
  framework        = "nextjs"
  team_id          = "team_0ASDilhqwPl5fll9OnzqDM30"
}

resource "vercel_project" "articles-service-prod" {
  name             = "articles-service-prod"
  build_command    = "nx build --skip-nx-cache articles-service"
  output_directory = "./dist/apps/CMS/articles-service/.next"
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
