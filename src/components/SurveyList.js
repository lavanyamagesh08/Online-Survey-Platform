import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SurveyList() {
  const [surveys, setSurveys] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/surveys') // Correct API URL
      .then((res) => {
        setSurveys(res.data); // Set surveys from the response
      })
      .catch((err) => {
        console.error("Error fetching surveys:", err);
        setError(err); // Capture any error
      });
  }, []);

  return (
    <div>
      <h2>All Surveys</h2>
      {error && <p>Error: {error.message}</p>}
      {surveys.length === 0 ? (
        <p>No surveys available</p>
      ) : (
        <ul>
          {surveys.map((survey, index) => (
            <li key={index}>
              <h3>{survey.title}</h3>
              <p><strong>Created By:</strong> {survey.createdBy}</p>
              <ul>
                {survey.questions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SurveyList;
