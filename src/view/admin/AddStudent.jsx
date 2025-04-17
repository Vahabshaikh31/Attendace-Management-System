"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  PlusIcon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";

export default function AddStudentModal({ onSubmit }) {
  // Modal and dark mode state
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Form state incorporating the schema fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    rollNo: "",
    profileImage: "",
    gender: "Male",
    dob: "",
    phone: "",
    address: "",
    // role is pre-set for students
    role: "Student",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Clear form state after submission
    setFormData({
      name: "",
      email: "",
      password: "",
      department: "",
      rollNo: "",
      profileImage: "",
      gender: "Male",
      dob: "",
      phone: "",
      address: "",
      role: "Student",
    });
    setIsOpen(false);
  };

  return (
    <>
      <Button
        className="bg-foreground text-background"
        endContent={<PlusIcon />}
        size="sm"
        onClick={() => setIsOpen(true)}
      >
        Add New
      </Button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className={`${isDark ? "dark" : ""} relative z-50`}
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                {/* Use conditional dark classes for the modal panel */}
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl p-6 shadow-xl transition-all bg-white dark:bg-gray-800">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between mb-4">
                    <Dialog.Title className="text-2xl font-semibold text-gray-900 dark:text-white">
                      Add New Student
                    </Dialog.Title>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-400 hover:text-red-500 transition"
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {/* Role Field - Readonly */}
                    <div className="col-span-1 sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Profile Photo
                      </label>
                      <input
                        required
                        type="file"
                        name="profilePhoto"
                        accept="image/*"
                        onChange={handleChange}
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0 file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-gray-300"
                      />
                    </div>
                    {/* Name Field */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Password Field */}
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Department Field */}
                    <div>
                      <label
                        htmlFor="department"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Department
                      </label>
                      <input
                        type="text"
                        name="department"
                        id="department"
                        required
                        value={formData.department}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Roll No Field */}
                    <div>
                      <label
                        htmlFor="rollNo"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Roll No
                      </label>
                      <input
                        type="number"
                        name="rollNo"
                        id="rollNo"
                        required
                        value={formData.rollNo}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Gender Field */}
                    <div>
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Gender
                      </label>
                      <select
                        name="gender"
                        id="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Date of Birth Field */}
                    <div>
                      <label
                        htmlFor="dob"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dob"
                        id="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +1234567890"
                        className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Address Field */}
                    <div className="md:col-span-2">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter address"
                        className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2 pt-4">
                      <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                      >
                        Submit Student
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
