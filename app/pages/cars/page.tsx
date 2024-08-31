"use client";
import {
  useDeleteCarApiMutation,
  useGetCarsApiQuery,
  useUpdateCarApiMutation,
} from "@/store/api/crud/carApiSlice";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
}

const Page = () => {
  const { data: cars, isLoading, isError, refetch } = useGetCarsApiQuery("");
  const [updateCarApi] = useUpdateCarApiMutation();
  const [deleteCarApi] = useDeleteCarApiMutation();

  const [editId, setEditId] = useState<number | null>(null);
  const [editData, setEditData] = useState({ make: "", model: "", year: 0 });

  const handleEditClick = (id: number, item: Car) => {
    setEditId(id);
    setEditData(item);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSaveClick = async () => {
    if (editId === null) return;
    const id = editId;
    const data = {
      make: editData.make,
      model: editData.model,
      year: editData.year,
    };
    try {
      await updateCarApi({ id, data }).unwrap();
      setEditId(null);
      refetch();
    } catch (error) {
      console.error("Failed to update car:", error);
    }
  };

  const handleDeleteClick = async (id: number) => {
    try {
      await deleteCarApi(id).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to delete car:", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data.</p>;

  return (
    <div className="p-4">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="text-left p-4 border-b">Make</th>
            <th className="text-left p-4 border-b">Model</th>
            <th className="text-left p-4 border-b">Year</th>
            <th className="text-left p-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars?.map((item: Car) => (
            <tr key={item.id} className="border-b">
              <td className="p-4">
                {editId === item.id ? (
                  <input
                    type="text"
                    name="make"
                    value={editData.make}
                    onChange={handleInputChange}
                    className="border p-2 rounded-lg w-full"
                  />
                ) : (
                  item.make
                )}
              </td>
              <td className="p-4">
                {editId === item.id ? (
                  <input
                    type="text"
                    name="model"
                    value={editData.model}
                    onChange={handleInputChange}
                    className="border p-2 rounded-lg w-full"
                  />
                ) : (
                  item.model
                )}
              </td>
              <td className="p-4">
                {editId === item.id ? (
                  <input
                    type="number"
                    name="year"
                    value={editData.year}
                    onChange={handleInputChange}
                    className="border p-2 rounded-lg w-full"
                  />
                ) : (
                  item.year
                )}
              </td>
              <td className="p-4 flex space-x-2">
                {editId === item.id ? (
                  <button
                    onClick={handleSaveClick}
                    className="bg-green-500 text-white px-3 py-2 rounded-lg"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(item.id, item)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                )}
                <button
                  onClick={() => handleDeleteClick(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
