
const { verifyToken,verifyTokenandAuthorization,verifyTokenandAdmin } = require('./verifyToken');
const User = require('../models/User');
const router = require('express').Router();

//GET
router.get('/find/:id',verifyTokenandAdmin, async (req, res) => {
    try {
      const user =  await User.findById(req.params.id);
      
      res.status(200).json(user);
        

    } catch (err) {
        res.status(500).json(err);
    }
}
);
//GET ALL USERS 
router.get('/',verifyTokenandAdmin, async (req, res) => {
    const query =req.query.new;
    try {
      const users = query ? await User.find().limit(10) : await User.find().select({firstname:1,lastname:1,_id:0});
      
      
      res.status(200).json(users);
        

    } catch (err) {
        res.status(500).json(err);
    }
}
);
module.exports = router;
