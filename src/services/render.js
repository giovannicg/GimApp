const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            res.render('index', { users : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
}

exports.add_user = (req, res) =>{
    res.render('add_user');
}

exports.update_user = (req, res) =>{
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.home_student = (req,res) => {
    axios.get('http://localhost:3000/api/students')
    .then(function(response){
        res.render('students')
    })
    .catch(err=>{
        res.send(err);
    })
}

exports.student = (req, res) =>{
    res.render('add_student');
}

exports.update_student = (req, res) =>{
    axios.get('http://localhost:3000/api/students', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_students", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}