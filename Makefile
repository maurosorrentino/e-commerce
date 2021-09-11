all: frontend backend deploy

.PHONY: frontend
frontend:
	docker build -t registry.service.consul:5000/e-commerce-frontend:26 -f frontend/Dockerfile frontend
	docker push registry.service.consul:5000/e-commerce-frontend:26

.PHONY: backend
backend:
	docker build -t registry.service.consul:5000/e-commerce-backend:26 -f backend/Dockerfile backend
	docker push registry.service.consul:5000/e-commerce-backend:26


deploy:
	nomad run job-frontend.hcl
	nomad run job-backend.hcl