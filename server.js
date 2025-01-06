const express = require("express");
const mysql = require("./database");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
//créer un produit
app.post("/things", (req, res) => {
  console.log("Body reçu:", req.body); // Debug
  const { name, price, category_id, description } = req.body; // Utiliser 'category_id' au lieu de 'category'

  if (!name || !price || !category_id || !description) {
    return res
      .status(400)
      .send("All fields (name, price, category_id, description) are required");
  }

  mysql
    .query(
      `INSERT INTO Products (name, price, category_id, description) VALUES (?, ?, ?, ?)`,
      [name, price, category_id, description] // Assurez-vous que 'category_id' est utilisé ici
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        return res.status(404).send("Product not created");
      }
      return res.status(201).send({
        message: "Product created successfully",
        product: { name, price, category_id, description }, // 'category_id' est utilisé ici
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({
        message: "Error creating product",
        error: err.message,
      });
    });
});

//supprimer un produit

app.delete("/things/:id", (req, res) => {
  const wantedId = parseInt(req.params.id);
  mysql
    .query("DELETE FROM Products WHERE id = ?", [wantedId])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        return res.status(404).send("Product not found");
      }
      return res.send("Product deleted successfully");
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send("Error deleting product");
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

//Créer une catégorie
app.post("/categories", (req, res) => {
  console.log("Body reçu:", req.body); // Debug
  const { name, description } = req.body;

  if (!name || !description) {
    return res
      .status(400)
      .send("Tous les champs (name, description) sont obligatoires");
  }

  mysql
    .query(`INSERT INTO Categories (name, description) VALUES (?, ?)`, [
      name,
      description,
    ])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        return res.status(404).send("Category not created");
      }
      return res.status(201).send({
        message: "Category created successfully",
        category: { name, description },
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({
        message: "Error creating category",
        error: err.message,
      });
    });
});
//supprimer une catégorie
app.delete("/categories/:id", (req, res) => {
  console.log("Body reçu:", req.body); // Debug
  const wantedId = parseInt(req.params.id);
  if (!wantedId) {
    return res.status(400).send("ID is required");
  }
  mysql
    .query("DELETE FROM Categories WHERE id = ?", [wantedId])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        return res.status(404).send("Category not found");
      }
      return res.send("Category deleted successfully");
    });
});

// Démarrer le serveur
const serverPort = 3310;

app.listen(serverPort, () => {
  console.info(`http://localhost:${serverPort}/things`);
  console.info(`http://localhost:${serverPort}/categories`);
});
