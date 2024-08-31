"use client";

import {
  useCreateCarApiMutation,
  useGetCarsApiQuery,
} from "@/store/api/crud/carApiSlice";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  make: string;
  model: string;
  year: number;
}

const CarForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const { refetch } = useGetCarsApiQuery("");
  const [createCarApi, { isError, isLoading }] = useCreateCarApiMutation();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await createCarApi(data).unwrap();
      reset();
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Car Details
        </h2>

        <div className="mb-4">
          <label
            htmlFor="make"
            className="block text-gray-700 font-medium mb-2"
          >
            Make
          </label>
          <input
            id="make"
            type="text"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.make ? "border-red-500" : "border-gray-300"
            }`}
            {...register("make", { required: "Make is required" })}
            disabled={isLoading}
          />
          {errors.make && (
            <p className="text-red-500 text-sm mt-1">{errors.make.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="model"
            className="block text-gray-700 font-medium mb-2"
          >
            Model
          </label>
          <input
            id="model"
            type="text"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.model ? "border-red-500" : "border-gray-300"
            }`}
            {...register("model", { required: "Model is required" })}
            disabled={isLoading}
          />
          {errors.model && (
            <p className="text-red-500 text-sm mt-1">{errors.model.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="year"
            className="block text-gray-700 font-medium mb-2"
          >
            Year
          </label>
          <input
            id="year"
            type="number"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.year ? "border-red-500" : "border-gray-300"
            }`}
            {...register("year", {
              required: "Year is required",
              valueAsNumber: true,
              max: {
                value: new Date().getFullYear(),
                message: "Year must not be in the future",
              },
            })}
            disabled={isLoading}
          />
          {errors.year && (
            <p className="text-red-500 text-sm mt-1">{errors.year.message}</p>
          )}
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-500 text-white font-semibold p-3 rounded-lg hover:bg-blue-600 transition duration-300 ${
            isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>

        {isError && (
          <p className="text-red-500 text-sm mt-4">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  );
};

export default CarForm;
