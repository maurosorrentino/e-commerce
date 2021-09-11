project = "e-commerce-frontend"

app "e-commerce-frontend" {

  build {
    use "docker" {}
    registry {

      use "docker" {
        image = "registry.service.consul:5000/e-commerce-frontend"
        tag   = "3"
        local = false

      }
    }
  }

  deploy {

    use "nomad-jobspec" {
      // Templated to perhaps bring in the artifact from a previous
      // build/registry, entrypoint env vars, etc.
      jobspec = templatefile("${path.app}/job.hcl")
    }
  }
}