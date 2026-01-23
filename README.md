# MediaTracker

## Pré-requis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés :

- **Node.js** (version 20 ou supérieure recommandée) ou **Bun**
- **Docker** et **Docker Compose**
- Un fichier `.env` à la racine du projet (voir configuration ci-dessous)

## Configuration des variables d'environnement

Copiez le fichier d'exemple et remplissez les valeurs :

```bash
cp .env.example .env
```

Assurez-vous que les variables `JWT_SECRET` et `AUTH_SECRET` sont bien renseignées. Vous pouvez en générer via :

```bash
openssl rand -base64 32
```

> **Note** : Le frontend utilise `NEXT_PUBLIC_API_URL` pour les appels côté navigateur et `INTERNAL_API_URL` pour les appels côté serveur. En local avec Bun, les deux pointent généralement vers `http://localhost:3000/graphql`. Dans Docker, `INTERNAL_API_URL` est automatiquement géré pour pointer vers `http://backend:3000/graphql`.

## Lancement du projet

### Option 1 : Via Docker (Recommandé)

Pour lancer l'ensemble du projet (base de données, Redis, backend et frontend) :

```bash
docker compose up --build
```

Ou via le Makefile : `make up`

Une fois lancé :

- **Frontend** : `http://localhost:3001`
- **Backend (GraphQL)** : `http://localhost:3000/graphql`

### Option 2 : Développement local (Bun)

1. **Lancer les services d'infrastructure** (DB & Redis) :

   ```bash
   docker compose up postgres -d
   ```

2. **Installer les dépendances** :

   ```bash
   bun install
   ```

3. **Lancer le backend** :

   ```bash
   cd backend
   bun run dev
   ```

4. **Lancer le frontend** :
   ```bash
   cd frontend
   bun run dev
   ```

Le frontend sera accessible sur `http://localhost:3001` et le backend sur `http://localhost:3000/graphql`.

> **Note sur les ports** : Par défaut, le backend utilise le port **3000** et le frontend le port **3001** (configuré dans leurs fichiers `package.json` ou via les variables d'environnement). En mode Docker, ces ports sont mappés pour correspondre à cette configuration.

## Gestion des dépendances (Monorepo)

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
