import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [singleTask, setSingleTask] = useState({});

  async function showApi() {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}taskform`);
    setTasks(res.data);
  }

  useEffect(() => {
    showApi();
  }, []);

  async function trash(id) {
    if (confirm("Do you want to delete this Task?")) {
      axios
        .delete(`${import.meta.env.VITE_API_URL}taskform/${id}`)
        .then(() => {
          alert("Your Task has been Deleted");
          showApi();
        })
        .catch((err) => console.log(err));
    }
  }

  async function singleView(id) {
    const single = tasks.find((task) => task.id === id);
    setSingleTask(single);
  }

  return (
    <>
      <div className="container my-5">

        {/* Add Task Button */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Your Tasks</h2>
          <NavLink to="/addTask" className="btn btn-primary px-4">
            + Add Task
          </NavLink>
        </div>

        {/* Task List */}
        <div className="row g-4">
          {tasks.map((task) => (
            <div className="col-lg-4 col-md-6" key={task.id}>
              <div className="card shadow-sm border-0  h-100">

                {/* Card Body */}
                <div className="card-body shadow">
                  <h4 className="fw-bold">{task.title}</h4>

                  <ul className="mt-3 list-unstyled">
                    <li>
                      <strong>Category:</strong> {task.category}
                    </li>
                    <li>
                      <strong>Due Date:</strong> {task.due_date}
                    </li>
                    <li>
                      <strong>Description:</strong>{" "}
                      <span className="text-muted">{task.description}</span>
                    </li>
                  </ul>

                  <hr />

                  {/* Buttons */}
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-danger px-3"
                      onClick={() => trash(task.id)}
                    >
                      Delete
                    </button>

                    <button
                      className="btn btn-sm btn-warning px-3"
                      data-bs-toggle="modal"
                      data-bs-target="#taskModal"
                      onClick={() => singleView(task.id)}
                    >
                      View
                    </button>

                    <NavLink
                      to={`/updateTask/${task.id}`}
                      className="btn btn-sm btn-info px-3"
                    >
                      Update
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      <div
        className="modal fade"
        id="taskModal"
        data-bs-backdrop="static"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4 shadow">

            <div className="modal-header">
              <h5 className="modal-title fw-bold">Task Details</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              {singleTask && (
                <>
                  <h4 className="fw-bold mb-3">{singleTask.title}</h4>

                  <p>
                    <strong>Category:</strong> {singleTask.category}
                  </p>

                  <p>
                    <strong>Due Date:</strong> {singleTask.due_date}
                  </p>

                  <p>
                    <strong>Description:</strong> {singleTask.description}
                  </p>

                  {singleTask.url && (
                    <img
                      src={singleTask.url}
                      alt="Task"
                      className="img-fluid rounded mt-3"
                    />
                  )}
                </>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
