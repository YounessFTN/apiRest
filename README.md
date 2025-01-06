# Gestion de Produits et Catégories

Ce projet implémente une application Node.js avec Express permettant de gérer des **produits** et des **catégories**. Les utilisateurs peuvent ajouter, modifier, lister et supprimer des produits et des catégories.

## Fonctionnalités

### Catégories

- Lister toutes les catégories
- Créer une nouvelle catégorie
- Modifier une catégorie existante
- Supprimer une catégorie

### Produits

- Lister tous les produits
- Créer un nouveau produit (en spécifiant la catégorie associée)
- Modifier un produit existant
- Supprimer un produit

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

- [Node.js](https://nodejs.org) (version 14 ou supérieure)
- [MySQL](https://www.mysql.com/) pour la gestion de la base de données

## Installation

1. **Clonez le repository**

   Clonez ce repository sur votre machine locale en utilisant la commande suivante :

   ```bash
   git clone git@github.com:YounessFTN/apiRest.git
   ```

2. **Installez les dépendances**

   Accédez au dossier du projet et installez les dépendances avec npm :

   ```bash
   cd apiRest
   npm install
   ```

3. **Configurez la base de données**

   Lancé `Mamp`. Ensuite, créez une base de données et une table pour les produits et catégories(voir dossier `database`).

   Exemple de commande SQL pour créer les tables :

   ```bash
    CREATE DATABASE gestion_produits;

    USE gestion_produits;

    CREATE TABLE Categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT
    );

    CREATE TABLE Products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      description TEXT,
      category_id INT,
      FOREIGN KEY (category_id) REFERENCES Categories(id)
    );
   ```

4. **Démarrez le serveur**

   Pour démarrer le serveur, exécutez la commande suivante :

   ```bash
   npm run dev
   ```

**Créé par Youness Fatine, le meilleur joueur d'échecs !**
