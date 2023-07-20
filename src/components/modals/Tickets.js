import React from "react";

const Tickets = ({ cart, setCart, setTickets, setOpenCalendar , setSelectedDate }) => {
    const clearCart = ()=>{
        setCart([])
        setTickets(false)
        setOpenCalendar(false)
        setSelectedDate("")
    }
    return (
        <div className="tickets-list">
            <div className="tickets">
                {cart.map((item) => (
                    <span>{item.date} {item.time}</span>
                ))}
            </div>
            <div className="btn-controls">
                <button onClick={()=>setTickets(false)}>Close</button> <button onClick={clearCart}>Clear Cart</button>
            </div>
        </div>
    )
}
export default Tickets