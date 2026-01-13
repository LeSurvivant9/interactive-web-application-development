# MediaTracker

## Pré-requis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés :

- **Node.js** (version 20 ou supérieure recommandée) ou **Bun**
- **Docker** et **Docker Compose**
- Un fichier `.env` à la racine du projet (voir configuration ci-dessous)

### Configuration des variables d'environnement

Créez un fichier `.env` à la racine avec les variables suivantes :

```env
POSTGRES_USER=votre_utilisateur
POSTGRES_PASSWORD=votre_mot_de_passe
POSTGRES_DB=mediatracker
NEXT_PUBLIC_API_URL=http://localhost:3000/graphql
JWT_SECRET=votre_secret_jwt
```

Pour générer un `JWT_SECRET` sécurisé, vous pouvez utiliser la commande suivante :

```bash
openssl rand -base64 32
```

## Lancement rapide (Makefile)

Si vous avez `make` installé sur votre machine, vous pouvez utiliser les commandes suivantes pour simplifier la gestion du projet :

- `make build` : Construit les images Docker.
- `make up` : Lance le projet en tâche de fond.
- `make logs` : Affiche les logs en temps réel.
- `make down` : Arrête les services.
- `make clean` : Arrête et supprime les volumes (attention, les données de la DB seront perdues).

## Lancement avec Docker

Pour lancer l'ensemble du projet (base de données, redis, backend et frontend) avec Docker manuellement :

```bash
docker compose up --build
```

Une fois lancé :

- Le frontend est accessible sur : `http://localhost:3001`
- Le backend est accessible sur : `http://localhost:3000`

## Installation des dépendances (Développement local)

Pour installer les dépendances de l'ensemble du projet (monorepo), exécutez la commande suivante à la racine :

```bash
bun install
```

### Ajouter des dépendances

- **Globalement (à la racine) :**

  ```bash
  bun add <package_name>
  ```

- **Spécifiquement pour le backend :**

  ```bash
  bun add <package_name> --cwd backend
  ```

- **Spécifiquement pour le frontend :**
  ```bash
  bun add <package_name> --cwd frontend
  ```
