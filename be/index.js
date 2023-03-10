import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import ProductRoute from './routes/ProductRoute.js';


const app = express();

app.use(cors());
app.use(express());
app.use(fileUpload());
// membuat folder public menjadi static file agar gambar bisa ditampilkan
app.use(express.static('public'));
app.use(ProductRoute);

app.listen(5000, () => console.log('Server berhasil di jalankan....'));

// step 1