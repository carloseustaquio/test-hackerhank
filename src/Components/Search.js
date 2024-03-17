import React, { useState } from "react";
import { STUDENTS } from "../studentsList";
import { useResidents } from "../providers/ResidentsProvider";

// `joiningDate` && `validityDate` format "yyyy-mm-dd"
function checkValidity(joiningDate, validityDate) {
  const [year, month, day] = joiningDate.split("-");
  const [yyyy, mm, dd] = validityDate.split("-");
  const maxValid = new Date(yyyy, mm - 1, dd);
  const selected = new Date(year, month - 1, day);
  return maxValid >= selected;
}

function checkStudentExists(studentName) {
  return STUDENTS.find(
    (student) =>
      student.name.toLocaleLowerCase() === studentName.toLocaleLowerCase()
  );
}

const SEARCH_INITIAL_STATE = {
  studentName: "",
  joiningDate: "",
};

function Search() {
  const { handleAddResident, setError } = useResidents();
  const [formState, setFormState] = useState(SEARCH_INITIAL_STATE);

  const handleChange = (name) => (e) => {
    setFormState({ ...formState, [name]: e.target.value });
  };

  const handleSubmit = () => {
    const { studentName, joiningDate } = formState;
    const student = checkStudentExists(studentName);
    if (!student) {
      setError(`Sorry, ${studentName} is not a verified student!`);
      return;
    }

    const isValidDate = checkValidity(joiningDate, student.validityDate);
    if (!isValidDate) {
      setError(`Sorry, ${studentName}'s validity has Expired!`);
      return;
    }

    handleAddResident(student);
    setFormState(SEARCH_INITIAL_STATE);
  };

  return (
    <div className="my-50 layout-row align-items-end justify-content-end">
      <label htmlFor="studentName">
        Student Name:
        <div>
          <input
            id="studentName"
            data-testid="studentName"
            type="text"
            className="mr-30 mt-10"
            onChange={handleChange("studentName")}
          />
        </div>
      </label>
      <label htmlFor="joiningDate">
        Joining Date:
        <div>
          <input
            id="joiningDate"
            data-testid="joiningDate"
            type="date"
            className="mr-30 mt-10"
            onChange={handleChange("joiningDate")}
          />
        </div>
      </label>
      <button
        type="button"
        data-testid="addBtn"
        className="small mb-0"
        onClick={handleSubmit}
      >
        Add
      </button>
    </div>
  );
}

export default Search;
