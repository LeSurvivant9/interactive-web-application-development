# Makefile
COMPOSE=docker compose

.PHONY: all build up down logs clean shell-backend shell-frontend

all: build up

# Build optimisé (utilise le cache)
build:
	$(COMPOSE) build

# Force rebuild (sans cache)
rebuild:
	$(COMPOSE) build --no-cache

# Lance l'app en tâche de fond
up:
	$(COMPOSE) up -d

# Arrête tout
down:
	$(COMPOSE) down

# Affiche les logs en temps réel
logs:
	$(COMPOSE) logs -f

# Nettoie les conteneurs et volumes orphelins
clean:
	$(COMPOSE) down -v --remove-orphans

# Accès shell direct au backend
shell-backend:
	docker exec -it mediatracker_api /bin/sh

# Accès shell direct au frontend
shell-frontend:
	docker exec -it mediatracker_ui /bin/sh

prod-update:
	git pull
	$(COMPOSE) up -d --build --remove-orphans
	$(COMPOSE) image prune -f