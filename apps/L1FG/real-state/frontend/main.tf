terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.3"
    }
  }
}

resource "vercel_project" "real-state-frontend-prod" {
  name             = "intern-1fg-real-state-frontend-prod"
  build_command    = "nx build --skip-nx-cache real-state-frontend"
  output_directory = "./dist/apps/L1FG/real-state/frontend/.next"
  framework        = "nextjs"
  team_id          = "team_0ASDilhqwPl5fll9OnzqDM30"
}
resource "vercel_project" "real-state-frontend-testing" {
  name             = "intern-1fg-real-state-frontend-testing"
  build_command    = "nx build --skip-nx-cache real-state-frontend"
  output_directory = "./dist/apps/L1FG/real-state/frontend/.next"
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