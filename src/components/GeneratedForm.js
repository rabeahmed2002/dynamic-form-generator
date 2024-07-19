import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const GeneratedForm = () => {
  const { formName } = useParams();
  const [formData, setFormData] = useState({});
  const [formFields, setFormFields] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const savedForms = JSON.parse(localStorage.getItem('savedForms')) || [];
    const selectedForm = savedForms.find(form => form.name === formName);
    if (selectedForm) {
      setFormFields(selectedForm.fields);
      const savedSubmissions = JSON.parse(localStorage.getItem(`${selectedForm.name}_submissions`)) || [];
      setSubmissions(savedSubmissions);
    }
  }, [formName]);

  const handleChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const updatedData = { ...formData };
    updatedData[name] = type === 'checkbox' ? checked : value;
    setFormData(updatedData);
  };

  const handleSave = () => {
    const savedSubmissions = [...submissions, formData];
    localStorage.setItem(`${formName}_submissions`, JSON.stringify(savedSubmissions));
    setSubmissions(savedSubmissions);
    alert('Form submission saved!');
  };

  if (formFields.length === 0) {
    return <div>Loading form...</div>;
  }

  return (
    <div className="container">
      <h1>{formName}</h1>
      <form>
        {formFields.map((field, index) => (
          <div className="form-control" key={index}>
            <label class='label-div'>{field.name}</label>
            {field.type === 'String' && <input type="text" name={field.name} onChange={(e) => handleChange(e, index)} />}
            {field.type === 'Number' && <input type="number" name={field.name} onChange={(e) => handleChange(e, index)} />}
            {field.type === 'Dropdown' && (
              <select name={field.name} onChange={(e) => handleChange(e, index)}>
                {field.options.split(',').map((option, i) => (
                  <option key={i} value={option}>{option}</option>
                ))}
              </select>
            )}
            {field.type === 'Boolean' && <input type="checkbox" name={field.name} onChange={(e) => handleChange(e, index)} />}
            {field.type === 'Date' && <input type="date" name={field.name} onChange={(e) => handleChange(e, index)} />}
            {field.mandatory && ''}
          </div>
        ))}
      </form>
      <button type="button" onClick={handleSave}>Save</button>

      <div className="submissions">
        <h2>Last 10 Submissions</h2>
        <ul>
          {submissions.slice(-10).map((submission, i) => (
            <li key={i}>{JSON.stringify(submission)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GeneratedForm;
