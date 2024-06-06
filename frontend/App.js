import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import AddItem from './items/AddItem';
import EditItem from './items/EditItem';
import ViewItem from './items/ViewItem';
import ScanItem from './items/ScanItem';



function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/additem" element={<AddItem/>}/>
          <Route exact path="/edititem/:id" element={<EditItem/>}/>
          <Route exact path="/viewitem/:id" element={<ViewItem/>}/>
          <Route exact path="/scanitem" element={<ScanItem/>}/>

        </Routes>

      </Router>
      
    </div>
  );
}

export default App;
