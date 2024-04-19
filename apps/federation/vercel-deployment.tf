terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.3"
    }
  }
}

resource "vercel_project" "intern-federation-dev" {
  name             = "intern-federation-dev"
  build_command    = "nx build --skip-nx-cache federation  --configuration=development"
  output_directory = "./dist/apps/federation"
  framework        = "nextjs"

  team_id = "team_0ASDilhqwPl5fll9OnzqDM30"
}

resource "vercel_project" "intern-federation-testing" {
  name             = "intern-federation-testing"
  build_command    = "nx build --skip-nx-cache federation  --configuration=testing"
  output_directory = "./dist/apps/federation"
  framework        = "nextjs"
  team_id          = "team_0ASDilhqwPl5fll9OnzqDM30"
}

resource "vercel_project" "intern-federation-prod" {
  name             = "intern-federation-prod"
  build_command    = "nx build --skip-nx-cache federation  --configuration=production"
  output_directory = "./dist/apps/federation"
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
