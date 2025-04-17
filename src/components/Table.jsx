import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Tooltip,
} from "@heroui/react"; // Assuming @heroui/react is your component library

// Adjust paths if necessary based on your project structure
import AddStudentModal from "../view/admin/AddStudent";
import {
  Absent,
  ChevronDownIcon,
  DeleteIcon,
  EditIcon,
  EyeIcon,
  Leave,
  Present,
  SearchIcon,
} from "./UI/Icons";
import { users } from "./user.js"; // Your data source

// Assuming your 'users' array looks like this:
// const users = [
//   { id: 1, name: "Alice", email: "alice@example.com", rollNo: "101", department: "CSE", role: "student", status: "active", avatar: "...", team: "A" },
//   { id: 2, name: "Bob", email: "bob@example.com", rollNo: "102", department: "ECE", role: "student", status: "paused", avatar: "...", team: "B" },
//   // ... more users
// ];

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "EMAIL", uid: "email", sortable: true },
  { name: "ROLL NO", uid: "rollNo", sortable: true },
  { name: "DEPARTMENT", uid: "department", sortable: true },
  { name: "ROLE", uid: "role", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

// Simplified status options if needed, or use your original
const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

export function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

// Status color map for the 'STATUS' column chip
const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

// Define colors for row background based on attendance status
const attendanceColorMap = {
  present: "bg-green-100 text-green-800", // Light green background for Present
  absent: "bg-red-100 text-red-800", // Light red background for Absent
  leave: "bg-yellow-100 text-yellow-800", // Light yellow background for Leave
};

export default function TableCmp() {
  const [startAttendace, setStartAttendace] = React.useState(false);
  // State to store attendance status for each user { userId: 'present' | 'absent' | 'leave' | null }
  const [attendance, setAttendance] = React.useState({});
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  console.log(selectedKeys);

  // Default to all columns visible using a Set
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(columns.map((c) => c.uid))
  );
  // Use a Set for multi-select status filter
  const [statusFilter, setStatusFilter] = React.useState(new Set()); // Default to empty Set (means 'all')
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "id", // Default sort by ID
    direction: "ascending",
  });

  // Initialize attendance state properly when starting
  const startAttendaceNow = () => {
    const isStarting = !startAttendace;
    setStartAttendace(isStarting);
    if (isStarting) {
      // Initialize attendance status to null for ALL users when starting
      const initialAttendance = users.reduce((acc, user) => {
        acc[user.id] = null; // Set initial status to null for everyone
        return acc;
      }, {});
      setAttendance(initialAttendance);
      setSelectedKeys(new Set()); // Clear row selections
    } else {
      // Optionally clear the attendance state when stopping,
      // or keep it to show the recorded attendance
      // setAttendance({});
    }
  };
  const [lockedKeys, setLockedKeys] = useState(new Set()); // For locking selection

  const handleSelectionChange = (newSelection) => {
    const newKeys = new Set(newSelection);
    const updated = new Set([...lockedKeys]);

    newKeys.forEach((key) => updated.add(key)); // Lock newly selected ones

    // Prevent deselecting by re-applying locked keys only
    setSelectedKeys(updated);
    setLockedKeys(updated); // Ensure once selected, stays selected
  };

  // Function to update attendance status for a user
  const handleAttendanceChange = React.useCallback((userId, newStatus) => {
    setAttendance((prevAttendance) => {
      // Only update state if the status is actually changing
      if (prevAttendance[userId] === newStatus) {
        return prevAttendance;
      }
      return {
        ...prevAttendance,
        [userId]: newStatus,
      };
    });
  }, []); // Dependencies are empty as it uses setState updater form

  const getRollNumber = (userId) => {
    const student = users.find((user) => user.id === userId);
    if (student) {
      alert(`Roll Number: ${student.rollNo}`);
    } else {
      alert("Student not found");
    }
  };

  const [page, setPage] = React.useState(1);
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    // Handle Set based visibleColumns state
    if (visibleColumns === "all" || visibleColumns.size === columns.length)
      return columns;
    return columns.filter((column) => visibleColumns.has(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    // Search filter
    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.email.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.rollNo.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    // User Status filter (using Set)
    if (statusFilter.size > 0) {
      filteredUsers = filteredUsers.filter((user) =>
        statusFilter.has(user.status)
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter, hasSearchFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    // Slice from the filtered items
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    // Sort the *currently visible page* items
    return [...items].sort((a, b) => {
      // Fallback for potentially missing sort column value
      const first = a[sortDescriptor.column] ?? "";
      const second = b[sortDescriptor.column] ?? "";
      // Basic comparison
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  // Calculate Attendance Counts
  const attendanceCounts = React.useMemo(() => {
    let present = 0;
    let absent = 0;
    let leave = 0;
    // Iterate over the values in the attendance state object
    Object.values(attendance).forEach((status) => {
      if (status === "present") {
        present++;
      } else if (status === "absent") {
        absent++;
      } else if (status === "leave") {
        leave++;
      }
    });
    // Calculate total marked students
    const totalMarked = present + absent + leave;
    // Calculate total students included in the attendance session
    const totalStudents = Object.keys(attendance).length;

    return { present, absent, leave, totalMarked, totalStudents };
  }, [attendance]); // Re-calculate only when attendance state changes

  // Render Cell content dynamically
  const renderCell = React.useCallback(
    (user, columnKey) => {
      const cellValue = user[columnKey];
      // Get the current attendance status for this specific user from state
      const userAttendanceStatus = attendance[user.id];

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{ radius: "full", size: "sm", src: user.avatar }}
              description={user.email}
              name={cellValue}
            >
              {user.email}
            </User>
          );
        case "role":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
              <p className="text-bold text-tiny capitalize text-default-500">
                {user.team}
              </p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize border-none gap-1"
              color={statusColorMap[user.status] || "default"}
              size="sm"
              variant="flat"
            >
              {capitalize(cellValue)}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center justify-start gap-3">
              {startAttendace ? (
                // Render Attendance Icons when attendance is active
                <>
                  <Tooltip content="Present" color="success">
                    <span
                      className={`text-lg text-success cursor-pointer active:scale-95 transition-opacity ${
                        // Dim the icon if the status is NOT 'present' or is null
                        userAttendanceStatus !== "present"
                          ? "opacity-40 hover:opacity-75"
                          : "hover:opacity-75"
                      }`}
                      onClick={() => handleAttendanceChange(user.id, "present")}
                    >
                      <Present />
                    </span>
                  </Tooltip>
                  <Tooltip content="Absent" color="danger">
                    <span
                      className={`text-lg text-danger cursor-pointer active:scale-95 transition-opacity ${
                        // Dim the icon if the status is NOT 'absent' or is null
                        userAttendanceStatus !== "absent"
                          ? "opacity-40 hover:opacity-75"
                          : "hover:opacity-75"
                      }`}
                      onClick={() => handleAttendanceChange(user.id, "absent")}
                    >
                      <Absent />
                    </span>
                  </Tooltip>
                  <Tooltip content="Leave" color="warning">
                    <span
                      className={`text-lg text-warning cursor-pointer active:scale-95 transition-opacity ${
                        // Dim the icon if the status is NOT 'leave' or is null
                        userAttendanceStatus !== "leave"
                          ? "opacity-40 hover:opacity-75"
                          : "hover:opacity-75"
                      }`}
                      onClick={() => handleAttendanceChange(user.id, "leave")}
                    >
                      <Leave />
                    </span>
                  </Tooltip>
                </>
              ) : (
                // Render Normal Action Icons when attendance is inactive
                <>
                  <Tooltip content="View Details">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <EyeIcon onClick={() => alert(`Viewing ${user.name}`)} />
                    </span>
                  </Tooltip>
                  <Tooltip content="Edit user">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <EditIcon onClick={() => alert(`Editing ${user.name}`)} />
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Delete user">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <DeleteIcon
                        onClick={() => alert(`Deleting ${user.name}`)}
                      />
                    </span>
                  </Tooltip>
                  {/* Example: Keep roll number view separate or integrate differently */}
                  {/* <Tooltip content="View Roll No">
                     <span className="text-lg text-primary-500 cursor-pointer active:opacity-50">
                       <SearchIcon onClick={() => getRollNumber(user.id)} />
                     </span>
                   </Tooltip> */}
                </>
              )}
            </div>
          );
        default:
          return cellValue;
      }
    },
    // Include dependencies that renderCell uses
    [startAttendace, attendance, handleAttendanceChange] // Added handleAttendanceChange
  );

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1); // Reset page when rows per page changes
  }, []);

  const onSearchChange = React.useCallback((value) => {
    setFilterValue(value || ""); // Ensure value is string
    setPage(1); // Reset page when search term changes
  }, []);

  // Top Content includes Search, Filters, Actions, and Attendance Counts
  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 p-4 bg-content1 rounded-xl shadow-md">
        {/* Row 1: Search and Actions */}
        <div className="flex flex-wrap justify-between gap-3 items-center">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name, email, roll no..."
            size="sm"
            startContent={<SearchIcon className="text-default-400" />}
            value={filterValue}
            variant="bordered"
            onClear={() => onSearchChange("")}
            onValueChange={onSearchChange}
            classNames={{ inputWrapper: "border-1 border-default-300" }}
          />
          <div className="flex gap-3 flex-wrap items-center">
            <Button
              size="sm"
              variant="flat"
              color={startAttendace ? "danger" : "success"}
              onPress={startAttendaceNow}
              className="font-medium"
            >
              {startAttendace ? "Stop Attendance" : "Start Attendance"}
            </Button>
            {/* Add Student Modal Trigger */}
            <AddStudentModal />
          </div>
        </div>
        {/* Row 2: Filters and Total Users */}
        <div className="flex flex-wrap justify-between gap-3 items-center">
          <div className="flex gap-3 flex-wrap items-center">
            {/* User Status Filter Dropdown */}
            <Dropdown>
              <DropdownTrigger>
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                  className="border-1 border-default-300"
                >
                  User Status{" "}
                  {statusFilter.size > 0 ? `(${statusFilter.size})` : "(All)"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="User Status Filter"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {/* Columns Filter Dropdown */}
            <Dropdown>
              <DropdownTrigger>
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                  className="border-1 border-default-300"
                >
                  Columns ({visibleColumns.size})
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {column.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          {/* Rows per page and Total User Count */}
          <div className="flex gap-4 items-center">
            <span className="text-default-500 text-small">
              Total {users.length} users ({filteredItems.length} matching)
            </span>
            <label className="flex items-center text-default-500 text-small">
              Rows:
              <select
                className="bg-transparent outline-none text-default-500 text-small border-0"
                onChange={onRowsPerPageChange}
                value={rowsPerPage}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </label>
          </div>
        </div>
        {/* Attendance Counts Summary (Conditional) */}
        {startAttendace && (
          <div className="flex flex-wrap gap-4 items-center mt-2 border-t border-divider pt-3">
            <span className="text-small font-semibold text-default-600">
              Attendance Summary:
            </span>
            <Chip color="success" variant="flat" size="sm">
              Present: {attendanceCounts.present}
            </Chip>
            <Chip color="danger" variant="flat" size="sm">
              Absent: {attendanceCounts.absent}
            </Chip>
            <Chip color="warning" variant="flat" size="sm">
              Leave: {attendanceCounts.leave}
            </Chip>
            <Chip color="default" variant="bordered" size="sm">
              Marked: {attendanceCounts.totalMarked} /{" "}
              {attendanceCounts.totalStudents}
            </Chip>
          </div>
        )}
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    users.length,
    filteredItems.length,
    startAttendace,
    startAttendaceNow,
    rowsPerPage,
    attendanceCounts, // Dependency added
  ]);

  // Bottom Content includes Pagination and Selection Info
  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {/* Selection info only relevant if attendance is started and selection mode is active */}
          {startAttendace &&
            selectedKeys instanceof Set &&
            (selectedKeys.size === filteredItems.length // Check if all *filtered* items selected
              ? "All matching selected"
              : `${selectedKeys.size} of ${filteredItems.length} selected`)}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          {/* Potential actions on selection could go here */}
        </div>
      </div>
    );
  }, [selectedKeys, page, pages, filteredItems.length, startAttendace]);

  // Function to get row class name based on attendance status
  // This function is responsible for applying the background color
  const getRowClassName = React.useCallback(
    (userId) => {
      // Only apply class if attendance started and status is set for this user
      if (startAttendace && attendance[userId]) {
        return `${
          attendanceColorMap[attendance[userId]] || ""
        } transition-colors duration-200`;
      }
      // Default hover effect or no specific class if not in attendance mode
      // return "hover:bg-default-100 transition-colors duration-200"; // Keep default hover if desired
      return ""; // Return empty string if no attendance status applies for clarity
    },
    [startAttendace, attendance]
  ); // Dependencies: attendance state and startAttendace flag

  // Memoized class names for table elements
  const classNames = React.useMemo(
    () => ({
      // Use wrapper from HeroUI/NextUI for consistent styling
      wrapper: ["rounded-xl", "shadow-md", "border", "border-divider"],
      // You can override specific element classes if needed:
      // th: ["bg-default-100", "text-default-600", "border-b", "border-divider", "text-sm", "font-semibold"],
      // td: ["py-3", "text-sm", "border-b", "border-divider"],
      // emptyWrapper: ["h-40", "flex", "items-center", "justify-center"],
    }),
    []
  );

  return (
    <Table
      aria-label="Student Attendance Table"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={classNames} // Apply custom class names
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      // Selection handled based on startAttendace state
      selectedKeys={startAttendace ? selectedKeys : new Set()}
      selectionMode={startAttendace ? "multiple" : "none"}
      onSelectionChange={startAttendace ? handleSelectionChange : undefined}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={"No students found matching the criteria."}
        items={sortedItems} // Use sortedItems which are based on current page
      >
        {(item) => (
          <TableRow
            key={item.id}
            className={getRowClassName(item.id)} // Apply dynamic row class name based on attendance state
          >
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
