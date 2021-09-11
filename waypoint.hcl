project = "ecommerce"

  app "ecommerce" {

    build {
      use "pack" {}
      registry {
          use "docker" {
            image = "ecommerce"
            tag = "1"
            local = true
          }
      }
  }

    deploy {
      use "nomad" {
        datacenter = "dc1"
      }
    }
  }