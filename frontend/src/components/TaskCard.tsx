import React, {useState} from 'react';
import "../styles/TaskCard.css"
import {TaskModel} from "../Model/TaskModel";
import TaskModal from "./TaskModal";
import axios from "axios";



type TaskCardProps = {
    task: TaskModel
    fetchAllTasks: () => void
}

export default function TaskCard(props: TaskCardProps) {
    const [editModal, setEditModal] = useState(false)

    const handleEdit = () => {
        setEditModal(!editModal)
    }

    const handleDelete = () => {
        axios.delete("/api/todo/" + props.task.id)
            .then(() => {
                props.fetchAllTasks()
            })
            .catch(error => {
                console.log("[DELETE ERROR:]" + error)
            })
    }

    const closeModal = () => {
        setEditModal(false)
    }

    return (
        <>
            {editModal && <TaskModal closeModal={closeModal} task={props.task} fetchAllTasks={props.fetchAllTasks}/>}
            <section>
                <div className="taskHeader">
                    <h4>Aufgabe:</h4>
                    <button className="button margin red" onClick={handleDelete}>X</button>
                </div>

                <p className="card card__description">{props.task.description}</p>
                <p className="card card__status">Status: {props.task.status}</p>

                <button onClick={handleEdit} className="button margin">Edit</button>

            </section>

        </>
    )
}