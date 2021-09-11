job "e-commerce" {
  datacenters = ["dc1"]
  type = "service"

  constraint {
    attribute = "${meta.node_type}"
    value     = "agent"
  }

  vault {
    policies = ["e-commerce"]
  }

  group "website-group" {
    count = 1
    update {
      min_healthy_time = "30s"
      auto_revert      = true
      health_check     = "checks"
    }

    network {
      port "frontend" {
        to = 3000
      }
      port "backend" {
        to = 5000
      }
    }

    task "frontend" {
      driver = "docker"

      resources {
        cpu    = 1500
        memory = 1024
      }

      config {
        ports      = ["frontend"]
        image      = "registry.service.consul:5000/e-commerce-frontend:20"
      }

      template {
        data = <<EOF
          {{ with secret "kv/e-commerce" }}
          ENVVAR="{{ .Data.ENVVAR }}"
          {{ end }}
        EOF
        destination = "secrets/e-commerce.env"
        env         = true
      }


      service {
        name = "e-commerce-frontend"
        tags = [
          "traefik.enable=true",
          "traefik.http.middlewares.web.redirectscheme.scheme=https",
          "traefik.http.routers.web_insecure.middlewares=web",
          "traefik.http.routers.web_insecure.rule=Host(`e-commerce.ansorren.unmanaged.io`)",
          "traefik.http.routers.web.rule=Host(`e-commerce.ansorren.unmanaged.io`)",
          "traefik.http.routers.web.tls=true",
        ]
        port = "frontend"
        check {
          type     = "http"
          port     = "frontend"
          interval = "10s"
          timeout  = "2s"
          path     = "/"
        }
      }
    }

    task "backend" {
      driver = "docker"

      resources {
        cpu    = 1500
        memory = 1024
      }

      config {
        ports      = ["backend"]
        image      = "registry.service.consul:5000/e-commerce-backend:20"
      }

      template {
        data = <<EOF
          {{ with secret "kv/e-commerce" }}
          ENVVAR1="{{ .Data.ENVVAR1 }}"
          ENVVAR2="{{ .Data.ENVVAR2 }}"
          {{ end }}
        EOF
        destination = "secrets/e-commerce.env"
        env         = true
      }

      service {
        name = "e-commerce-backend"
        port = "backend"
        check {
          type     = "http"
          port     = "backend"
          interval = "10s"
          timeout  = "2s"
          path     = "/"
        }
      }
    }
  }
}
