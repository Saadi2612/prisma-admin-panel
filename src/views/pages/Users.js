import React, { useState, useEffect } from 'react';
import './Users.css';
import axios from 'axios';
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CButton,
  CModal,
  CModalTitle,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CForm,
  CFormInput,
  CToast,
  CToastBody,
  CToastClose
} from '@coreui/react';

const Users = () => {
  const [records, setRecords] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedValues, setUpdatedValues] = useState({
    id: '',
    email: '',
    name: '',
  });

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setRecords(response.data.users);
    } catch (error) {
      console.error("Failed to get users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateClick = (user) => {
    setSelectedUser(user);
    setVisible(true);
    // Set the initial values in the form fields
    setUpdatedValues({
      id: user.id,
      email: user.email,
      name: user.name,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const [toastVisible, setToastVisible] = useState(false);
  const updateSuccessToast = () => {
    setToastVisible(!toastVisible);

    setTimeout(() => {
      setToastVisible(false);
    }, 2000);
  }
  const handleSaveChanges = async(id) => {
    // Make the API request to update the user with updatedValues
    try {
      const { data } = await axios.put(
        "http://localhost:5000/users/" + id,
        {
          name: updatedValues.name,
          email: updatedValues.email,
        },
        {
          withCredentials: true,
        }
      );
      
      updateSuccessToast();
      fetchUsers();
    
    } catch (err) {
      console.log(err);
    }

    // Close the modal and reset the selectedUser and updatedValues
    setVisible(false);
    setSelectedUser(null);
    setUpdatedValues({
      id: '',
      email: '',
      name: '',
    });
  };

  const handleDeleteClick = async (id) => {
    try {
      const del_result = await axios.delete(
        "http://localhost:5000/users/" + id
      );
      // Perform any necessary updates or fetch the updated records list
      fetchUsers();
      //console.log(del_result);
    } catch (error) {
      console.error("Failed to delete record:", error);
    }
    console.log("Delete button clicked for:", id);
  };

  return (
    <>
      <CToast autohide={true} visible={toastVisible} onClose={() => setToastVisible(false)} id='toast' color="primary" className="text-white align-items-center">
        <div className="d-flex">
          <CToastBody>Update Successful!</CToastBody>
          <CToastClose className="me-2 m-auto" />
        </div>
      </CToast>
      <div className="accordion-div">
        <CButton onClick={fetchUsers}>Get users</CButton>
        <h2>Users</h2>
        <CAccordion alwaysOpen>
          {records
            .filter((item) => item.role === 'user')
            .map((item, index) => (
              <CAccordionItem key={index + 1} itemKey={index + 1}>
                <CAccordionHeader>{item.name}</CAccordionHeader>
                <CAccordionBody>
                  <strong>ID: </strong> {item.id}
                  <br />
                  <strong>Email: </strong> {item.email}
                  <br />
                  <strong>Role: </strong> {item.role}

                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <CButton
                      onClick={() => handleUpdateClick(item)}
                      color="primary"
                      className="me-md-2"
                    >
                      Update
                    </CButton>
                    <CButton onClick={() => handleDeleteClick(item.id)} color="danger">Delete</CButton>
                  </div>
                </CAccordionBody>
              </CAccordionItem>
            ))}
        </CAccordion>
      </div>

      <CModal backdrop="static" alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Update Info</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <div className="d-grid gap-2">
              <CFormInput
                type="email"
                size="sm"
                placeholder="Enter Updated email"
                aria-label="sm input example"
                name="email"
                value={updatedValues.email}
                onChange={handleInputChange}
              />
              <CFormInput
                type="text"
                size="sm"
                placeholder="Enter Updated Name"
                aria-label="sm input example"
                name="name"
                value={updatedValues.name}
                onChange={handleInputChange}
              />
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={() => handleSaveChanges(selectedUser.id)}>
            Save changes
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default Users;
