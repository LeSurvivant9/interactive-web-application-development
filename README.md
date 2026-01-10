# MediaTracker

## Installation des dépendances

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
