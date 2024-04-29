import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import NavigationBar from "../components/NavigationBar";

const Layout = () => {
  return (
    <div>
      <div>
        <NavigationBar />
      </div>

      <Container className="py-4">
        <Outlet />
      </Container>

      <footer className="bg-body-tertiary py-3">
        <Container>This is the footer</Container>
      </footer>
    </div>
  );
};

export default Layout;
