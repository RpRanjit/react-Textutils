import React from "react";
import { useState } from "react";

const TextForm = (props) => {
  const [text, setText] = useState("");
  const [date, setDate] = useState([]);

  const handleOnChange = (event) => {
    // console.log("On Change");
    setText(event.target.value);
  };

  const handleUpChange = () => {
    // console.log("Converted to Uppercase." + text);
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert('Each character is changed to UpperCase.','success');
  };

  const handleLoChange = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert('Each character is changed to LowerCase.','success');
  };

  const handleClearChange = () => {
    setText("");
    setDate([]);
    if(!text){
      props.showAlert('No Text to clear.','warning');
    }
    else{
      props.showAlert('Text From is clear.','success');
    }
  };

  const extractDate = () => {
    let dateRegex =
      /\b(?:\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\d{4}[/-]\d{1,2}[/-]\d{1,2}|\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s\d{1,2},?\s\d{2,4}|\b\d{1,2}\s(?:January|February|March|April|May|June|July|August|September|October|November|December}\s\d{4})\b)/g;
    let extractedDates = text.match(dateRegex);
    // console.log("Extracted Dates: ", extractedDates); // Debug log
    setDate(extractedDates || []);
    if(!extractedDates){
      props.showAlert('There is no Date to be extracted from Textarea.','warning');
    }
    else{
      props.showAlert('Every Date is extracted from Textarea.','success');
    }
  };

  const highlightDates = (text) => {
    if (date.length === 0) return text; // Return original text if no dates
    const dateRegex = new RegExp(`(${date.join("|")})`, "g"); // Create a regex from the extracted dates
    return text.split(dateRegex).map((part, index) =>
      date.includes(part) ? (
        <span key={index} style={{ backgroundColor: "Green" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <>
      <div className="conatiner" style={{color: props.mode==='dark'? 'white':'black'}}>
        <h2>{props.heading}</h2>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            id="exampleFormControlTextarea1"
            style ={{backgroundColor: props.mode==='light'? 'dark':'light', color: props.mode ==='dark'?'gery':'light'}}
            rows="6"
          ></textarea>
        </div>
        <button className="btn btn-primary mx-2" onClick={handleUpChange}>
          Convert to Uppercase
        </button>
        <button className="btn btn-primary mx-2" onClick={handleLoChange}>
          Convert to Lowercase
        </button>
        <button className="btn btn-primary mx-2" onClick={handleClearChange}>
          Clear Texts
        </button>
        <button className="btn btn-primary mx-2" onClick={extractDate}>
          Extract Dates
        </button>
      </div>
      <div className="container my-3" style={{color: props.mode==='dark'? 'white':'black'}}>
        <h3>Your text Summary</h3>
        <p>
          {text.split(" ").length-1} words and {text.length} characters
        </p>
        <p>{0.008 * text.split(" ").length} Minutes read</p>
        <h3>Preview</h3>
        <p>{highlightDates(text.length>0 ? text : "Enter Text First:")}</p> {/* Highlighted text preview */}{" "}
        <h3>Extracted Dates:</h3>
        <ul>
          {date.map((date, index) => (
              <li key={index}>{date}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TextForm;
