import React , {useEffect , useState} from 'react';
//import {getAllProducts, deleteProduct} from '../../actions/index';
import { useDispatch ,useSelector } from 'react-redux';

import DataTable from 'react-data-table-component'
import ReactModal from 'react-modal';
import { MdDeleteForever } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai'
import { getAllPedidos } from '../../../actions';
import FormEditPedidos from './FormEditPedidos'

export default function AdminSales(){

    const dispatch = useDispatch()
    const pedidos = useSelector((state) => state.pedidosReducer.allPedidos)
    
    
    useEffect(()=>{
        dispatch(getAllPedidos())
      },[dispatch])

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
    
      const columns = [
        {
            name: "Actions",
            cell: row => (
            <div>
                <button type="button" 
                    title="Edit"
                    onClick={() => {
                    handleOpenPopUpEdit()
                    setIdToEdit(row.id)
                    //console.log(row.id)    
                    }}><AiFillEdit /></button>
    
                    
                    {/* <button type="button" 
                    title="Delete"
                    onClick={() => {
                    handleDeleteProduct(row.id);
                }}
                >
                <MdDeleteForever />
                </button> */}
            </div>    
        )},
        
    
        {
            name: "Buyer",
            cell: row => (
                row.usuario["nombre"]
            ),
            sortable: true
        },

        {
            name: "Detail",
            cell: row => (
                row.productos.map(p => p.producto + (' ($' + p.precioUnitario + ') +'))
            ),
            sortable: true
        },
            
            {
                name: "Total",
                selector: "totalPedido",
                sortable: true
            }
            ,
            {
                name: "Status",
                selector: "status",
                sortable: true
            }
            ,
            {
                name: "Date",
                cell: row => (
                    row.fechaCreacion.slice(0, 10)
                ),
                sortable: true
            }
            ,
            
    ]
      if (pedidos.length > 0) {
        return (
            <div>
                {console.log(pedidos)}
                {(pedidos.map(p => console.log(p.usuario["nombre"])))}
    
            <DataTable
                columns={columns}
                data={pedidos}
                title="Sales"
                striped
                highlightOnHover
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 8]}
                pagination
                responsive
            />

            <ReactModal isOpen={openPopUpEdit}>
                <h1>Edit this product</h1>
                <FormEditPedidos handleClosePopUp={handleClosePopUpEdit} id={idToEdit} />  
            </ReactModal>
        </div>  
        )
      }else{
          return (
              <h1>Loading...</h1>
          )
      }
      
}