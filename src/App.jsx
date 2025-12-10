import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import TaskForm from "./pages/TaskForm";
import Home from "./layout/Home";
import Error from "./pages/Error";
import PrivateRoute from "./layout/PrivateRoute";
import Login from "./pages/Login.jsx";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/addTask" element={<TaskForm />}></Route>
            <Route path="/addTask" element={<TaskForm />}></Route>
            <Route path="/updateTask/:id" element={<TaskForm />}></Route> 
          </Route>
            <Route path="*" element={<Error />}></Route>
            <Route path="/login" element={<Login />}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
