const express = require("express");
const router = express.Router();

const users_data = [
    {
        "email": "abc@gmail.com",
        "firstName": "abc",
        "id": 0
    },
    {
        "email": "def@gmail.com",
        "firstName": "def",
        "id": 1
    }
] 

router.get("/users", (req, res) => {
    res.status(200).json({
        message: "Users retrieved",
        success: true,
        users: users_data
    })
});

router.post("/add", (req, res) => {
    const data = req.body
    if (data?.email && data?.firstName){
        const user = {...data, id: users_data.length}
        users_data.push(user)
        res.status(200).json({
            message : "User added",
            success : true
        })
    }
    else{
        res.status(500).json({
            message : "User not added. Please provide both email and firstName",
            success : false
        })
    }
});

router.put("/update/:id", (req, res) => {
    const user = req.body;
    const id_status = req.params.id < users_data.length && req.params.id >= 0;
    const params_status = user?.email && user?.firstName
    if (req.params.id < users_data.length && req.params.id >= 0 && user?.email && user?.firstName){
        const id = parseInt(req.params.id);
        const user = req.body;
        users_data[id] = {"email": user.email, "firstName": user.firstName, id: id}
        res.status(200).json({
            message: "Users udpated",
            success: true
        })
    }
    else{
        var err_str = ""
        if (!id_status){
            err_str = err_str.concat("User not found with ID "+ req.params.id + ". ");
        }
        if (!params_status){
            err_str = err_str.concat("Wrong parameters passed. Only email and firstName are allowed")
        }
        res.status(500).json({
            message: err_str,
            success: false
        })
    }
});

router.get("/user/:id", (req, res) => {
    const id = parseInt(req.params.id)
    if (id < users_data.length){
        const user = users_data.at(id)
        res.status(200).json({
            success: true,
            user: user
        })
    }
    else{
        res.status(500).json({
            success: false,
            message: "ID not found"
        })
    }
});

module.exports = router