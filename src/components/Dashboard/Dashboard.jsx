import React , {useEffect , useState} from 'react';
import {getAllProducts} from '../../actions/index';
import { useDispatch ,useSelector } from 'react-redux';

import DataTable from 'react-data-table-component'

export default function Dashboard(){
    const dispatch = useDispatch()
    const products = useSelector(state => state.allProducts)

    
   useEffect(()=>{
     dispatch(getAllProducts())
    
   },[dispatch])


   const columns = [
        {
            name: "Imagen",
            selector: "image",
            sortable: true
        }
        ,

        {
            name: "Nombre Producto",
            selector: "title",
            sortable: true
        }
        ,

        {
            name: "N° Ventas",
            selector: "ventas",
            sortable: true
        }
        ,

        {
            name: "Stock",
            selector: "stock",
            sortable: true
        }
        ,

        {
            name: "Precio",
            selector: "price",
            sortable: true
        }
        ,
        {
            name: "Categoria",
            selector: "category",
            sortable: true
        }
        ,

        {
            name: "Status",
            selector: "status",
            sortable: true
        }
   ]
   
   if (products.length > 0) {
            return (
                  
                <div>
                    <DataTable
                            columns={columns}
                            data={products}
                            title="My products"
                        />
                </div>    
        )
   }else {
       return (
           <p>LOADING...</p>
       )
   }
   
}