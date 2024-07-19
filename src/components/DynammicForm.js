import React, { useState, useEffect } from 'react';
import FormField from './FormField';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const DynamicForm = () => {
  const [fields, setFields] = useState([]);
  const [formName, setFormName] = useState('');
  const [savedForms, setSavedForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState('');

  const navigate = useNavigate();

  useEffect(() => { //used for performing side effects, since there is an empty dependency array, the component is rendered only once
    const savedFormsData = JSON.parse(localStorage.getItem('savedForms')) || []; 
    setSavedForms(savedFormsData);
  }, []);

  const handleFieldChange = (e, index) => {
    const { name, value, type, checked } = e.target; 
    const updatedFields = [...fields];
    updatedFields[index][name] = type === 'checkbox' ? checked : value; //Updates the field at the specified index with the new value or checked state
    setFields(updatedFields);
  };

  const handleAddRow = () => {
    setFields([...fields, { name: '', type: 'String', mandatory: false, options: '' }]);
  };

  const handleDelete = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  const handleSaveJSON = () => {
    const json = JSON.stringify(fields);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formName}.json`;
    a.click();
  };

  const handleLoadJSON = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const loadedFields = JSON.parse(event.target.result);
      setFields(loadedFields);
    };
    fileReader.readAsText(e.target.files[0]);
  };

  const handleGenerateForm = () => {
    if (formName) {
      const savedFormsData = [...savedForms, { name: formName, fields }];
      localStorage.setItem('savedForms', JSON.stringify(savedFormsData));
      setSavedForms(savedFormsData);
      alert('Form generated successfully!');
      navigate(`/form/${formName}`);
    } else if (selectedForm) {
      navigate(`/form/${selectedForm}`);
    } else {
      alert('Please enter a form name or select an existing form.');
    }
  };

  return (
    <div className="container">
      <h1>Dynamic Form Generator</h1>
      <input
        type="text"
        placeholder="Form Name"
        value={formName}
        onChange={(e) => setFormName(e.target.value)}
        required
      />
      <table>
        <thead>
          <tr>
            <th>Field Name</th>
            <th>Field Type</th>
            <th>Mandatory</th>
            <th>Options</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => (
            <FormField
              key={index}
              field={field}
              index={index}
              handleFieldChange={handleFieldChange}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
      <button type="button" onClick={handleAddRow}>Add Row</button>
      <button type="button" onClick={handleSaveJSON}>Save JSON</button>
      <input type="file" accept="application/json" onChange={handleLoadJSON} />
      <button type="button" onClick={handleGenerateForm}>Generate Form</button>
      
      <h2>Load an existing form</h2>
      <select
        value={selectedForm}
        onChange={(e) => setSelectedForm(e.target.value)}
      >
        <option value="">Select a form</option>
        {savedForms.map((form, index) => (
          <option key={index} value={form.name}>{form.name}</option>
        ))}
      </select>
      <button type="button" onClick={handleGenerateForm}>Load Selected Form</button>
    </div>
  );
};

export default DynamicForm;
