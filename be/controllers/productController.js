import Product from "../models/productModel.js";
import path from 'path';
import fs from 'fs';


// menampilkan semua produk
export const getProducts = async (req, res) => {
    try {
        const response = await Product.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
        
    }
}

// mendapatkan produk berdasarkan ID
export const getProductById = async (req, res) => {
    try {
        const response = await Product.findOne({
            where: {  //opsi
                id: req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
        
    }
}

// Menyimpan / membuat produk baru

export const saveProduct = (req, res) => {
    // Jika tidak ada file yang dikirimkan oleh client maka akan diberikan status 400
    if(req.files === null) return res.status(400).json({msg: 'Tidak ada file yang di upload'});
    // Jika terdapat file
    const name = req.body.title;
    const file = req.files.file;
    const fileSize = file.data.length;
    // untuk mengambail extension
    const ext = path.extname(file.name);
    // file name yang di upload di convert menjadi md5
    const fileName = file.md5 + ext;
    //membuat URL yang akan di simpan ke db
    const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
    // Type data yang di izinkan
    const allowType = ['.png', '.jpg', '.jpeg'];

    //validasi tipe data
    if(! allowType.includes(ext.toLocaleLowerCase())) return res.status(422).json({msg: 'format tidak sesuai'});

    // Jika file size lebih besar dari 5 MB
    if(fileSize > 5000000) return res.status(422).json({msg: 'ukuran harus lebih kecil dari 5Mb'});

    // jika semua kondisi telah dipenuhi maka gambar akan di simpan dalm folder public/images
    file.mv(`./public/images/${fileName}`, /*callback*/ async(err) => {
        //jika terdapat error
        if(err) return res.status(5000).json({msg: err.message});
        // jika tidak terdapat error maka data akan disimpan kedalam db
        try {
            await Product.create({name: name, image: fileName, url: url});
            // jika berhasil tersimpan 
            res.status(201).json({msg: 'Produk berhasil di buat'})
        } catch (error) {
            console.log(error.message)
            
        }
    })



}

// mengupdate product
export const updateProduct = async (req, res) => {
    const product = await Product.findOne({
        where: {  
            id: req.params.id
        }
    });

    //jika data tidak di temukan
    if(!product) return res.status(404).json({msg: "Data tidak di temukan"});
    
    let fileName = "";
    if(req.files === null){ // user mengUpdate title tanpa image
        //ambil dr db
        fileName = product.image;

        // update title dan image
    } else {
            const file = req.files.file;
            const fileSize = file.data.length;
            // untuk mengambail extension
            const ext = path.extname(file.name);
            // file name yang di upload di convert menjadi md5
            fileName = file.md5 + ext;
            const allowType = ['.png', '.jpg', '.jpeg'];
            //validasi tipe data
            if(!allowType.includes(ext.toLowerCase())) return res.status(422).json({msg: 'format tidak sesuai'});
            // Jika file size lebih besar dari 5 MB
            if(fileSize > 5000000) return res.status(422).json({msg: 'ukuran harus lebih kecil dari 5Mb'});

            // img yang lama pd public kita akan hapus dan ganti dg yang baru
            //lokasi file
            const filepath = `./public/images/${product.image}`;
            // mengahpus image di atas berdasarkan ID
            fs.unlinkSync(filepath);

            // ganti dengan yang baru
            file.mv(`./public/images/${fileName}`, (err) => {
                //jika terdapat error
                if(err) return res.status(5000).json({msg: err.message});
                // jika tidak terdapat error maka data akan disimpan kedalam db
            });
        }
        const name = req.body.title;
            //membuat URL yang akan di simpan ke db
        const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;

        // menyimpan ke db
        try {
            await Product.update({name: name, image: fileName, url: url}, {
                where:{
                    id: req.params.id
                }
            });
            res.status(200).json({msg: 'Produk berhasil di update ...'});
        } catch (error) {
            console.log(error.message);
        }
    }





//menghapus produk

export const deleteProduct = async (req, res) => {

    const product = await Product.findOne({
        where: {  //opsi
            id: req.params.id
        }
    });

    //jika data tidak di temukan
    if(!product) return res.status(404).json({msg: 'Data tidak di temukan'});

    // jika data ditemukan sesuai id maka data akan kita hapus pad folder public/images dan dri db
    try {
        //lokasi file
        const filepath = `./public/images/${product.image}`;
        // mengahpus image di atas berdasarkan ID
        fs.unlinkSync(filepath);
        // setelah file pada folder dihapus selanjutnya kita hapus file dari db
        await Product.destroy({
            where: {  //opsi
                id: req.params.id
            }
        });

        // setelah data terhapus dri fle dan db
        res.status(200).json({msg: 'Produk Berhasil dihapus....'});
    } catch (error) {
        console.log(error.message);
    }
    
}


// step 4