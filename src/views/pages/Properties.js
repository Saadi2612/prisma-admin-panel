import React, {useState, useEffect} from 'react';
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

const Properties = () => {

    const [properties, setProperties] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [updatedValues, setUpdatedValues] = useState({
        title: '',
        description: '',
        purpose: '',
        price: '',
        type: '',
        city: '',
        locationValue: '',
        area: '',
        roomCount: '',
        bathroomCount: '',
        tvLounge: '',
        kitchen: '',
        drawingRoom: '',
        balcony: '',
        servantQuaters: '',
    });

  const fetchProperties = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/properties"
      );
        setProperties(response.data.properties);
        
    } catch (error) {
      console.error("Failed to get properties:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);
    
    const handleUpdateClick = (user) => {
    setSelectedUser(user);
    setVisible(true);
    // Set the initial values in the form fields
    setUpdatedValues({
        title: user.title,
        description: user.description,
        purpose: user.purpose,
        price: user.price,
        type: user.type,
        city: user.city,
        locationValue: user.locationValue,
        area: user.area,
        roomCount: user.roomCount,
        bathroomCount: user.bathroomCount,
        tvLounge: user.tvLounge,
        kitchen: user.kitchen,
        drawingRoom: user.drawingRoom,
        balcony: user.balcony,
        servantQuaters: user.servantQuaters,
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
        "http://localhost:5000/properties/" + id,
        {
            title: updatedValues.title,
            description: updatedValues.description,
            purpose: updatedValues.purpose,
            price: updatedValues.price,
            type: updatedValues.type,
            city: updatedValues.city,
            locationValue: updatedValues.locationValue,
            area: updatedValues.area,
            roomCount: updatedValues.roomCount,
            bathroomCount: updatedValues.bathroomCount,
            tvLounge: updatedValues.tvLounge,
            kitchen: updatedValues.kitchen,
            drawingRoom: updatedValues.drawingRoom,
            balcony: updatedValues.balcony,
            servantQuaters: updatedValues.servantQuaters,
        },
        {
          withCredentials: true,
        }
      );
      
      updateSuccessToast();
      fetchProperties();
    
    } catch (err) {
      console.log(err);
    }

    // Close the modal and reset the selectedUser and updatedValues
    setVisible(false);
    setSelectedUser(null);
    setUpdatedValues({
        title: '',
        description: '',
        purpose: '',
        price: '',
        type: '',
        city: '',
        locationValue: '',
        area: '',
        roomCount: '',
        bathroomCount: '',
        tvLounge: '',
        kitchen: '',
        drawingRoom: '',
        balcony: '',
        servantQuaters: '',
    });
  };

  const handleDeleteClick = async (id) => {
    try {
      const del_result = await axios.delete(
        "http://localhost:5000/properties/" + id
      );
      // Perform any necessary updates or fetch the updated records list
      fetchProperties();
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
          <CButton onClick={fetchProperties}>Get properties</CButton>
        <h2>Properties</h2>
            <CAccordion alwaysOpen>
          {
            properties.map((item, index) =>
                (<CAccordionItem key={index+1} itemKey={index+1}>
                <CAccordionHeader>{ item.title }</CAccordionHeader>
                    <CAccordionBody>
                    <strong>Description: </strong><span>{item.description}</span>
                    <br />
                    <strong>Purpose: </strong><span>{item.purpose}</span>
                    <br />
                    <strong className='fs-5'>Price: </strong><span>{"Rs."+item.price}</span> 
                    <h4 className='mt-2 text-black-50'>More Details</h4>
                    <strong>Type: </strong><span>{item.type}</span>
                    <br />
                    <strong>City: </strong><span>{item.city}</span>
                    <br />
                    <strong>Location: </strong><span>{item.locationValue}</span>
                    <br />
                    <strong>Area: </strong><span>{item.area}</span>
                    <br />
                    <h4 className='mt-2 text-black-50'>Features</h4>
                    <strong>Rooms: </strong><span>{item.roomCount}</span>
                    <br />
                    <strong>Bathrooms: </strong>{item.bathroomCount}
                    <br />
                    <strong>TV Lounges: </strong>{item.tvLounge}
                    <br />
                    <strong>Kitchens: </strong>{item.kitchen}
                    <br />
                    <strong>Drawing Rooms: </strong>{item.drawingRoom}
                    <br/>
                    <strong>Balconies: </strong>{item.balcony}
                    <br />
                    <strong>Servant Quarters: </strong>{item.servantQuaters}

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
                </CAccordionItem>)
              )}
            </CAccordion>
            </div>

            <CModal scrollable backdrop="static" alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Update Info</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <div className="d-grid gap-2">
              <CFormInput
                type="text"
                size="sm"
                //placeholder="Enter Updated email"
                aria-label="sm input example"
                name="title"
                value={updatedValues.title}
                onChange={handleInputChange}
              />
              <CFormInput
                type="text"
                size="sm"
                //placeholder="Enter Updated Name"
                aria-label="sm input example"
                name="description"
                value={updatedValues.description}
                onChange={handleInputChange}
              />
              <CFormInput
                type="text"
                size="sm"
                //placeholder="Enter Old Password"
                aria-label="sm input example"
                name="purpose"
                value={updatedValues.purpose}
                onChange={handleInputChange}
              />
              <CFormInput
                type="text"
                size="sm"
                //placeholder="Enter New Password"
                aria-label="sm input example"
                name="price"
                value={updatedValues.price}
                onChange={handleInputChange}
              />
              <CFormInput
                type="text"
                size="sm"
                //placeholder="Enter New Password"
                aria-label="sm input example"
                name="type"
                value={updatedValues.type}
                onChange={handleInputChange}
              />
              <CFormInput
                type="text"
                size="sm"
                //placeholder="Enter New Password"
                aria-label="sm input example"
                name="city"
                value={updatedValues.city}
                onChange={handleInputChange}
              />
              <CFormInput
                type="text"
                size="sm"
                //placeholder="Enter New Password"
                aria-label="sm input example"
                name="locationValue"
                value={updatedValues.locationValue}
                onChange={handleInputChange}
              />
              <CFormInput
                type="text"
                size="sm"
                //placeholder="Enter New Password"
                aria-label="sm input example"
                name="area"
                value={updatedValues.area}
                onChange={handleInputChange}
              />
              <CFormInput
                type="text"
                size="sm"
                //placeholder="Enter New Password"
                aria-label="sm input example"
                name="roomCount"
                value={updatedValues.roomCount}
                onChange={handleInputChange}
              />
              <CFormInput
                type="text"
                size="sm"
                //placeholder="Enter New Password"
                aria-label="sm input example"
                name="bathroomCount"
                value={updatedValues.bathroomCount}
                onChange={handleInputChange}
              />
              <CFormInput
                type="text"
                size="sm"
                //placeholder="Enter New Password"
                aria-label="sm input example"
                name="tvLounge"
                value={updatedValues.tvLounge}
                onChange={handleInputChange}
              />
              <CFormInput
                type="text"
                size="sm"
                //placeholder="Enter New Password"
                aria-label="sm input example"
                name="kitchen"
                value={updatedValues.kitchen}
                onChange={handleInputChange}
              />
              <CFormInput
                type="text"
                size="sm"
                //placeholder="Enter New Password"
                aria-label="sm input example"
                name="drawingRoom"
                value={updatedValues.drawingRoom}
                onChange={handleInputChange}
              />
              <CFormInput
                type="text"
                size="sm"
                //placeholder="Enter New Password"
                aria-label="sm input example"
                name="balcony"
                value={updatedValues.balcony}
                onChange={handleInputChange}
              />
              <CFormInput
                type="text"
                size="sm"
                //placeholder="Enter New Password"
                aria-label="sm input example"
                name="servantQuaters"
                value={updatedValues.servantQuaters}
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

export default Properties;
