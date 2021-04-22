const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// const path = require('path');
// const fs = require('fs');
// const usersPath = path.join(__dirname, '..', 'model', 'users.json');

// router.get('/', (req, res)=>{
    
//     const body = req.body;
        
//     fs.readFile(usersPath, (err, data)=>{
//         if(err) {
//             throw err
//         }else{                     
//             res.send(data);
//         }    
//     })
// })

//as explained by Rob, using async in a route does not guarantee the function would get to the error stage
router.post('/', (req, res)=>{
    // const body = req.body;
    /*
    req.body = {
        userNAME : 'sebastian',
        PASSWORD : '123456'
    }
    */
    const body = {
        _id: id,
        email: req.body.email,
        password: req.body.passWord
    }    

    //in loginController data would be checked
    loginController.checkUser(body)
    .then(response=>{        
        res.json(response)
    })
    .catch(error=>{
        console.log(error)
        res.send('wrong information')
    })  
})

module.exports = router;