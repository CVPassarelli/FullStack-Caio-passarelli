import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { getTasks } from "./services";

function App() {
  const getTaskList = async () => {
    const tasks = await getTasks();
    console.log(tasks);
  };
  useEffect(() => {
    getTaskList();
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900  text-3xl text-yellow-500 font-bold">
      Tailwind funcionando! 🚀
    </div>
  );
}

export default App;
