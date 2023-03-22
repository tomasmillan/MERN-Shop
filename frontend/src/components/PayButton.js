import axios from "axios";
import { useSelector } from "react-redux";
import { url } from "../features/api";

const PayButton = ({ cartItems }) => {
  const user = useSelector((state) => state.auth);

  const handleCheckout = () => {
    axios
      .post(`${url}/payment`, {
        cartItems,
        userId: user.id,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <>
      <button className="primary" onClick={() => handleCheckout()}>
        Pagar
      </button>
    </>
  );
};

export default PayButton;
