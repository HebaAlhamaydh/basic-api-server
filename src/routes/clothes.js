"use strict";
const express = require("express");

//in this line we are taking the routing functionality from express

const { Clothes } = require("../models/index");
const clothesRouter = express.Router();

//add routes
clothesRouter.get("/clothes", getClothes);
clothesRouter.get("/clothes/:id", getOneClothes);
clothesRouter.post("/clothes", addClothes);
clothesRouter.put("/clothes/:id", updateClothes);
clothesRouter.delete("/clothes/:id", deleteClothes);
// to add functionality we need to add
async function getClothes(req, res) {
    const allClothes = await Clothes.findAll();
    res.status(200).json(allClothes);
}
//if we want to find one
async function getOneClothes(req, res) {
    //just make sure to parse it into int because it will be a number but in string format
    const clothesId = parseInt(req.params.id);
    let clothes = await Clothes.findOne({ where: { id: clothesId } });
    res.status(200).json(clothes);
}

// for adding new record
async function addClothes(req, res) {
    //adding a person to DB or File or whatever
    //regarding the success status for the post it is not 200 it's from 200's family it's 201 once you added something and it's successfully created
    let newClothes = req.body;
    let clothes = await Clothes.create(newClothes);
    res.status(201).json(clothes);
}

async function updateClothes(req, res) {
    //just make sure to parse it into int because it will be a number but in string format
    let clothesId = parseInt(req.params.id);
    let updateClothes = req.body; //the one that the form will send to us from the frontend
    //to update the person i need to find it first then update it
    let foundClothes = await Clothes.findOne({ where: { id: clothesId } });
    if (foundClothes) {

        let updatedClothes = await foundClothes.update(updateClothes);
        res.status(201).json(updatedClothes);
    } else {
        // throw new Error('there is not such id');
        res.status(404);
    }
}
async function deleteClothes(req, res) {
    const clothesId = parseInt(req.params.id);
    const foundClothes = await Clothes.findOne({ where: { id: clothesId } });
    if (foundClothes) {
      await foundClothes.destroy();
      res.status(204).json({ message: 'clothes is deleted' });
    } else {
      res.status(404).json({ message: 'clothes is not found' });
    }
  }
module.exports = clothesRouter;