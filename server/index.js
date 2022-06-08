// Banco de dados: My SQL => instaciado da seguinte forma: yarn add mysql express cors nodemon 

const express = require("express"); //instanciando o servidor da aplicação porém, não está inciado
const app = express(); // iniciando o srv da app
const mysql = require("mysql"); // instanciando conexão com o banco (my SQL por ser fácil de trampar)
const cors = require("cors");

//Parâmetros do banco de dados
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

app.use(express.json());
app.use(cors());

//Inserção de dados
app.post("/register", (req, res) => {
  const { name } = req.body;
  const { cost } = req.body;
  const { category } = req.body;
    //console.log(name); // teste de console p ver se as informações estão vindo

  let mysql = "INSERT INTO games ( name, cost, category) VALUES (?, ?, ?)";
  db.query(mysql, [name, cost, category], (err, result) => {
    res.send(result);
  });
});


//Busca de dados
app.post("/search", (req, res) => {
  const { name } = req.body;
  const { cost } = req.body;
  const { category } = req.body;

  let mysql =
    "SELECT * from games WHERE name = ? AND cost = ? AND category = ?";
  db.query(mysql, [name, cost, category], (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

app.get("/getCards", (req, res) => {
  let mysql = "SELECT * FROM games";
  db.query(mysql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});



// Update
app.patch("/edit/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { cost } = req.body;
  const { category } = req.body;
  let mysql = "UPDATE games SET name = ?, cost = ?, category = ? WHERE id = ?";
  db.query(mysql, [name, cost, category, id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

//Delete
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let mysql = "DELETE FROM games WHERE id = ?";
  db.query(mysql, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


//Script somente p testar o banco
// 'req' é toda informação que vai entrar
// 'res' é o resultado que a informação gera depois de ser 'tratada' ou não.
//app.get("/",(req,res)=>{let SQL = "insert into produto (nome, categoria, preco) values ('Boné', 'Acessorios', 'R$ 4.00');" //pequeno script de lançamento de informação no banco
//db.query(SQL, (err, result) => {console.log(err);})
//});




app.listen(3001, () => {
  console.log("Servidor Ok");
});
