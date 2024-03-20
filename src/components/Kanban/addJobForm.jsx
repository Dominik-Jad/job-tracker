import { React, useState } from "react";
const AddJobForm =  ({onAdd}) => {
  const [userInput, setUserInput] = useState({
    title: "",
    company:  "",
    location: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserInput({
      title: "hello",
      company: "world",
      location: "earth",
    });
    onAdd(userInput);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Job Title"
        value={userInput.title}
        onChange={(e) => setUserInput({ ...userInput, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Company"
        value={userInput.company}
        onChange={(e) => setUserInput({ ...userInput, company: e.target.value })}
      />
      <input
        type="text"
        placeholder="Location"
        value={userInput.location}
        onChange={(e) => setUserInput({ ...userInput, location: e.target.value })}
      />
      <button type="submit">Add Job</button>
    </form>
  );
};
export default AddJobForm;





