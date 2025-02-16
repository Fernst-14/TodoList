import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Edit() {
  const { id } = useParams(); // ใช้คำสั่ง useParams ในการรับค่า id
  const base_url = "https://67b04f0adffcd88a6788dec2.mockapi.io"; // url api
  // สร้าง state สําหรับเก็บข้อมูล
  const [todo, setTodo] = useState({
    name: "", // set default value name เป็น ค่าว่าง
  });

  // ดึงข้อมูลออกมาแสดง ตาม id
  async function fetchTodo(todoId) {
    try {
      const response = await axios.get(`${base_url}/todo/${todoId}`);
      setTodo(response.data); // เก็บข้อมูลไว้ใน state
    } catch (error) {
      console.log("error", error);
    }
  }

  // useEffect
  useEffect(() => {
    fetchTodo(id);
  }, [id]); // ใช้ค่า id ในการดึงข้อมูล

  function handleChange(event) {
    setTodo((previousTodo) => ({
      ...previousTodo, // คัดลอกข้อมูลเดิม
      name: event.target.value, // เปลี่ยนค่า name
    }));
  }

  async function updateName(event) {
    try {
      await axios.put(`${base_url}/todo/${id}`, {
        name: todo.name, // เปลี่ยนค่า name
      });
      alert("update success");
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center p-5 ">
        <div className="text-2xl font-bold text-gray-700 ">
          {/* นำ id มาแสดง */}
          <h1 className="text-2xl">Hello Edit page id {useParams().id}</h1>
          Name : {todo.name}
          {/* นำข้อมูลมาแสดง */}
        </div>

        <div class=" justify-center items-center mt-4 pl-5 ">
          <input
            type="text"
            value={todo.name}
            onChange={handleChange}
            className="border-2 rounded-md p-0.5 mr-[10px]"
          />
          {todo.status}
          {/* ปุ่ม Edit */}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-[20px] py-2 px-3 rounded"
            onClick={() => updateName()}
          >
            Edit
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center p-5 pr-[100px]">
        {/* ปุ่ม Home  */}
        <Link to='/'>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-[20px] py-2 px-3 rounded ">
            Go Home
            </button>
        </Link>
      </div>
    </>
  );
}
