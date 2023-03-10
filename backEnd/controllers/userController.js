import User from '../models/userModel.js';

export const getUser = async (req, res) => {
    try {
        const response = await User.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

// Mencari data berdasarkan ID
export const getUserByID = async (req, res) => {
    try {
        const response = await User.findOne({
            //menambahkan opsi 
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

// membuat data 
export const createUser = async (req, res) => {
    try {
        //membuatnya berdasarkan parameter body
        await User.create(req.body);
        res.status(201).json({msg: "User Berhasil ditambahkan.."});
    } catch (error) {
        console.log(error.message);
    }
}


//update User
export const updateUser = async (req, res) => {
    try {
        //Melakukan update berdasarkan parameter ID
        await User.update(req.body, {
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Berhasil di Updated.."});
    } catch (error) {
        console.log(error.message);
    }
}

//deleteUser
export const deleteUser = async (req, res) => {
    try {
        //untuk delete kita tidak membutuhkan data sehingga req.body kita hapus
        await User.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Berhasil di Hapus.."});
    } catch (error) {
        console.log(error.message);
    }
}