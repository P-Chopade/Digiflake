import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { PlusCircle, Edit, Trash2 } from "react-feather";
import { Modal } from "react-responsive-modal";
import { BiCube } from "react-icons/bi";

function Product() {
  const blankuser = {
    Name: "",
    Pack_Size: "",
    Category: "",
    MRP: "",
    Image: "",
    Status: "",
  };

  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("Add");
  const [userdata, setUserdata] = useState([]);
  const [user, setUser] = useState(blankuser);
  const [editIndex, setEditIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    setAction("Add");
  };

  const addUser = () => {
    setUserdata([...userdata, user]);
    setUser(blankuser);
    onCloseModal();
  };

  const editUser = (index) => {
    setAction("Edit");
    const selectedUser = userdata.find((x, i) => i === index);
    setUser(selectedUser);
    setEditIndex(index);
    onOpenModal();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUser((prevUser) => ({ ...prevUser, Image: file }));
    console.log(user.Image);
  };

  const updateUser = () => {
    const newusers = userdata.map((x, i) => (i === editIndex ? user : x));
    setUserdata(newusers);
    setUser(blankuser);
    setEditIndex(null);
    onCloseModal();
  };

  const deleteUser = (index) => {
    const confirmLogout  = window.confirm(
     `Are you sure you want to delete this item?`
    );
 if(confirmLogout)
 {
  const newusers = userdata.filter((x, i) => i !== index);
  setUserdata(newusers);
 }
   
  };


  const filteredUsers = userdata.filter((user) =>
    Object.values(user).some((value) =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="container">
      <div className="toolbar" style={{ marginTop: "40px" }}>
        <BiCube /> <span style={{ marginRight: "56px" }}> Products</span>
        <span>
          {" "}
          <input
            type="text"
            style={{ borderRadius: "10px", padding: "5px" }}
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={onOpenModal}
            style={{ position: "fixed", top: 100, right: 20, backgroundColor: 'blueviolet' }}
          >
            Add new
          </button>
        </span>
      </div>
      <hr />
      <table className="table table-bordered table-striped table-hover">
        <thead className="thead-beig">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Pack_Size</th>
            <th>Category</th>
            <th>MRP</th>
            <th>Image</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 &&
            filteredUsers.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.Name}</td>
                  <td>{user.Pack_Size}</td>
                  <td>{user.Category}</td>
                  <td>{user.MRP}</td>
                  <td>
                    {user.Image && (
                      <img
                        src={URL.createObjectURL(user.Image)}
                        alt="User Image"
                        style={{ maxWidth: "35px", maxHeight: "35px" }}
                      />
                    )}
                  </td>
                  <td
                    style={{
                      color: user.Status === "active" ? "green" : "red",
                    }}
                  >
                    {user.Status}
                  </td>
                  <td>
                    <button className="btn ml2" onClick={() => editUser(index)}>
                      <Edit size={16} />
                      <span>Edit</span>
                    </button>
                    {user.Status !== "inactive" && (
                      <button
                        className="btn ml2"
                        onClick={() => deleteUser(index)}
                      >
                        <Trash2 size={16} />
                        <span>Delete</span>
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <Modal open={open} onClose={onCloseModal} center>
        <h2>{action} User</h2>
        <div className="d-flex justify-content-center align-items-center mt-3">
          <div className="p-3 rounded w-75 border">
            <div className='form className="row g-3"'>
              <div className="col-md-6">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  value={user.Name}
                  onChange={(e) => setUser({ ...user, Name: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="">Pack_Size</label>
                <input
                  type="text"
                  value={user.Pack_Size}
                  onChange={(e) =>
                    setUser({ ...user, Pack_Size: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="">Category</label>
                <input
                  type="text"
                  value={user.Category}
                  onChange={(e) =>
                    setUser({ ...user, Category: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="">MRP</label>
                <input
                  type="text"
                  value={user.MRP}
                  onChange={(e) => setUser({ ...user, MRP: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="imageInput">Image</label>
                <input
                  type="file"
                  id="imageInput"
                  onChange={(e) => handleImageChange(e)}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="">Status</label>
                <select
                  value={user.Status}
                  onChange={(e) => setUser({ ...user, Status: e.target.value })}
                >
                  <option value="">Select Status</option>
                  <option value="active">active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="col-12 d-flex justify-content-between">
                {action == "Add" && (
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={() => addUser()}
                    style={{ backgroundColor: 'blueviolet',marginTop:'20px' }}
                  >
                    Save
                  </button>
                )}
              </div>
              <div className="col-12 d-flex justify-content-between">
                {action == "Edit" && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => updateUser()}
                  >
                    Update
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Product;
