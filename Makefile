all: frontend backend deploy

.PHONY: frontend
frontend:
	docker build -t registry.service.consul:5000/e-commerce-frontend:131 -f frontend/Dockerfile frontend
	docker push registry.service.consul:5000/e-commerce-frontend:131

.PHONY: backend
backend:
	docker build -t registry.service.consul:5000/e-commerce-backend:131 -f backend/Dockerfile backend
	docker push registry.service.consul:5000/e-commerce-backend:131


deploy:
	nomad run job.hcl