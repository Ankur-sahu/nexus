import './App.css';
import { Box, Typography, styled } from "@mui/material";
import moment from 'moment';
import yogaCover from './assets/images/yoga.png'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CustomDatePicker from './components/common/datePicker/CustomDatePicker';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useState } from 'react';

const Heading = styled(Typography)`
  font-size: 20px;
  font-weight: 700;
  color: #4c4436;
`;

const SubHeading = styled(Typography)`
  font-size: 16px;
  color: #b1b2b5;
`;

const Ticket = styled(Box)`
  width: 49%;
  height: 40px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #7481ea;
  border: 1px solid #879cee;
  border-radius: 5px;
`;

function App() {
  const startTime = moment().add(1, 'hour').format('ddd, MMMM D, YYYY h:mm A');
  const endTime = moment().add(2, 'hour').format('ddd, MMMM D, YYYY h:mm A');
  const [cart, setCart] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [openCalendar, setOpenCalendar] = useState(false);

  const addToCart = (sessionTime) => {
    setCart([...cart, { date: moment(selectedDate).format('YYYY-MM-DD'), time: sessionTime }]);
  };

  return (
    <main>
      <div className="left-container">
        <Heading>Yoga at the Art Studio</Heading>
        <SubHeading>{startTime} - {endTime}</SubHeading>
        <div className='price-and-quantity-container'>
          <div className='price'>
            <Typography variant='h4' sx={{ fontSize: '26px', fontWeight: "bold" }}>
              Yoga Tickets
            </Typography>
            <Typography variant='h4' sx={{ fontSize: '26px', fontWeight: "bold" }}>
              $25.00
            </Typography>
            <SubHeading>Sales end on {moment().format('ddd, MMMM D, YYYY')}</SubHeading>
          </div>
          <div className='quantity-container'>
            <div className='align-content-space quantity'>{cart.length}  <ExpandMoreIcon sx={{ color: '#b1b2b5' }} /></div>
          </div>
        </div>
        <div className='slot-container'>
          <div className='date-container'>
            <div className='align-content-space date-picker' onClick={() => setOpenCalendar(!openCalendar)}>
              <SubHeading>{selectedDate ? moment(selectedDate).format('YYYY-MM-DD') : "Choose a slot"}</SubHeading>
              <CalendarMonthIcon />
            </div>
            {openCalendar && <CustomDatePicker setSelectedDate={setSelectedDate} />}
          </div>

          {selectedDate && (
            <div className='time-slot'>
              <div className='align-content-space'>
                {moment(selectedDate).format('dddd, MMMM D')}
                <span>
                  <NavigateBeforeIcon sx={{ backgroundColor: '#b1b2b5', borderRadius: '50%' }} />
                  <NavigateNextIcon sx={{ backgroundColor: '#b1b2b5', borderRadius: '50%' }} />
                </span>
              </div>
              <div className='available-time'>
                {["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM"].map((time) => (
                  <Ticket key={time} onClick={() => addToCart(time)}>
                    <h4>{time}</h4>
                    <h6>Only 6 left</h6>
                  </Ticket>
                ))}
              </div>
              <div>
                <h6><AccessTimeIcon /> America/newyork(01:07 AM) <ArrowDropDownIcon /></h6>
              </div>
            </div>
          )}
        </div>
        <div className='left-footer-container'>
          <div className='left-footer'>
            <button className={cart.length > 0 ? 'submit-btn' : 'submit-disabled'}>Continue</button>
          </div>
        </div>
      </div>
      <div className="right-container">
        <img src={yogaCover} alt='yoga-pic' />
        <div className='cart'>
          {!(cart.length > 0) ?
            <>
              <ShoppingCartOutlinedIcon />
              <span>Cart is empty!</span>
            </>
            :
            <>
              <div className='cart-items'>
                {cart.map((item, index) => (
                  <div key={index} className='cart-list-item'>
                    <span>
                      {item.date} {item.time}
                    </span>
                    <span >
                      $25.00
                    </span>
                  </div>
                ))}
              </div>
              <div className='cart-total'>Your Total is :  ${25 * cart.length}</div>
            </>
          }
        </div>
      </div>
    </main>
  );
}

export default App;
