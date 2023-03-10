import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AddProduct = () => {
    const[title, setTitle] = useState ("");
    const[file, setFile] = useState ("");
    const[preview, setPreview] = useState ("");
    const navigate = useNavigate();

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    };

    const saveProduct = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        try {
            await axios.post('http://localhost:5000/products', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

return (
    <div className="columns is-centered mt-5">
            <div className="column is-half">
                <form onSubmit={saveProduct}>
                    <div className="field">
                        <label className='label'>Nama Produk</label>
                        <div className="control">
                            <input type="text" className="input" value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='Nama product'
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className='label'>Gambar</label>
                        <div className="control">
                            <div className="file">
                                <label className="file-label">
                                    <input type="file" className="file-input" onChange={loadImage}/>
                                    <span className="file-cta">
                                        <span className="file-label">Pilih File ...</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {preview ? (
                        <figure className="image is-128x128">
                            <img src={preview} alt="Pratinjau gambar" />
                        </figure>
                    ): (
                        //jika pratinjau bernilai kosong maka tidak akan merender apa2
                        ""
                    ) }

                    <div className="filed">
                        <div className="control">
                            <button type='submit' className="button is-success">Simpan</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
);
};

export default AddProduct;
