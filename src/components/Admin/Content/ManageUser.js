import AddUser from "./AddUser";
import "./ManageUser.scss";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/apiService";
import UpdateUser from "./UpdateUser";
import { GrAdd } from "react-icons/gr";
import ViewUser from "./ViewUser";
import DeleteUser from "./DeleteUser";
import TableUserPaginage from "./TableUserPaginage";

const ManageUser = (props) => {
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [showViewUser, setShowViewUser] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);

  const [dataUpdate, setDataUpdate] = useState({});
  const [dataView, setDataView] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const handleClickBtnUpdate = (user) => {
    setShowUpdateUser(true);
    setDataUpdate(user);
  };

  const handleClickBtnView = (user) => {
    setShowViewUser(true);
    setDataView(user);
  };

  const handleClickBtnDelete = (user) => {
    setShowDeleteUser(true);
    setDataDelete(user);
  };
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    fetchListUsers();
  }, []);

  const fetchListUsers = async () => {
    try {
      let res = await getAllUsers();
      if (res && res.status === 200) {
        setListUsers(res.data);
      }
    } catch (err) {
      alert("Something wrong!");
    }
  };

  return (
    <div className="manage-user-container">
      <div className="title">Manager user</div>
      <div className="users-content">
        <div className="btn-add-new">
          <button
            className="btn btn-primary"
            onClick={() => setShowCreateUser(true)}
          >
            <GrAdd />
            ADD A NEW USER
          </button>
        </div>
        {/* <AddUser fetchListUsers={fetchListUsers} /> */}
        <div className="table-users-container">
          {/* <TableUser
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
          /> */}
          <TableUserPaginage
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
          />
        </div>
        <AddUser
          show={showCreateUser}
          setShow={setShowCreateUser}
          fetchListUsers={fetchListUsers}
        />
        <UpdateUser
          show={showUpdateUser}
          setShow={setShowUpdateUser}
          dataUpdate={dataUpdate}
          fetchListUsers={fetchListUsers}
        />
        <ViewUser
          show={showViewUser}
          setShow={setShowViewUser}
          dataView={dataView}
          fetchListUsers={fetchListUsers}
        />
        <DeleteUser
          show={showDeleteUser}
          setShow={setShowDeleteUser}
          dataDelete={dataDelete}
          fetchListUsers={fetchListUsers}
        />
      </div>
    </div>
  );
};

export default ManageUser;
