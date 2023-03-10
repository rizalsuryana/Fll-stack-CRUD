import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const UserList = () => {
    const [user, setUser] = useState([]);

    useEffect(()=>{
        getUser();
    }, []);
    //patch data
    const getUser = async () => {
        const response = await axios.get('http://localhost:5000/user');
        setUser(response.data);
    };

    // f hapus data
    const deleteUser = async (id) =>{
        try {
            await axios.delete(`http://localhost:5000/user/${id}`);
            getUser();
        } catch (error) {
            console.log(error);
        }
    }

  return (
<div className="columns mt-4 is-centered">
    <div className="column is-half">
        <h1>Create Update Delete</h1>
        
        <Link to={`add`} className="button is-success">
            Tambah Data
        </Link>
        <table className='table is-striped is-fullwidth'>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {user.map((user, index)=> (
                <tr key={user.id}>
                    <td>{index +1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.gender}</td>
                    <td>
                        <Link to={`edit/${user.id}`} className='button is-small is-info'>Edit</Link>
                        <button onClick={() => deleteUser(user.id)} className='button is-small is-danger'>Delete</button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>
  );
};

export default UserList;