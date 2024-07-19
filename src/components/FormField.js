import React from 'react';
import '../App.css';

const FormField = ({ field, index, handleFieldChange, handleDelete }) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          name="name"
          value={field.name}
          onChange={(e) => handleFieldChange(e, index)}
          required
        />
      </td>
      <td>
        <select
          name="type"
          value={field.type}
          onChange={(e) => handleFieldChange(e, index)}
        >
          <option value="String">String</option>
          <option value="Number">Number</option>
          <option value="Dropdown">Dropdown</option>
          <option value="Boolean">True/False</option>
          <option value="Date">Date</option>
        </select>
      </td>
      <td>
        <input
          type="checkbox"
          class='checkbox'
          name="mandatory"
          checked={field.mandatory}
          onChange={(e) => handleFieldChange(e, index)}
        />
      </td>
      <td>
        <input
          type="text"
          name="options"
          value={field.options}
          onChange={(e) => handleFieldChange(e, index)}
          disabled={field.type !== 'Dropdown'}
        />
      </td>
      <td>
        <button type="button" onClick={() => handleDelete(index)}>Delete</button>
      </td>
    </tr>
  );
};

export default FormField;
