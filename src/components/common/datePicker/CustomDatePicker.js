import React, { useState } from 'react';
import './CustomDatePicker.css';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CustomDatePicker = ({ setSelectedDate }) => {


  const renderCalendar = () => {

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthYear = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.toLocaleString('default', { year: 'numeric' });
    console.log(monthYear, " ", year, " getting month and year")
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const days = [];
    for (let i = 0; i < weekdays.length; i++) {

      days.push({
        type: "weekday",
        value: weekdays[i],
        active: false
      });
    }

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push({ type: "day", value: "", active: false });
    }

    let date = new Date()
    for (let i = 1; i <= lastDay.getDate(); i++) {
      if (i < currentDate.getDate()) {
        days.push({ type: "past-day", value: i, active: false })
      }
      else if (i === currentDate.getDate() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()) {
        days.push({ type: "current-day", value: i, active: false })
      }
      else {
        const classVal = getDayOfWeekFromNumber(currentDate.getFullYear(), currentDate.getMonth(), i)
        days.push({ type: classVal, value: i, active: false })
      }
    }
    function getDayOfWeekFromNumber(year, month, day) {
      const date = new Date(year, month, day);
      const dayNum = date.getDay();
      if (dayNum === 0 || dayNum === 6) {
        return "holiday";
      }

      return "day";
    }


    console.log(days, "days")
    return (
      <div className="calendar">
        <div className="header">
          <div className='month-container'>
            <h3 id="monthYear">{monthYear}</h3>
            <div className='contols'>
              <ExpandLessIcon onClick={previousMonth} />
              <ExpandMoreIcon onClick={nextMonth} />
            </div>

          </div>
          <div className='year-container'>
            <h3 id="year">{year}</h3>
            <div className='contols'>
              <ExpandLessIcon onClick={previousYear} />
              <ExpandMoreIcon onClick={nextYear} />
            </div>
          </div>
        </div>
        <div className="weekdays">{days.map((item, i) => (
          <div key={item.type + i} className={item.type} onClick={() => pickDate(item.value)}>{item.value}</div>
        ))}</div>
      </div>
    );
  };

  const [currentDate, setCurrentDate] = useState(new Date());

  const pickDate = (datePicked) => {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), datePicked))
    console.log(currentDate, "picked date")
  }
  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const previousYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 12));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const nextYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 12));
  };

  return (
    <div className="date-picker-cal">
      {renderCalendar()}
    </div>
  );
};

export default CustomDatePicker;
