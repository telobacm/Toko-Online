import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import Angkringan from "./Angkringan";
import NamaBapak from "./NamaBapak";
import ModalNama from "./ModalNama";
import AdminPage from "./AdminPage";
import LoginPage from "./LoginPage";
// import HalamanRumah from "./HalamanRumah";

//- titik dua ":" di dalam deconstructor adalah alias. Kenapa perlu dibikin alias ?
//Y karna ada tempat yang kudu pake non-kaps, ada yang kudu kaps.
//- KuduLogin ini kalo di docs nya react router namanya PrivateRouting, ini const yang dibikin
//sendiri, buat nentukan arah2 redirect dengan kondisi yang ada, jadi param nya juga bebas,
//terus ...other itu kalo di docs dia ...rest, fungsinya buat menginject semua props yang laennya tanpa kudu disebutin atu2
const KuduLogin = (props) => {
  const { kumpunen: Kumpunen, ...other } = props;
  const token = localStorage.getItem("token");
  if (other.path === "/login") {
    if (token) {
      return <Redirect to="/admin" />;
    }
  } else {
    if (!token) {
      return <Redirect to="/login" />;
    }
  }
  return <Route {...other} />;
};

function RouterEkzampel(props) {
  console.log("RouterEkzampel", props);
  return (
    //history ini aslinya apa ?
    <Router history={createBrowserHistory}>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">
          Contoh-<strong>Routing</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link className={`nav-link ${props.path == "/" ? "active" : ""}`} to="/">
              HomePage
            </Link>
            <Link className="nav-link" to="/admin">
              Admin
            </Link>
            <NavDropdown title="Project Lain" id="basic-nav-dropdown">
              <NavDropdown.Item href="/nama-bapak">NamaBapak</NavDropdown.Item>
              <NavDropdown.Item href="/modal-nama">ModalNama</NavDropdown.Item>
              <NavDropdown.Item href="/nggakaktif">NggakAktif</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://img-comment-fun.9cache.com/media/aep8GWq/aL9rDYk0_700w_0.jpg">
                SharelinkGan !
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route path="/" exact component={Angkringan} />
        <Route path="/nama-bapak" component={NamaBapak} />
        <Route path="/modal-nama" component={ModalNama} />
        //kenapa sama2 pake KuduLogin tapi yang Login pake component yang Admin pake kumpunen
        <KuduLogin path="/login" component={LoginPage} />
        <KuduLogin path="/admin" component={AdminPage} />
      </Switch>
    </Router>
  );
}

export default RouterEkzampel;
