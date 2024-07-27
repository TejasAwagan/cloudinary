import './App.css';
import { Link, Outlet } from 'react-router-dom';
require('dotenv').config()
console.log(process.env)
function App() {
  return (
    <div className="App">
      <h1>Upload the file using cloudinary</h1>
      <Link to="/">Home</Link> <br />
      <Link to="upload">Upload</Link> <br />
      <Link to="secure-upload">Secure-Upload</Link>

      <Outlet />
    </div>
  );
}

export default App;
