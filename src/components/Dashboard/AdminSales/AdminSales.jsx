import React, { useEffect } from "react";
//import {getAllProducts, deleteProduct} from '../../actions/index';
import { useDispatch, useSelector } from "react-redux";
import styles from './AdminSales.module.css'

import DataTable from "react-data-table-component";
// import ReactModal from 'react-modal';
// import { MdDeleteForever } from 'react-icons/md';
import { AiFillCheckCircle } from "react-icons/ai";
import { editStatusPedido, getAllPedidos } from "../../../actions";
import { Loader } from "../../Loader/Loader";
//import FormEditPedidos from './FormEditPedidos'

export default function AdminSales() {
  const dispatch = useDispatch();
  const pedidos = useSelector((state) => state.pedidosReducer.allPedidos);

  const statusCompletado = {
    status: "COMPLETADO",
  };

  useEffect(() => {
    dispatch(getAllPedidos());
  }, [dispatch]);

  const handleMarkCompleted = (pedidoId) => {
    console.log("pedidoId", pedidoId);
    console.log("newStatus", statusCompletado);
    dispatch(editStatusPedido(pedidoId, statusCompletado));
    setTimeout(function () {
      window.location.reload();
    }, 3000);
    alert(
      "Se actualizó el estado del pedido. Seras redirigido a tus ventas después de 3 segundos"
    );
    // recargar página
  };

  const columns = [
    {
      name: "Completar",
      center:true,
      cell: (row) => (
        <div className={styles.conten_btn}>
          <button className={styles.complete_btn}
            type="button"
            title="Marcar como completado"
            onClick={() => {
              handleMarkCompleted(row.pedidoId);
            }}
          >
            
          </button>
        </div>
      ),
    },

    {
      name: "Comprador",
      center:true,
      cell: (row) => row.usuario["nombre"],
      sortable: true,
    },

    {
      name: "Detalle",
      grow:2,
      center:true,
      cell: (row) =>
        row.productos.map(
          (p) => p.producto + (" ($" + p.precioUnitario + ") +")
        ),
      sortable: true,
    },

    {
      name: "Total",
      selector: "totalPedido",
      sortable: true,
      center:true,
    },
    {
      name: "Estado",
      selector: "status",
      sortable: true,
      center:true,
    },

    {
      name: "Fecha",
      cell: (row) => row.fechaCreacion.slice(0, 10),
      sortable: true,
      center:true,
    },
  ];

  const paginacionOpciones = {
    rowsPerPageText:'Filas por pagina',
    rangeSeparatorText: 'de',
  }

  if (pedidos.length > 0) {
    return (
      <div>
        <DataTable
          columns={columns}
          data={pedidos}
          title="Mis ventas"
          striped
          highlightOnHover
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 8]}
          pagination
          responsive
          paginationComponentOptions={paginacionOpciones}
        />
      </div>
    );
  } else {
    return <Loader/>;
  }
}
