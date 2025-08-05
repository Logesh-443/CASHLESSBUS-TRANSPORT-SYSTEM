import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BusDetails from "./BusDetails";
import ViewBusdetails from "./ViewBusdetails";
import { Home } from './Home';
import BusRoutes from './BusRoutes';
import ViewRoute from './ViewRoute';
import UserDetails from './UserDetails';
import ViewUserDetails from './ViewUserDetails';
import CardRecharge from './CardRecharge';
import ViewRechargeDetails from './ViewRechargeDetails';
import DriverDetails from './DriverDetails';
import ViewDriverdetails from './ViewDriverdetails';
import Admin from './Admin';
import DriverLogin from './DriverLogin';
import EntryDetails from './EntryDetails';
import ViewEntryDetails from './ViewEntryDetails';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/*' element={<Home></Home>}></Route>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/admin' element={<Admin></Admin>}></Route>
          <Route path='/driverlogin' element={<DriverLogin/>}></Route>
          <Route path='/bus' element={<BusDetails></BusDetails>}></Route>
          <Route path='/viewbus' element={<ViewBusdetails></ViewBusdetails>}></Route>
          <Route path='/busroutes' element={<BusRoutes></BusRoutes>}></Route>
          <Route path='/viewroutes' element={<ViewRoute></ViewRoute>}></Route>
          <Route path='/user' element={<UserDetails></UserDetails>}></Route>
          <Route path='/viewuser' element={<ViewUserDetails></ViewUserDetails>}></Route>
          <Route path='/recharge' element={<CardRecharge></CardRecharge>}></Route>
          <Route path='/viewrecharge' element={<ViewRechargeDetails></ViewRechargeDetails>}></Route>
          <Route path='/driver' element={<DriverDetails></DriverDetails>}></Route>
          <Route path='/viewdriver' element={<ViewDriverdetails></ViewDriverdetails>}></Route>
          <Route path='/entry' element={<EntryDetails></EntryDetails>}></Route>
          <Route path='/viewentry' element={<ViewEntryDetails></ViewEntryDetails>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;