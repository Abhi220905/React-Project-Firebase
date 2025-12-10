import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const TaskForm = () => {
  const navigate = useNavigate();

  const Category = ["FrontEnd", "UI/IX", "Backend"];
  const { register, handleSubmit, reset } = useForm();

  const { id } = useParams();

  const singleTask = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/taskform/${id}`);
    reset(res.data);
    console.log(res.data)
  };

  useEffect(() => {
    singleTask();
  }, [id]);

  function addTask(data) {
    axios
      .post(`${import.meta.env.VITE_API_URL}taskform`, data)
      .then(() => {
        alert("Ur task added!!");
        reset();
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  const update = async(data) => {
    axios
      .put(`${import.meta.env.VITE_API_URL}taskform/${id}`, data)
      .then(() => {
        alert("Task Updated!!!!");
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  return (
    <form
      className="col-lg-6 my-5 p-5 mx-auto shadow"
      onSubmit={handleSubmit(id ? update : addTask)}
    >
      <h3 className="p-2 text-center">Category Form</h3>
      <div className="mt-4">
        <select className="form-select" {...register("category")}>
          <option value="" disabled>
            -- Select Category --
          </option>
          {Category.map((ele) => (
            <option value={ele}>{ele}</option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <input
          type="text"
          {...register("title")}
          className="form-control"
          placeholder="Enter Title"
        />
      </div>
      <div className="mt-4">
        <input type="date" {...register("due_date")} className="form-control" />
      </div>
      <div className="mt-4">
        <input
          type="url"
          {...register("url")}
          className="form-control"
          placeholder="Enter img Url"
        />
      </div>
      <div className="mt-4">
        <textarea
          {...register("description")}
          className="form-control"
          placeholder="Enter description"
        />
      </div>
      <div className="mt-4">
        <button className="btn btn-warning">
          {id ? "Update Task" : "Add Task"}{" "}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
