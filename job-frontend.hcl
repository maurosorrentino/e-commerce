job "e-commerce-frontend" {
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
    }

    task "frontend" {
      driver = "docker"

      resources {
        cpu    = 1500
        memory = 1024
      }

      config {
        ports      = ["frontend"]
        image      = "registry.service.consul:5000/e-commerce-frontend:26"
      }

      template {
        data = <<EOF
          {{ with secret "kv/e-commerce" }}
          CLOUDINARY="{{ .Data.CLOUDINARY }}"
          PRESET="{{ .Data.PRESET }}"
          STRIPE="{{ .Data.STRIPE }}"
          NEXT_PUBLIC_API_URL="{{ .Data.NEXT_PUBLIC_API_URL }}"
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
  }
}
