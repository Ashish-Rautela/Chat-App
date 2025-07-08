import './App.css';
import {Link, Route,Routes} from 'react-router-dom'
import {Login} from './pages/Login'
import {Home} from './pages/Home'
import {Signup} from './pages/Signup'
import { PrivateRoute } from './component';

function App() {
  return (
    <>
    <Link to="/"></Link>
    <Link to="/login"></Link>
    <Link to="/Signup"></Link>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
    </Routes>
    </>
  );
}
export default App;
