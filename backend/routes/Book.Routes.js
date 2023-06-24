const express = require("express");

const bookRouter = express.Router();

const { BookModel } = require("../model/Book.Model");


bookRouter.get("/get", async (req, res) => {
  
    let total = [];
  
    const { name, author, sortBy, rating, price, page, limit } = req.query;
  
    const query = {};
  
    if (price) {
      query.price = { $in: price };
    }
  
    if (name) {
      query.name = { $in: name };
    }
  
    if (author) {
      query.author = { $in: author };
    }
  
    if (rating) {
      query.rating = { $in: rating };
    }
  
   
    const sort = {};

    const pageNumber = page || 1;

    const pageLimit = limit || 20;

    const pagination = pageNumber * pageLimit - pageLimit || 0;
  
    if (sortBy) {
      sort["price"] = sortBy === "asc" ? 1 : "desc" ? -1 : "" || 1;
    }
  
    try {
      const posts = await BookModel.find(query)
        .sort(sort)

        .skip(pagination) 

        .limit(pageLimit);
  
      if (posts) {
        res.send(posts);
        total.push(posts.length);


      }
    } catch (error) {

      res.send({ msg: "Something went wrong", error: error });
    }
  });

bookRouter.post("/addbook", async (req, res) => {

  const payload = req.body;

  // console.log(payload)

  const post = new BookModel(payload);

  await post.save();

  res.send({ msg: "book added" });
});


bookRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;

  const payload = req.body;


  try {
    await BookModel.findByIdAndUpdate({ _id: id }, payload);
    res.send({ msg: "Updated Successfully" });

  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});

bookRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await BookModel.findByIdAndDelete({ _id: id });
    res.send({ msg: "Deleted Successfully" });
  } catch (err) {
    
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});



module.exports = { bookRouter };
