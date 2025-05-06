import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TakeSurvey = () => {
  const { id } = useParams(); // Extract survey ID from the URL
  const [survey, setSurvey] = useState(null);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const fetchSurvey = async () => {
      const res = await fetch(`http://localhost:5000/surveys/${id}`);
      const data = await res.json();
      setSurvey(data);
    };

    fetchSurvey();
  }, [id]);

  const handleResponseChange = (questionId, answer) => {
    setResponses({ ...responses, [questionId]: answer });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/surveys/${id}/responses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(responses),
    });

    if (res.ok) {
      alert("Responses submitted successfully!");
    } else {
      alert("Error submitting responses");
    }
  };

  if (!survey) return <div>Loading...</div>;

  return (
    <div>
      <h2>{survey.title}</h2>
      <p>{survey.description}</p>
      <form onSubmit={handleSubmit}>
        {survey.questions.map((question) => (
          <div key={question.id}>
            <label>{question.text}</label>
            <input
              type="text"
              value={responses[question.id] || ""}
              onChange={(e) => handleResponseChange(question.id, e.target.value)}
            />
          </div>
        ))}
        <button type="submit">Submit Responses</button>
      </form>
    </div>
  );
};

export default TakeSurvey;
