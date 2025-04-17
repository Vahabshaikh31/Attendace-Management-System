import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Input,
  Button,
  Select,
  SelectItem,
} from "@heroui/react";

const defaultDepartments = [
  { value: "Computer Science", label: "Computer Science" },
  { value: "Electronics", label: "Electronics" },
  { value: "Mechanical", label: "Mechanical" },
  { value: "Civil", label: "Civil" },
];

const defaultRoles = [{ value: "Student", label: "Student" }];

const EditStudent = ({
  studentData,
  onSave,
  departmentOptions = [],
  roleOptions = [],
}) => {
  const dummyData = {
    name: "Abdulvahab Shaikh",
    email: "abdul@example.com",
    password: "",
    department: defaultDepartments[0].value,
    rollNo: 0,
    profileImage: "https://www.w3schools.com/howto/img_avatar.png",
    role: defaultRoles[0].value,
  };

  const departments = departmentOptions.length
    ? departmentOptions
    : defaultDepartments;
  const roles = roleOptions.length ? roleOptions : defaultRoles;

  const [student, setStudent] = useState(studentData || dummyData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name) => (value) => {
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(student);
    alert("Student details updated successfully!");
  };

  return (
    <Card className="max-w-4xl mx-auto mt-10 p-8 bg-background-1">
      <form onSubmit={handleSubmit}>
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar
              src={student.profileImage}
              radius="full"
              size="lg"
              alt="Profile"
            />
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-default-foreground">
                {student.name}
              </h2>
              <p className="text-sm text-default-muted">{student.email}</p>
            </div>
          </div>
          <Button variant="flat" color="primary">
            Edit Profile
          </Button>
        </CardHeader>

        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              name="name"
              value={student.name}
              onChange={handleChange}
              fullWidth
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={student.email}
              onChange={handleChange}
              fullWidth
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={student.password}
              onChange={handleChange}
              fullWidth
            />
            <Select
              label="Department"
              name="department"
              value={student.department}
              onChange={handleSelectChange("department")}
              fullWidth
            >
              {departments.map((dept) => (
                <SelectItem key={dept.value} value={dept.value}>
                  {dept.label}
                </SelectItem>
              ))}
            </Select>
            <Input
              label="Roll Number"
              name="rollNo"
              type="number"
              value={student.rollNo}
              onChange={handleChange}
              fullWidth
            />
            <Select
              label="Role"
              name="role"
              value={student.role}
              onChange={handleSelectChange("role")}
              fullWidth
            >
              {roles.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </CardBody>
      </form>
    </Card>
  );
};

export default EditStudent;
