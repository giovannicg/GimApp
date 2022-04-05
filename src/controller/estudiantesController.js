var studentdb = require('../model/estudiantes');

// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "No pueden haber campos vacios!"});
        return;
    }

    // new student
    const student = new Userdb({
        name : req.body.name,
        age : req.body.age,
        level: req.body.level,
        status : req.body.status
    })

    // save student in the database
    student
        .save(student)
        .then(data => {
            //res.send(data)
            res.redirect('/add-student');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Error! Algo ocurrio"
            });
        });

}

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        studentdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "No encontramos al estudainte con el id: "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error al obtener el estudiante con el id: " + id})
            })

    }else{
        studentdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error al obtener la informacion" })
            })
    }

    
}

// Update a new idetified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Los datos a actualizar no pueden estar vacios"})
    }

    const id = req.params.id;
    studentdb.findByIdAndUpdate(id, req.body)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `No se puede actualizar al usuario ${id}. Talvez no este creado!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error al actualizar la informacion"})
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    studentdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `No se puede eliminar al estudiante ${id}.Talvez no este creado`})
            }else{
                res.send({
                    message : "estudiante eliminado correctamente!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "No se puede eliminar al estudainte con id=" + id
            });
        });
}