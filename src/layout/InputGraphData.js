import React, {useState } from 'react'
import axios from "axios";
const InputGraphData = () => {
    const [value, setGraphvalue] = useState('')
    const onChange = e => setGraphvalue(e.target.value);
    const onSubmit = async e => {
        e.preventDefault();
        await axios.post('https://localhost:7059/api/Graph/SaveGraphValue', {
            value
        })
        .then(function (response) {
       
        })
        .catch(function (error) {
            console.log(error)
        });
        
    }
  return (
    <div>
         <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Add Value</label>
                    <input type="text" name="graphvalue" value={value} onChange={onChange} />
                </div> 
                <input type="submit" value="add value" className="btn btn-dark"/>       
            </form>
    </div>
  )
}

export default InputGraphData