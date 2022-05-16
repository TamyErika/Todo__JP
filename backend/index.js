const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Schema } = mongoose;
const app = express();

try {
  mongoose.connect(
    "mongodb+srv://nguyenthanhtung:nguyenthanhtung@cluster0.yeemj.mongodb.net/todo?retryWrites=true&w=majority"
  );
  console.log(`connect to database successfully `);
} catch (error) {
  console.log(error);
}
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
const toDoSchema = new Schema({
  todo: String,
  status: Boolean,
});
const Todo = mongoose.model("Todos", toDoSchema);
//  CRUD
// CREATE TODO
app.post("/todo/create", async function (req, res) {
  const data = req.body;
  console.log(data);
  try {
    await Todo.create(data);
    return res.json({
      statusCode: 200,
      message: `Create Todo Successufully`,
    });
  } catch (error) {
    return res.json({
      statusCode: 400,
      message: `Create Todo Fail`,
    });
  }
});

// GET TODO
app.get("/todo/get", async function (req, res) {
  const todos = await Todo.find({});
  return res.json({ todos });
});

// DELETE TODO
app.delete("/todo/delete/:id", async function (req, res) {
  try {
    const id = req.params.id;
    await Todo.deleteOne({ _id: id });
    return res.json({
      statusCode: 200,
      message: `Delete Todo Successfully`,
    });
  } catch (error) {
    return res.json({
      statusCode: 400,
      message: `Delete Todo Fail`,
    });
  }
});

// UPDATE DATA TODO
app.put("/todo/update/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const data = req.body;
    await Todo.updateOne({ _id: id }, data);
    return res.json({
      statusCode: 200,
      message: `Update successfully`,
    });
  } catch (error) {
    return res.json({
      statusCode: 400,
      message: `Update Fail`,
    });
  }
});

// UPDATE STATUS TODO
app.put("/todo/update/status/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const todo = await Todo.findOne({ _id: id });
    await Todo.updateOne({ _id: id }, { status: !todo.status });
    return res.json({
      statusCode: 200,
      message: `Update successfully`,
    });
  } catch (error) {
    return res.json({
      statusCode: 400,
      message: `Update Fail`,
    });
  }
});

app.listen(1234, () => {
  console.log(`App listening on link http://localhost:1234`);
});
