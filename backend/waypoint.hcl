project = "e-commerce-backend"

app "e-commerce-backend" {

  build {
    use "docker" {}
    registry {

      use "docker" {
        image = "registry.service.consul:5000/e-commerce-backend"
        tag   = "13"
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
