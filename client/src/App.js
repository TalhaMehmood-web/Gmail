import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Main from "./pages/Main"
import Login from "./pages/Authentication/Login"
import Signup from './pages/Authentication/Signup';
import Inbox from "./pages/Routes/Inbox";
import Starred from "./pages/Routes/Starred"
import { Route, Routes } from 'react-router-dom';
import Send from './pages/Routes/Send';
function App() {
  return (
    <div  >
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/mail' element={<Main />}  >
          <Route index path='inbox' element={<Inbox />} />
          <Route path='starred' element={<Starred />} />
          <Route path='send' element={<Send />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
