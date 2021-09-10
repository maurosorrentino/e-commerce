job "e-commerce" {
  datacenters = ["dc1"]
  type = "service"

  constraint {
    attribute = "$${meta.node_type}"
    value     = "agent"
  }

  group "website-group" {
    count = 1
    update {
      min_healthy_time = "30s"
      auto_revert      = true
      health_check     = "checks"
    }

    network {
      port "http" {
        to = 3000
      }
    }

    task "website" {
      driver = "docker"

      resources {
        cpu    = 1500
        memory = 1024
      }

      config {
        ports      = ["http"]
        image      = "${artifact.image}:${artifact.tag}"
      }

      service {
        name = "e-commerce"
        tags = [
          "traefik.enable=true",
          "traefik.http.middlewares.web.redirectscheme.scheme=https",
          "traefik.http.routers.web_insecure.middlewares=web",
          "traefik.http.routers.web_insecure.rule=Host(`e-commerce.ansorren.unmanaged.io`)",
          "traefik.http.routers.web.rule=Host(`e-commerce.ansorren.unmanaged.io`)",
          "traefik.http.routers.web.tls=true",
        ]
        port = "http"
        check {
          type     = "http"
          port     = "http"
          interval = "10s"
          timeout  = "2s"
          path     = "/"
        }
      }
    }
  }
}