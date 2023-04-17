import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Store from "./pages/Store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import CheckoutSucces from "./components/CheckoutSucces";
import MercadoPagoForm from "./components/mercadopago/MercadoPagoForm";
import Dashboard from './components/admin/Dashboard'; 
import Products from './components/admin/Products'; 
import Summary from "./components/admin/Summary";
import CreateProduct from "./components/admin/CreateProduct";
import Orders from "./components/admin/Orders";
import Users from "./components/admin/Users";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/store" element={<Store />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mercadopagoform" element={<MercadoPagoForm />} />
          <Route path="/checkoutSuccess" element={<CheckoutSucces />} />
          <Route path="/admin" element={<Dashboard />} >
            <Route path="products" element={<Products />}>
              <Route path='create-product' element={<CreateProduct />} />
            </Route>
            <Route path="summary" element={<Summary />} />
            <Route path="orders" element={<Orders />} />
            <Route path="users" element={<Users />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
