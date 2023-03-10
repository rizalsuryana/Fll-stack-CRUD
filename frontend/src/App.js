
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import UserList from "./components/userList";
import AddUser from './components/addUser';
import EditUser from './components/editUser';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<UserList/>}/>
      <Route path='add' element={<AddUser/>}/>
      <Route path='edit/:id' element={<EditUser/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
