import React , {useEffect , useState} from 'react';
import {getAllProducts, deleteProduct} from '../../actions/index';
import { useDispatch ,useSelector } from 'react-redux';

import DataTable from 'react-data-table-component'
import ReactModal from 'react-modal';
import { MdDeleteForever } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai'

import FormEditProduct from './FormEditProduct/FormEditProduct';
import FormCreateProduct from './FormCreateProduct/FormCreateProduct'


export default function Dashboard(){
    const dispatch = useDispatch()
    const products = useSelector((state) => state.productsReducer.allProducts)

    //Estados para manejar popUp edit
    const [openPopUpEdit, setOpenPopUpEdit] = useState(false)
    const [idToEdit, setIdToEdit] = useState('')
    
    //handlers para manejar popUp Edit
    const handleOpenPopUpEdit = () => {
        setOpenPopUpEdit(true)
    }
    const handleClosePopUpEdit = (e) => {
        e.preventDefault()
        setOpenPopUpEdit(false)
    }

    //Pop Up Create
    const [openPopUpCreate, setOpenPopUpCreate] = useState(false);

    const handleOpenPopUpCreate = () => {
        setOpenPopUpCreate(true)
    }
    const handleClosePopUpCreate = (e) => {
        e.preventDefault()
        setOpenPopUpCreate(false)
    }
    /////

    //Delete button
    
    const handleDeleteProduct = (id) => {
        console.log("id a borrar", id)
        dispatch(deleteProduct(id))
        setTimeout(function () {
            window.location.href = "/dashboard";
             }, 5000); 
        alert("Product was deleted. You will be redirected to your products after 5 seconds");  

    }

   useEffect(()=>{
     dispatch(getAllProducts())
   },[dispatch])



   const columns = [
    {
        
        cell: row => (
        <div>
            <button type="button" 
                title="Edit"
                onClick={() => {
                handleOpenPopUpEdit()
                setIdToEdit(row.id)
                //console.log(row.id)    
                }}><AiFillEdit /></button>

                
                <button type="button" 
                title="Delete"
                onClick={() => {
                handleDeleteProduct(row.id);
            }}
            >
            <MdDeleteForever />
            </button>
        </div>    
    )},
    
        // {
        //     name: "Image",
        //     selector: "image",
        //     sortable: false
        // }
        // ,

        {

            name: "Title",
            selector: "title",
            sortable: true
        }
        ,
        {
            name: "Price",
            selector: "price",
            sortable: true
        }
        ,
        
        {
            name: "Stock",
            selector: "cantidad",
            sortable: true
        }
        ,
        {
            name: "Sales",
            selector: "ventas",
            sortable: true
        }
        ,
        {
            name: "Rate",
            selector: "rate",
            sortable: true
        }
        ,
        {
            name: "Category",
            selector: "category",
            sortable: true
        }
        , 
]

  
   if (products.length > 0) {
            return (
                  
                <div>
                      <div>
                        <button onClick={handleOpenPopUpCreate}>Add New Product</button>
                    </div>

                    <DataTable
                            columns={columns}
                            data={products}
                            title="My products"
                            striped
                            highlightOnHover
                            paginationPerPage={5}
                            paginationRowsPerPageOptions={[5, 10, 15]}
                            pagination
                        />

                    <ReactModal isOpen={openPopUpCreate}>
                         <h1>Add new product </h1>
                        <FormCreateProduct handleClosePopUp={handleClosePopUpCreate} />  
                     </ReactModal>

                     <ReactModal isOpen={openPopUpEdit}>
                     <h1>Edit this product</h1>
                        <FormEditProduct handleClosePopUp={handleClosePopUpEdit} id={idToEdit} />  
                     </ReactModal>    
                </div>    
        )
   }else {
       return (
           <p>LOADING...</p>
       )
   }
   
}