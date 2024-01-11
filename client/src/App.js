// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
import { Outlet } from "react-router-dom"
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import "./App.css"
import "./index.css"
//import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <>
      <Navbar className="Navbar">
        <Nav navbar>
          <NavItem>
        <NavLink className="NavLink" href="/">Hillary's Hair Care</NavLink>
        <NavLink className="NavLink" href="/customers">Customers</NavLink>
        <NavLink className="NavLink" href="/stylists">Stylists</NavLink>
        <NavLink className="NavLink" href="/services">Services</NavLink>
        <NavLink className="NavLink" href="/appointments">Appointments</NavLink>
        </NavItem>
        </Nav>
      </Navbar>
      <Outlet />
    </>
  )
}
export default App;
