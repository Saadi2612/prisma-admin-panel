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
} from '@coreui/react'
import { DocsExample } from 'src/components'

import ReactImg from 'src/assets/images/react.jpg'

const Agents = () => {

  const [records, setRecords] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedValues, setUpdatedValues] = useState({
    id: '',
    email: '',
    name: '',
  });

  // making get request for agents
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/agents"
      );
      setRecords(response.data.users); // filling records array with response from backend
      
    } catch (error) {
      console.error("Failed to get users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // This function set the user details when update button is clicked.
  const handleUpdateClick = (user) => {
    setSelectedUser(user); // data of selected user assigned to selectedUser
    setVisible(true);

    // Set the initial values in the form fields
    // this state will be used to fill form fields when update button is clicked
    setUpdatedValues({
      id: user.id,
      name: user.name,
      email: user.email,
      agency: user.agency,
      agency_description: user.agency_description,
      agency_address: user.agency_address,
    });
  };

  // handle input change in the fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  // function to display toast
  const [toastVisible, setToastVisible] = useState(false);
  const updateSuccessToast = () => {
    setToastVisible(!toastVisible);

    setTimeout(() => {
      setToastVisible(false);
    }, 2000);
  }

  // function will be executed on clicking save changes button
  const handleSaveChanges = async(id) => {
    // Make the API request to update the user with updatedValues
    try {
      const { data } = await axios.put(
        "http://localhost:5000/agents/" + id,
        {
          // sending data to the backend
          name: updatedValues.name,
          email: updatedValues.email,
          agency: updatedValues.agency,
          agency_description: updatedValues.agency_description,
          agency_address: updatedValues.agency_address,
        },
        {
          withCredentials: true,
        }
      );
      
      // to display toast
      updateSuccessToast();
      // fetching the latest updated data from the database
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
      agency: '',
      agency_description: '',
      agency_address: '',
    });
  };

  // delete function
  const handleDeleteClick = async (id) => {
    try {
      const del_result = await axios.delete(
        "http://localhost:5000/agents/" + id
      );
      // Perform any necessary updates or fetch the updated records list
      fetchUsers();
      
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
        <h2>Agents</h2>
        <CAccordion alwaysOpen>
          {
            records.filter((item) => item.role === "agent").map((item, index) =>
          (<CAccordionItem key={index+1} itemKey={1}>
            <CAccordionHeader>{ item.name }</CAccordionHeader>
            <CAccordionBody>
              {/*Displaying details when accordion is expanded*/}
                <strong>ID: </strong> {item.id}
                <br />
                <strong>Email: </strong> {item.email}
                <br />
                <strong>Role: </strong> {item.role}
                <br />
                <strong>Agency: </strong> {item.agency}
                <br />
                <strong>Agency Description: </strong> {item.agency_description}
                <br />
                <strong>Agency Address: </strong> {item.agency_address}

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  {/* update button */}
                    <CButton
                      onClick={() => handleUpdateClick(item)}
                      color="primary"
                      className="me-md-2"
                    >
                      Update
                    </CButton>

                    {/*Delete button*/}
                    <CButton onClick={() => handleDeleteClick(item.id)} color="danger">Delete</CButton>
                </div>
                
            </CAccordionBody>
          </CAccordionItem>)
          )}
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
                //placeholder="Enter Updated email"
                aria-label="sm input example"
                name="email"
                value={updatedValues.email}
                onChange={handleInputChange}
              />
              <CFormInput
                type="text"
                size="sm"
                //placeholder="Enter Updated Name"
                aria-label="sm input example"
                name="name"
                value={updatedValues.name}
                onChange={handleInputChange}
              />
              <CFormInput
                type="text"
                size="sm"
                //placeholder="Enter Old Password"
                aria-label="sm input example"
                name="agency"
                value={updatedValues.agency}
                onChange={handleInputChange}
              />
              <CFormInput
                type="text"
                size="sm"
                //placeholder="Enter New Password"
                aria-label="sm input example"
                name="agency_description"
                value={updatedValues.agency_description}
                onChange={handleInputChange}
              />
              <CFormInput
                type="text"
                size="sm"
                //placeholder="Confirm New Password"
                aria-label="sm input example"
                name="agency_address"
                value={updatedValues.agency_address}
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
  )
}

export default Agents;
