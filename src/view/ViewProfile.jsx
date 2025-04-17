import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Input,
  Button,
} from "@heroui/react";

const EditStudent = ({ studentData, onSave }) => {
  const dummyData = {
    name: "Abdulvahab Shaikh",
    email: "abdul@example.com",
    phone: "+91 98765 43210",
    address: "Solapur, Maharashtra",
    profileUrl: "https://www.w3schools.com/howto/img_avatar.png",
  };

  const [student, setStudent] = useState(studentData || dummyData);

  const handleChange = (e) => {
    const { name, value } = e.target;
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
              src={student.profileUrl}
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
              label="Phone"
              name="phone"
              type="tel"
              value={student.phone}
              onChange={handleChange}
              fullWidth
            />
            <Input
              label="Address"
              name="address"
              value={student.address}
              onChange={handleChange}
              fullWidth
            />
          </div>
        </CardBody>

        <CardFooter className="justify-center">
          <Button type="submit" variant="solid" color="primary" size="lg">
            Save Changes
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default EditStudent;
