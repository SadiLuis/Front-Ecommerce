import React, { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";
import "./DashBoard.css";
import DataTable from "react-data-table-component";
import ReactModal from "react-modal";
import { MdDeleteForever, MdOutlineAddCircle } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import FormEditProduct from "./FormEditProduct/FormEditProduct";
import FormCreateProduct from "./FormCreateProduct/FormCreateProduct";
import { Loader } from "../Loader/Loader";


export default function Dashboard() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsReducer.allProducts);

  //Estados para manejar popUp edit
  const [openPopUpEdit, setOpenPopUpEdit] = useState(false);
  const [idToEdit, setIdToEdit] = useState("");

  //handlers para manejar popUp Edit
  const handleOpenPopUpEdit = () => {
    setOpenPopUpEdit(true);
  };
  const handleClosePopUpEdit = (e) => {
    e.preventDefault();
    setOpenPopUpEdit(false);
  };

  //Pop Up Create
  const [openPopUpCreate, setOpenPopUpCreate] = useState(false);

  const handleOpenPopUpCreate = () => {
    setOpenPopUpCreate(true);
  };
  const handleClosePopUpCreate = (e) => {
    e.preventDefault();
    setOpenPopUpCreate(false);
  };
  /////

  //Delete button

  const handleDeleteProduct = (id) => {
    console.log("id a borrar", id);
    dispatch(deleteProduct(id));
    setTimeout(function () {
      window.location.href = "/dashboard/admin";
    }, 5000);
    alert(
      "Product was deleted. You will be redirected to your products after 5 seconds"
    );
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const columns = [
    {
      cell: (row) => (
        
        <div className="table-responsive contain_btns">
          <button className="btn_edit"
            type="button"
            title="Edit"
            onClick={() => {
              handleOpenPopUpEdit();
              setIdToEdit(row.id);
              //console.log(row.id)
            }}
          >
            <AiFillEdit />
          </button>

          <button className="btn_delete"
            type="button"
            title="Delete"
            onClick={() => {
              handleDeleteProduct(row.id);
            }}
          >
            <MdDeleteForever />
          </button>
        </div>
      ),


    },
    {
      name: "Titulo",
      selector: "title",
      sortable: true,
      grow: 2,
      center:true

    },
    {
      name: "Precio",
      selector: "price",
      sortable: true,
      center:true

    },
    {
      name: "Cantidad",
      selector: "cantidad",
      sortable: true,
      center:true

    },
    {
      name: "Ventas",
      selector: "ventas",
      sortable: true,
      grow:1,
      center:true

    },
    {
      name: "Calificacion",
      selector: "rate",
      sortable: true,
      center:true

    },
    {
      name: "Categoria",
      selector: "category",
      sortable: true,
      center:true,

    },
  ];

  const paginacionOpciones = {
    rowsPerPageText:'Filas por pagina',
    rangeSeparatorText: 'de',
  }

  


  if (products.length > 0) {
    return (
      <div>
        <div className="add-button-div">
          <button className="create add-button" onClick={handleOpenPopUpCreate}>
            {/* <MdOutlineAddCircle size={32} /> */}
          Adicionar Producto
          </button>
        </div>
        <DataTable 
          columns={columns}
          data={products}
          title="Productos"
          striped
          highlightOnHover
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15]}
          pagination
          paginationComponentOptions={paginacionOpciones}
          // fixedHeader
          // fixedHeaderScrollHeight="350px"
        />

        <ReactModal  isOpen={openPopUpCreate}>
         <p className="containtextheadermodal"><h1 className="textheadermodal">Adicionar nuevo producto</h1></p> 
          <FormCreateProduct handleClosePopUp={handleClosePopUpCreate} />
        </ReactModal>

        <ReactModal isOpen={openPopUpEdit}>
         <p className="containtextheadermodal"><h1 className="textheadermodal">Editando el producto</h1></p> 
          
          <FormEditProduct
            handleClosePopUp={handleClosePopUpEdit}
            id={idToEdit}
          />
        </ReactModal>
      </div>
    );
  } else {
    return <Loader/>
  }
}
