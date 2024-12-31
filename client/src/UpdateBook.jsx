import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateBook = () => {
  const { id } = useParams();

  const [values, setValues] = useState({
    publisher: "",
    name: "",
    date: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3030/update/" +id, values)
      .then((res) => navigate("/"))
      .catch((err) => console.log( err));
  };

  // To fetch the records
  useEffect(() => {
    axios
      .get("http://localhost:3030/getrecord/" + id)
      .then((res) => 
        setValues({
          ...values,
          publisher: res.data[0].publisher,
          name: res.data[0].name,
          date: res.data[0].date
        })
      )
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="d-flex align-items-center flex-column mt-3">
      <h1>Update Book</h1>
      <form className="w-50" onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="publisher" className="form-label">
            Publisher:
          </label>
          <input
            type="text"
            className="form-control"
            id="publisher"
            placeholder="Publisher Name"
            name="publisher"
            value={values.publisher}
            onChange={(e) =>
              setValues({ ...values, publisher: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Book Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Book Name"
            name="name"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Publish Date:
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            placeholder="Enter Publish Date"
            name="date"
            value={values.date}
            onChange={(e) => setValues({ ...values, date: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
