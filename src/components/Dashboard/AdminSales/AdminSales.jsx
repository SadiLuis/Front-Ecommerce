import React , {useEffect , useState} from 'react';
//import {getAllProducts, deleteProduct} from '../../actions/index';
import { useDispatch ,useSelector } from 'react-redux';

import DataTable from 'react-data-table-component'
// import ReactModal from 'react-modal';
// import { MdDeleteForever } from 'react-icons/md';
import { AiFillCheckCircle } from 'react-icons/ai'
import { editStatusPedido, getAllPedidos } from '../../../actions';
//import FormEditPedidos from './FormEditPedidos'

export default function AdminSales(){

    const dispatch = useDispatch()
    const pedidos = useSelector((state) => state.pedidosReducer.allPedidos)
    
    const statusCompletado = {
        status: "COMPLETADO"
    }
    
    useEffect(()=>{
        dispatch(getAllPedidos())
      },[dispatch])

    const handleMarkCompleted = (pedidoId) => {
        
        console.log("pedidoId", pedidoId)
        console.log("newStatus", statusCompletado)
        dispatch(editStatusPedido(pedidoId, statusCompletado))
        setTimeout(function () {
            window.location.reload();
             }, 3000); 
        alert("Order Status was updated. You will be redirected to your sales after 3 seconds")
        // recargar página
        
    }

    
    
      const columns = [
        {
            name: "Actions",
            cell: row => (
            <div>
                <button type="button" 
                    title="Mark as completed"
                    onClick={() => {
                    handleMarkCompleted(row.pedidoId)    
                    }}><AiFillCheckCircle /></button>
    
                    
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

            
        </div>  
        )
      }else{
          return (
              <h1>Loading...</h1>
          )
      }
      
}