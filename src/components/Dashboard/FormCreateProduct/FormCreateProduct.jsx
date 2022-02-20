import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./FormCreateProduct.module.css";
import { validationFunction } from "./ValidationFunction";
import { createProduct, getCategories } from "../../../actions";
import { Loader } from "../../Loader/Loader";

export default function FormCreateProduct({ handleClosePopUp }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const category = useSelector((state) => state.productsReducer.categories);
  //console.log(caterory)

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  //category.map(c => console.log(c))
  const [input, setInput] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    cantidad: "",
  });

  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
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

  // console.log(input)
  function handleSubmit(e, handleClosePopUp) {
    e.preventDefault();
    dispatch(createProduct(input));
    setInput({
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
      cantidad: "",
    });
    //alert("Product was succesfully created")
    //handleClosePopUp()
    setTimeout(function () {
      window.location.href = "/dashboard/admin";
    }, 3000);
    alert(
      "Product was created. You will be redirected to your products after 3 seconds"
    );
  }

  console.log(input);

  if (category.length > 0) {
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
             
            </div>

            <div className={styles.container_inputs}>
              {/* <label className={styles.nameText}>Titulo del producto</label> */}
              <input
                className={styles.title}
                type="text"
                name="title"
                onChange={(e) => handleInputChange(e)}
                value={input.title}
                placeholder="Titulo del producto"
                //required
              />
              {errors.title && <p>{errors.title}</p>}

              {/* <label className={styles.nameText}>Precio del producto</label> */}
              <input
                className={styles.price}
                type="number"
                name="price"
                onChange={(e) => handleInputChange(e)}
                value={input.price}
                placeholder="Precio del producto"
                //required
              />
              {errors.price && <p>{errors.price}</p>}

              {/* <label className={styles.nameText}>Categoria del producto</label> */}
              <select
                className={styles.category}
                className={styles.category}
                onChange={(e) => handleSelectCategory(e)}
                name=""
                id=""
              >
                <option defaultValue="default" value="">
                  Seleccionar Categoria
                </option>
                {category.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre}
                  </option>
                ))}
              </select>
              {errors.category && <p>{errors.category}</p>}

              {/* <label className={styles.nameText}>
                Descripcion del producto
              </label> */}
              <textarea
                className={styles.description}
                name="description"
                onChange={(e) => handleInputChange(e)}
                value={input.description}
                placeholder="Descripcion del producto"
                //required
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

              {/* <label className={styles.nameText}>Imagen del producto</label> */}
              <input
                className={styles.image}
                type="text"
                value={input.image}
                name="image"
                placeholder="Imagen del producto"
                onChange={(e) => handleInputChange(e)}
              />

              {errors.image && <p>{errors.image}</p>}
              {/* <label className={styles.nameText}>Cantidad del producto</label> */}
              <input
                className={styles.cantidad}
                type="number"
                name="cantidad"
                onChange={(e) => handleInputChange(e)}
                value={input.cantidad}
                placeholder="Cantidad del producto"
                //required
              />
              {errors.cantidad && <p>{errors.cantidad}</p>}
              <button
                className={styles.create_btn}
                type="submit"
                disabled={Object.keys(errors).length > 0 ? true : false}
              >
                CREAR
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
