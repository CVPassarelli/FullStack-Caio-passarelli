import React, { useEffect, useState } from "react";

import { getTasks, getUsers } from "./services";
import { ITask, IUser } from "../../interfaces/task";
import { Loader } from "./components/Loader";
import { TaskCard } from "./components/TaskCard";
import { Modal } from "./components/Modal";
import { TaskForm } from "./components/TaskForm";
import { Update } from "./components/Update";

const initialValues: Partial<ITask> = {
  title: "",
  description: "",
  completed: false,
  assigne: "",
};

function App() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [cards, setCards] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] =
    useState<Partial<ITask>>(initialValues);
  const [showToasty, setShowToasty] = useState<boolean>(false);

  useEffect(() => {
    const loadUsers = async () => {
      const users = await getUsers();
      setUsers(users);
    };
    loadUsers();
  }, []);

  useEffect(() => {
    setLoading(true);
    const socket = new WebSocket("ws://localhost:3001");

    socket.onmessage = (event) => {
      try {
        const tasks: ITask[] = JSON.parse(event.data);
        setCards(tasks);
      } catch (error) {
        console.error("❌ Error parsing WebSocket data:", error);
      }
    };

    socket.onclose = () => {
      console.warn("⚠️ WebSocket closed");
    };

    socket.onerror = (err) => {
      console.error("❌ WebSocket error", err);
    };
    setLoading(false);

    return () => socket.close();
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const onSelectCard = (id: number) => {
    const selectedCard = cards.find((card) => card.id === id);
    setSelectedTask(selectedCard ?? initialValues);
    setIsEditing(true);
    openModal();
  };
  const onSuccess = () => {
    setShowToasty(true);
  };

  const todoCards = cards.filter((card) => !card.completed);
  const doneCards = cards.filter((card) => card.completed);

  return (
    <>
      <header className="border shadow-md p-3 bg-slate-100 flex justify-center">
        <div className="container flex justify-center items-center text-2xl font-semibold">
          Task manager
        </div>
        <div>
          <Update />
        </div>
      </header>
      <section className=" my-5 flex justify-center">
        <button
          className=" rounded-md px-5 bg-blue-500  text-white"
          onClick={openModal}>
          Create Task
        </button>
      </section>
      <main className="container mx-auto flex justify-center py-5 px-5">
        <div className="flex gap-3 flex-1">
          <section className="shadow-md w-full">
            <div className="flex justify-center border-b py-3 font-bold">
              <h3>TO DO</h3>
            </div>
            <div className="grid grid-cols-3 gap-4 p-3">
              {todoCards.length > 0 &&
                todoCards.map((card, index) => (
                  <TaskCard card={card} key={index} onClick={onSelectCard} />
                ))}
            </div>
          </section>
          <section className="shadow-md w-full">
            <div className="flex justify-center border-b py-3 font-bold">
              <h3>DONE</h3>
            </div>
            <div className="grid grid-cols-3 gap-4 p-3">
              {doneCards.length > 0 &&
                doneCards.map((card, index) => (
                  <TaskCard card={card} key={index} onClick={onSelectCard} />
                ))}
            </div>
          </section>
        </div>
      </main>

      <Loader loading={loading} />
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Task Details">
        <TaskForm
          assigneUsers={users}
          initialValues={selectedTask}
          isEditing={isEditing}
          onClose={() => setShowModal(false)}
          onSuccess={onSuccess}
        />
      </Modal>
    </>
  );
}

export default App;
