import React from 'react';
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import questionaire from '../data/questionnaire.json';

export default function Questions() {
    const [submitted, setSubmitted] = useState(false);

    const [formAnswers, setFormAnswers] = useState([]);

    function Form(){
        const items = questionaire.item;
        const [inputs, setInputs] = useState({});
      
        const allergy = items.find(item => item.linkId == "1");
        const gender = items.find(item => item.linkId == "2");
        const dob = items.find(item => item.linkId == "3");
        const cob = items.find(item => item.linkId == "4");
        const marStat = items.find(item => item.linkId == "5");
        const smoke = items.find(item => item.linkId == "6");
        const drink = items.find(item => item.linkId == "7");
    
        const genderOptions = gender.option.map(gender => 
        {
          const option = gender.valueCoding;
          return (
            <option key={option.code} value={option.code}>{option.display}</option>
          );
        });
        const marOptions = marStat.option.map(stat => 
        {
          const option = stat.valueCoding;
          return (
            <option key={option.code} value={option.code}>{option.display}</option>
          );
        });
    
        const onChange = (event) =>{
            const name = event.target.name;
            const value = event.target.value;
            setInputs(values => ({...values, [name]: value }))
        };
    
        const onSubmit = (event) =>{
            event.preventDefault();
            const inputList = Object.entries(inputs);
            setFormAnswers([inputList.map(input =>{
                return (<li style={{listStyleType: "none"}} key={input[0]}><h3>{input[0]}: {input[1]}</h3></li>);
            })]);
            setSubmitted(true);
            
        };
    
        const timeChange = (date) =>{
            setInputs(values => ({...values, "dob": date.toString()}))
            setStartDate(date);
        };
    
        const [startDate, setStartDate] = useState(new Date());
        return(
            <div>
            <h1>Form</h1>
            <form onSubmit={onSubmit}>
                <div>
                <label htmlFor={allergy.itemId}>{allergy.text} </label>
                <div name="allergies" onChange={onChange}>
                    <label htmlFor="allergies-true">True</label>
                    <input type="radio" value="true" name="allergies" onChange={onChange}/>
                    <label htmlFor="allergies-false">False</label>
                    <input type="radio" value="false" name="allergies" onChange={onChange}/>  <br/>
                </div>
                <br/>
                </div>
                <div>
                <label htmlFor={gender.itemId}>{gender.text}</label>
                <div>
                    <select name="genders" id="genders" onChange={onChange}>{genderOptions}</select>
                </div>
                <br />
                </div>
                <div>
                <label htmlFor={dob.itemId}>{dob.text}</label>
                <div>
                    <DatePicker  selected={startDate} onChange={(date, event) => timeChange(date, event)}/>
                </div>
                <br />
                <br />
                </div>
                <div>
                <label htmlFor={cob.itemId}>{cob.text}</label>
                <div>
                    <input type="text" htmlFor="cob" name="cob" onChange={onChange}></input><br />
                </div>
                <br />
                </div>
                <div>
                <label htmlFor={marStat.itemId}>{marStat.text}</label> 
                <div>
                    <select name="mar-stat" id="mar-stat" onChange={onChange}>{marOptions}</select><br />
                </div>
                <br />
                </div>
                <div>
                <label htmlFor={smoke.itemId}>{smoke.text}</label>
                <div name="smoke" onChange={onChange}>
                    <label htmlFor="smoke-true">True</label>
                    <input type="radio" value="true" name="smoke"/>
                    <label htmlFor="smoke-false">False</label>
                    <input type="radio" value="false" name="smoke"/>  <br/>
                </div>
                <br />
                </div>
                <div>
                <label htmlFor={drink.itemId}>{drink.text}</label>
                <div name="drink" onChange={onChange}>
                    <label htmlFor="drink-true">True</label>
                    <input type="radio" value="true" name="drink"/>
                    <label htmlFor="drink-false">False</label>
                    <input type="radio" value="false" name="drink"/>  <br/>
                </div>
                <br />
                </div>
                <input type="submit"/>
            </form>    
            </div>
        )
    }

    function Answers(){
        return(
        <>
            <h1>Answers</h1>
            {formAnswers}
        </>
        )
    }

    return(
        <div>
          {submitted ? <Answers /> : <Form />}
        </div>
    );
}

