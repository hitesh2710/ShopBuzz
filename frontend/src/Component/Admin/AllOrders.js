import React,{Fragment, useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useAlert} from 'react-alert'
import { clearError } from '../../actions/productaction'
import {DataGrid} from '@material-ui/data-grid'
import './AllProducts.css'
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import SideBar from './SideBar'
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MetaData from "../layout/Header/MetaData.js";
import { deleteOrder, getAllOrders } from '../../actions/orderAction'
import { DELETE_ORDER_RESET } from '../../constants/orderConstant'

function AllOrders() {
    const {error,orders}=useSelector((state)=>state.AdminOrderReducer)
   
    const alert=useAlert()
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const deleteOrderHandler=(id)=>
    {
      dispatch(deleteOrder(id))
    }
    const EditOrderHandler=(link)=>
    {
      navigate(link)
    }
    const {error:deleteError,isDeleted}=useSelector((state)=>state.orderOperationReducer)
    useEffect(()=>
    {
      if(error)
      {
       alert.error(error)
       dispatch(clearError())
      }
      if(deleteError)
      {
       alert.error(error)
       dispatch(clearError())
      }
      if(isDeleted)
      {
        alert.success("Order Deleted Successfully !")
        dispatch({type:DELETE_ORDER_RESET})
      }
      dispatch(getAllOrders())
    },[dispatch,error,alert,isDeleted,deleteError])

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 200, flex: 0.4 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.2,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 230,
      flex: 0.3,
    },
    {
      field: "actions",
      flex: 0.2,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
            onClick={() =>
              EditOrderHandler(`/admin/order/${params.getValue(params.id, "id")}`)
            }
            >
            <EditIcon />
            </Button>

            {/* <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link> */}

            <Button
            onClick={() =>
              deleteOrderHandler(params.getValue(params.id, "id"))
            }
            >
            <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
      ];
    
      const rows = [];
    
      orders!==undefined &&
        orders.forEach((item) => {
          rows.push({
          id: item._id,
          itemsQty: item.orderItem.length,
          status: item.orderStatus,
          amount: item.totalPrice,
          });
        });
  return (
    <Fragment>
        <MetaData title="All Orders - Admin"></MetaData>
        <div className="dashboard">
            <SideBar></SideBar>
            <div className="productListContainer">
                <h1 id="productListHeading">All Orders</h1>
                <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
               />

                
            </div>
        </div>
    </Fragment>
  )
}

export default AllOrders