import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from '../../hooks/useFetch'
import axios from "axios";

const Datatable = ({columns}) => {
  // This is a cool way to get the URL you are on, for a dynamic page
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const [list, setList] = useState();
  // This is a dynamic page, so the path must be dynamic
  const {data, loading, error} = useFetch(`/${path}`);

  useEffect(()=>{
    setList(data)
    console.log("data:", data)
  }, [data])

  const handleDelete = async (id) => {
    try {
      // This path must be dynamic as well
      await axios.delete(`/${path}/${id}`)
      setList(list.filter((item) => item._id !== id));
    } catch (err) {

    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row=>row._id}
      />
    </div>
  );
};

export default Datatable;
