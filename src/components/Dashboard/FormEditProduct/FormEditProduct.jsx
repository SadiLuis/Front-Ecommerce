import React, { useState, useEffect } from "react";
import styles from "./FormEditProduct.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, editProduct, getCategories } from "../../../actions";
import { validationFunction } from "./ValidationFunction";
import { Loader } from "../../Loader/Loader";

export default function FormEditProduct(props) {
  const { id, handleClosePopUp } = props;

  const dispatch = useDispatch();
  const product = useSelector((state) => state.adminReducer.singleProduct);
  const [errors, setErrors] = useState({});
  const category = useSelector((state) => state.productsReducer.categories);

  const [input, setInput] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
    category: "",
    caterogyName: "",
    image: "",
    cantidad: "",
  });

  useEffect(() => {
    dispatch(getProductById(id));
    dispatch(getCategories());
  }, [id]);

  useEffect(() => {
    setInput({
      id: product.id || "",
      title: product.title || "",
      price: product.price || "",
      description: product.description || "",
      category: "",
      caterogyName: product.category || "",
      image: product.image || "",
      cantidad: product.cantidad || "",
    });
  }, [product]);

  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
      category: category
        .filter((c) => c.nombre === product.category)
        .map((c) => c.id)[0],
    });
    setErrors(
      validationFunction({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelectCategory(e) {
    setInput({
      ...input,
      category: e.target.value,
    });
    setErrors(
      validationFunction({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  const handleSubmit = (e) => {
    dispatch(editProduct(input));
    setInput({
      id: "",
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
      cantidad: "",
    });

    setTimeout(function () {
      window.location.href = "/dashboard/admin";
    }, 3000);
    alert(
      "Product was updated. You will be redirected to your products after 3 seconds"
    );
  };

  //let auxCategoryId = category.filter(c => c.nombre === product.caterogy)

  console.log(input);
  //if (product && category.length > 0 )
  if (product && category) {
    return (
      <div className={styles.main}>
        <div className={styles.submain}>
          <div className={styles.cap}>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className={styles.container_btns}>
                <button className={styles.close_btn} onClick={handleClosePopUp}>
                  ❌ Cerrar
                </button>
                <button className={styles.close_btnR} onClick={handleClosePopUp}>
                  ❌
                </button>
              </div>

              <div className={styles.container_inputs}>
                <label className={styles.nameText}>Titulo del producto</label>
                <input
                  className={styles.title}
                  type="text"
                  name="title"
                  onChange={(e) => handleInputChange(e)}
                  value={input.title}
                />
                {errors.title && <p>{errors.title}</p>}

                <label className={styles.nameText}>Precio del producto</label>
                <input
                  className={styles.price}
                  type="number"
                  name="price"
                  onChange={(e) => handleInputChange(e)}
                  value={input.price}
                />
                {errors.price && <p>{input.price}</p>}

                <label className={styles.nameText}>Categoria del producto</label>
                <select
                  className={styles.category}
                  onChange={(e) => handleSelectCategory(e)}
                  name=""
                  id=""
                >
                  <option
                    defaultValue={category
                      .filter((c) => c.nombre === product.category)
                      .map((c) => c.id)}
                    value={category
                      .filter((c) => c.nombre === product.category)
                      .map((c) => c.id)}
                  >
                    {product.category}
                  </option>
                  {category.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombre}
                    </option>
                  ))}
                </select>
                {errors.category && <p>{errors.category}</p>}

                <label className={styles.nameText}>Descripcion del producto</label>
                <textarea
                  className={styles.description}
                  name="description"
                  onChange={(e) => handleInputChange(e)}
                  value={input.description}
                />
                {errors.description && <p>{errors.description}</p>}

                {/* //Asi deberia ser el input si queremos subir una imagen desde nuestra pc
                 <div >
                <label>Image</label>
                <input
                    type='file'
                    name='image'
                    onChange={e => handleInputChange(e)}
                    placeholder='Image of Product'
                />
                </div> */}

                <label className={styles.nameText}>Imagen del producto</label>
                <input
                  className={styles.image}
                  type="text"
                  value={input.image}
                  name="image"
                  onChange={(e) => handleInputChange(e)}
                />

                {errors.image && <p>{errors.image}</p>}

                <label className={styles.nameText}>Cantidad</label>
                <input
                  className={styles.cantidad}
                  type="text"
                  name="cantidad"
                  onChange={(e) => handleInputChange(e)}
                  value={input.cantidad}
                />
                {errors.cantidad && <p>{errors.cantidad}</p>}
                <button
                  className={styles.create_btn}
                  type="submit"
                  disabled={Object.keys(errors).length > 0 ? true : false}
                >
                  Modificar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return <Loader/>;
  }
}
