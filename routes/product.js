
const { verifyToken,verifyTokenandAuthorization,verifyTokenandAdmin } = require('./verifyToken');
const Product = require('../models/Product');
const router = require('express').Router();
const csvtojson = require("csvtojson");


const handleCSV=async(file,req)=>{
    console.log(req.user);
        for(let i=0;i<file.length;i++){
            let query = new Product({...file[i],createdBy:req.user?.id});
            query = await query.save();
            console.log(query);

    }
}
router.post('/upload',verifyTokenandAdmin, async (req, res) =>{
    let x = null;
    csvtojson()
    .fromFile("sample.csv")
    .then(async csvData => {
        console.log("DATA IS HERW");
      await handleCSV(csvData,req);
        return res.status(201).json("Created")
       //now we send it to dataabse.....
       
    }).catch(err=>{console.log(err);res.status(400).json(err)})
    
    
      
});





router.get('/fetch', async (req, res) => {
    try {
      const products =  await Product.find();
        res.status(200).json(products);

    } catch (err) {
        res.status(500).json(err);
    }
}
);
module.exports = router;
