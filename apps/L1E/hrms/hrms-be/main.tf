terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.3"
    }
  }
}

resource "vercel_project" "hrms_service_prod" {
  name             = "hrms-service-prod"
  build_command    = "nx build --skip-nx-cache hrms-be"
  output_directory = "./dist/apps/L1E/hrms/hrms-be/.next"
  framework        = "nextjs"
  team_id          = "team_0ASDilhqwPl5fll9OnzqDM30"
}
resource "vercel_project" "hrms_service_testing" {
  name             = "hrms-service-testing"
  build_command    = "nx build --skip-nx-cache hrms-be"
  output_directory = "./dist/apps/L1E/hrms/hrms-be/.next"
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