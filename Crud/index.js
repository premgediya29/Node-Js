const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const app = express();

const port = 7000;

mongoose.connect("mongodb://localhost:27017/crudDB", {

}).then(() => {
  console.log("Database connected");
}).catch(err => console.log("Database connection error: ", err));

// Defining schema
const crudSchema = new mongoose.Schema({
  name: String,
  subject: String,
  image: String
});

const Crud = mongoose.model("Crud", crudSchema);

// Multer configuration for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }).single("image");

app.set("view engine", "ejs");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", async (req, res) => {
  try {
    const data = await Crud.find({});
    res.render("index", { data });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/insert", upload, async (req, res) => {
  try {
    req.body.image = req.file.path;
    await Crud.create(req.body);
    res.redirect("/");
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/deleteData", async (req, res) => {
  try {
    const record = await Crud.findById(req.query.id);
    fs.unlinkSync(record.image);
    await Crud.findByIdAndDelete(req.query.id);
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/editData', async (req, res) => {
  try {
    const data = await Crud.findById(req.query.id);
    res.render('edit', { editschema: data });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/updateData", upload, async (req, res) => {
  try {
    const record = await Crud.findById(req.query.id);
    if (req.file) {
      fs.unlinkSync(record.image);
      req.body.image = req.file.path;
    } else {
      req.body.image = record.image;
    }
    await Crud.findByIdAndUpdate(req.query.id, req.body);
    res.redirect("/");
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
