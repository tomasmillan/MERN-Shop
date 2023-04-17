import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { productsCreate } from "../../features/productSlice";

const CreateProduct = () => {
  const dispatch = useDispatch();

  const [productImg, setProductImg] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  console.log(productImg);
  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    console.log(file);
    transformFile(file);
  };

  const transformFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        setProductImg(reader.result);
      };
    } else {
      setProductImg("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      productsCreate({
        name,
        brand,
        description,
        price,
        image: productImg,
      })
    );
  };
  return (
    <div className="createProduct">
      <form className="styledForm" onSubmit={handleSubmit}>
        <h3>Crear Producto</h3>
        <input
          type="file"
          accept="image/"
          onChange={handleUploadImage}
          required
        />
        <select onChange={(e) => setBrand(e.target.value)}>
          <option value="">Elija la Marca...</option>
          <option value="iphone">Iphone</option>
          <option value="samsung">Samsung</option>
          <option value="redmi">Redmi</option>
          <option value="motorola">Motorola</option>
        </select>
        <input
          type="text"
          required
          placeholder="Nombre"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          required
          placeholder="Precio"
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          required
          placeholder="Descripcion"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input className="primaryBtn" type="submit" />
      </form>
      <div className="imagePreview">
        {productImg ? (
          <>
            <img src={productImg} alt="Imagen del Producto" />
          </>
        ) : (
          <p>La previsualización de la imagen aparecera aca!</p>
        )}
      </div>
    </div>
  );
};

export default CreateProduct;
