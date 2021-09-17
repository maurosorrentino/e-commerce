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
        image      = "registry.service.consul:5000/e-commerce-frontend:131"
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

    task "backend" {
      driver = "docker"

      resources {
        cpu    = 1500
        memory = 1024
      }

      config {
        ports      = ["backend"]
        image      = "registry.service.consul:5000/e-commerce-backend:131"
      }

      template {
        data = <<EOF
          {{ with secret "kv/e-commerce" }}
          MAIL_PASS="{{ .Data.MAIL_PASS }}"
          MAIL_USER="{{ .Data.MAIL_USER }}"
          MONGODB="{{ .Data.MONGODB }}"
          NODE_ENV="{{ .Data.NODE_ENV }}"
          PORT="{{ .Data.PORT }}"
          SESSION_SECRET="{{ .Data.SESSION_SECRET }}"
          STRIPE="{{ .Data.STRIPE }}"
          STRIPE_SECRET_KEY="{{ .Data.STRIPE_SECRET_KEY }}"
          TOKEN_SECRET="{{ .Data.TOKEN_SECRET }}"
          WEAK_TOKEN_SECRET="{{ .Data.WEAK_TOKEN_SECRET }}"
          URL="{{ .Data.URL }}"
          {{ end }}
        EOF
        destination = "secrets/e-commerce.env"
        env         = true
      }

      service {
        name = "e-commerce-backend"
        tags = [
          "traefik.enable=true",
          "traefik.http.middlewares.backend.redirectscheme.scheme=https",
          "traefik.http.routers.backend_insecure.middlewares=backend",
          "traefik.http.routers.backend_insecure.rule=Host(`e-commerce-backend.ansorren.unmanaged.io`)",
          "traefik.http.routers.backend.rule=Host(`e-commerce-backend.ansorren.unmanaged.io`)",
          "traefik.http.routers.backend.tls=true",
        ]
        port = "backend"
        
      }
    }
  }
}