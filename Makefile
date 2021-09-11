all: frontend backend deploy

.PHONY: frontend
frontend:
	docker build -t registry.service.consul:5000/e-commerce-frontend:20 -f frontend/Dockerfile . 
	docker push registry.service.consul:5000/e-commerce-frontend:20

.PHONY: backend
backend:
	docker build -t registry.service.consul:5000/e-commerce-backend:20 -f backend/Dockerfile .
	docker push registry.service.consul:5000/e-commerce-backend:20


deploy:
	nomad run job.hcl
