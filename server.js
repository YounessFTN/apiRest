const express = require("express");
const mysql = require("./database");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Récupérer un produit par son ID
app.get("/things/:id", (req, res) => {
  const wantedId = parseInt(req.params.id);

  mysql
    .query("SELECT * FROM Products WHERE id = ?", [wantedId])
    .then(([products]) => {
      const product = products.find((product) => product.id === wantedId);
      console.log(product);
      if (product) {
        return res.json(product);
      } else {
        return res.status(404).send("Product not found");
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send("Error retrieving data from database");
    });
});

// Récupérer tous les produits
app.get("/things", (req, res) => {
  mysql
    .query("SELECT * FROM Products")
    .then(([products]) => {
      console.log(products);
      return res.json(products);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send("Error retrieving data from database");
    });
});

// Récupérer tous les produits d'une catégorie
app.get("/things/category/:categoryId", (req, res) => {
  const categoryId = parseInt(req.params.categoryId);

  mysql
    .query("SELECT * FROM Products WHERE category_id = ?", [categoryId])
    .then(([products]) => {
      console.log(products);
      return res.json(products);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send("Error retrieving data from database");
    });
});

// Récupérer une catégorie par son ID
app.get("/categories/:id", (req, res) => {
  const wantedId = parseInt(req.params.id);

  mysql
    .query("SELECT * FROM Categories WHERE id = ?", [wantedId])
    .then(([categories]) => {
      const category = categories.find((category) => category.id === wantedId);
      console.log(category);
      if (category) {
        return res.json(category);
      } else {
        return res.status(404).send("Category not found");
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send("Error retrieving data from database");
    });
});

// Récupérer toutes les catégories
app.get("/categories", (req, res) => {
  mysql
    .query("SELECT * FROM Categories")
    .then(([categories]) => {
      console.log(categories);
      return res.json(categories);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send("Error retrieving data from database");
    });
});

// Mise à jour du produit par ID
app.post("/things/:id", (req, res) => {
  console.log("Body reçu:", req.body); // Debug
  const wantedId = parseInt(req.params.id);
  const { name, price, category_id, description } = req.body;

  if (!name || !price || !category_id || !description) {
    return res
      .status(400)
      .send("All fields (name, price, category, description) are required");
  }

  mysql
    .query(
      "UPDATE Products SET name = ?, price = ?, category_id = ?, description = ? WHERE id = ?",
      [name, price, category_id, description, wantedId]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        return res.status(404).send("Product not found");
      }
      return res.send("Product updated successfully");
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send("Error updating product");
    });
});

// Démarrer le serveur
const serverPort = 3310;

app.listen(serverPort, () => {
  console.info(`http://localhost:${serverPort}/things`);
});
