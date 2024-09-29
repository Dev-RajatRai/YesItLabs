import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal, Select } from "antd";
import { Option } from "antd/es/mentions";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../Component/Layout/Layout";
import AdminMenu from "../../Component/Layout/adminMenu";
import useDepartment from "../../Component/Hooks/useDepartment";

const UpdateEmployee = () => {
  const params = useParams();
  const department = useDepartment();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [newDepartment, setNewDepartment] = useState("");
  const [id, setId] = useState();
  const [employee, setEmployee] = useState({});
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  // Fetch single employee details
  const getEmployee = async () => {
    try {
      const { data } = await axios.get(
        `/api/employee/get-employee/${params.id}`
      );
      const emp = data?.employee;
      setEmployee(emp);
      setId(emp?._id);
      setName(emp?.name);
      setPhone(emp?.phone);
      setAddress(emp?.address);
      setNewDepartment(emp?.department);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployee();
  }, []);

  // Update employee details
  const updateEmployee = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/employee/update-employee/${id}`, {
        name,
        phone,
        address,
        department: newDepartment,
      });
      if (data?.success) {
        toast.success("Employee updated successfully");
        navigate("/dashboard/admin/employee");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error);
    }
  };

  // Delete employee
  const deleteEmployee = async () => {
    try {
      await axios.delete(`/api/employee/delete-employee/${id}`);
      toast.success("Employee deleted successfully");
      navigate("/dashboard/admin/employee");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Update Employees"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Employee</h1>
            <div className="m-1 w-75">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter employee name"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={employee.email}
                  disabled
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter employee phone"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter employee address"
                />
              </div>
              <div className="mb-3">
                <p>
                  Change the Department? Current Department is{" "}
                  {employee.department}
                </p>
                <Select
                  className="form-select mb-3"
                  bordered={false}
                  placeholder={"Please select Department"}
                  size="large"
                  showSearch
                  onChange={(value) => setNewDepartment(value)}
                  value={newDepartment}
                >
                  {department?.map((d) => (
                    <Option key={d._id} value={d.name}>
                      {d.name}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-primary col-md-12"
                  onClick={updateEmployee}
                >
                  Update employee
                </button>
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-danger col-md-12"
                  onClick={() => setVisible(true)}
                >
                  Delete employee
                </button>
              </div>
              <Modal
                onCancel={() => setVisible(false)}
                onOk={() => deleteEmployee()}
                open={visible}
              >
                Are you sure you want to delete this employee?
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateEmployee;
