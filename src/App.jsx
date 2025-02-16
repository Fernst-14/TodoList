import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  const [todos, setTodos] = useState([]);
  const base_url = "https://67b04f0adffcd88a6788dec2.mockapi.io";  // url api
  const [isloading, setIsLoading] = useState(true);

  //ดึงข้อมูลออกมาแสดง
  async function fetchTodo  () {
    try {
      const response = await axios.get(`${base_url}/todo`);
      setTodos(response.data);
      // console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  //ลบข้อมูล
  async function deleteTodo(id){
    try{
      setIsLoading(true)
      await axios.delete(`${base_url}/todo/${id}`)
      await fetchTodo();
      setIsLoading(false);
    }catch(error){
      console.log("error", error);
    }
  }

  useEffect(() => {
    fetchTodo();
  }, []);

  return (
    <>
    {isloading && (<div>Loading....</div>)}
    {!isloading && (
    <div className="flex flex-col gap-2 bg-amber-100">
      <h2 className="text-4xl text-gray-800 font-bold text-center py-5  ">Todo List</h2>
      {todos.map((todo, index) => (
        <div key={index} className="flex  flex-row flex-wrap gap-3 p-0.5 text-xl font-medium">
          {todo.id} {todo.name} {todo.status}
          {/* เปลี่ยนเป็น link ไปยังหน้า Edit และส่งค่า id ไป */}
          <Link to={`/todo/${todo.id}`}>
            <button className="font-bold border-2 rounded-md p-0.5 bg-white border-gray-500 ">Edit</button>
          </Link>
          <button className="font-bold border-2 rounded-md p-0.5 bg-white border-gray-500 "
          onClick={async () => await deleteTodo(todo.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
    )}
    </>
  );
}

export default App;
