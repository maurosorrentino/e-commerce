project = "e-commerce-frontend"

app "e-commerce-frontend" {

  build {
    use "pack" {}
    registry {

      use "docker" {
        image = "registry.service.consul:5000/e-commerce-frontend"
        tag   = "1"
        local = true

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


