import React, { useState } from "react";
import axios from "axios";

const CreateSurvey = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([""]);
  const [createdBy, setCreatedBy] = useState("");
  const [message, setMessage] = useState("");
  const [survey, setSurvey] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/surveys/create", {
        title,
        questions,
        createdBy,
      });

      if (response.status === 201) {
        setMessage("Survey created successfully!");
        setSurvey(response.data.survey);
        setTitle("");         // Clear form after successful submit
        setQuestions([""]);   // Reset questions input
        setCreatedBy("");     // Clear 'created by' field
      }
    } catch (error) {
      setMessage("Error creating survey. Please try again.");
    }
  };

  // Handle change in each question
  const handleQuestionChange = (e, index) => {
    const newQuestions = [...questions];
    newQuestions[index] = e.target.value;
    setQuestions(newQuestions);
  };

  // Add a new question input field
  const handleAddQuestion = () => {
    setQuestions([...questions, ""]);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
      <h1 style={{ textAlign: "center" }}>Create a Survey</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "8px" }}>Survey Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "8px" }}>Questions:</label>
          {questions.map((question, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <input
                type="text"
                value={question}
                onChange={(e) => handleQuestionChange(e, index)}
                required
                style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddQuestion}
            style={{
              padding: "8px 16px",
              border: "1px solid #4CAF50",
              backgroundColor: "#4CAF50",
              color: "white",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Add Question
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "8px" }}>Created By:</label>
          <input
            type="text"
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
            required
            style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            border: "1px solid #4CAF50",
            backgroundColor: "#4CAF50",
            color: "white",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Create Survey
        </button>
      </form>

      {message && <p style={{ textAlign: "center", color: message.includes("Error") ? "red" : "green" }}>{message}</p>}

      {survey && (
        <div style={{ marginTop: "20px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#fff" }}>
          <h2>Created Survey:</h2>
          <p><strong>Title:</strong> {survey.title}</p>
          <p><strong>Questions:</strong></p>
          <ul>
            {survey.questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
          <p><strong>Created By:</strong> {survey.createdBy}</p>
        </div>
      )}
    </div>
  );
};

export default CreateSurvey;
