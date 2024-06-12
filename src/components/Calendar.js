import React, {useState} from "react";
import './Calendar.css'
import { format , eachDayOfInterval , endOfMonth , startOfMonth , getDay, addMonths, subMonths} from "date-fns"


const Weekdays = ["Domingo", "Lunes", "Martes", "Mie", "Jue", "Viernes", "Sabado"];

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const firstDay = startOfMonth(currentDate);
    const lastDay = endOfMonth(currentDate);

    const daysOfMonth =eachDayOfInterval({
        start: firstDay,
        end: lastDay,
    });
    const startingDay = getDay(firstDay);

    const [notes, setNotes] = useState({});

    const handleNoteChange = (date,event) => {
        const { value } = event.target;
        setNotes(prevNotes => ({
            ...prevNotes,
            [date] : value
        }));
    };

    const handleNext = () => {
        setCurrentDate(prevDate => addMonths(prevDate, 1));
    };

    const handlePrevious = () => {
        setCurrentDate(prevDate => subMonths(prevDate, 1))
    }

    let displayDays = daysOfMonth.length;
    if ((startingDay === 5 || startingDay === 6) && daysOfMonth.length === 31) {
        displayDays = 29
    } if (startingDay === 6 && daysOfMonth.length === 30) {
        displayDays = 29
    } else {
        
    }

    return(
        <div className="container">
            <h2>{format(currentDate, "MMMM yyyy")}</h2>
            <div className="grid">
                {Weekdays.map((day) => {
                    return (<div key={day} className="week"></div>);
                })}
                {Array.from({length: startingDay}).map((_, index) => {
                    return <div key={`empty-${index}`}></div>
                })}
                {daysOfMonth.slice(0, displayDays).map((day, index) => {
                    const formatteDate= format(day, "yyyy-MM-dd");
                    return (
                        <div key={index} className="days">
                            <div>{format(day, "d")}</div>
                            <textarea
                                type="text"
                                value={notes[formatteDate] || ""}
                                onChange={(event) => handleNoteChange(formatteDate, event)}
                                rows={3}
                            />
                        </div>
                    );
                })}
            </div>
            <button onClick={handlePrevious}>Previous Month</button>
            <button onClick={handleNext}>Next Month</button>
        </div>
    );
};


export default Calendar