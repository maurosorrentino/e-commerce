all: frontend backend deploy-frontend deploy-backend

.PHONY: frontend
frontend:
	docker build -t registry.service.consul:5000/e-commerce-frontend:30 -f frontend/Dockerfile frontend
	docker push registry.service.consul:5000/e-commerce-frontend:30

.PHONY: backend
backend:
	docker build -t registry.service.consul:5000/e-commerce-backend:30 -f backend/Dockerfile backend
	docker push registry.service.consul:5000/e-commerce-backend:30


deploy-frontend:
	nomad run job-frontend.hcl

deploy-backend:
	nomad run job-backend.hcl