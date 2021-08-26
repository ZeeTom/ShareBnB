import { useState } from "react";

function AddListingForm({ add }) {
  const [formData, setFormData] = useState({
    title: "Test title",
    description: "test description",
    price: 5,
    location: "anywhere but here",
  });
  //   const [errors, setErrors] = useState([]);

  async function handleAdd(evt) {
    evt.preventDefault();
    try {
      console.log(formData);
      await add(formData);
    } catch (err) {
      //   setErrors(err);
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  }

  return (
    <div className="AddListingForm">
      <form onSubmit={handleAdd}>
        <input placeholder="title" name="title"></input>
        <input placeholder="description" name="description"></input>
        <input type="number" placeholder="price" name="price"></input>
        <input placeholder="location" name="location"></input>
        <input
          name="image"
          onChange={handleChange}
          placeholder="image url"
          type="file"
        ></input>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default AddListingForm;
