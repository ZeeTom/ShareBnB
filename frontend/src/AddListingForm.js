import React, { useState, useEffect } from "react";

function AddListingForm({ add }) {
  
  const [formData, setFormData] = useState({
    title: "test",
    description: "test",
    price: "1000",
    location: "Mexico",
    image: null
  });

  async function handleAdd(evt) {
    evt.preventDefault();
    let data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    try {
      console.log(data);
      await add(data);
    } catch (err) {
      //   setErrors(err);
    }
  }

  function handleChange(evt) {
    const files = evt.target.files;
    const { name, value } = evt.target;
    let file = null;

    if (files) {
      file = files[0];
    }

    setFormData((oldData) => ({
      ...oldData,
      [name]: value,
      image: file
    }));
  }

  return (
    <div className="AddListingForm">
      <form encType="multipart/form-data" onSubmit={handleAdd} id="addListingForm">
        <input type="text" onChange={handleChange} placeholder="title" name="title" value={formData.title}></input>
        <input type="text" onChange={handleChange} placeholder="description" name="description" value={formData.description}></input>
        <input type="number" onChange={handleChange} placeholder="price" name="price" value={formData.price}></input>
        <input type="text" onChange={handleChange} placeholder="location" name="location" value={formData.location}></input>
        <input
          name="image"
          onChange={handleChange}
          type="file"
        ></input>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default AddListingForm;
