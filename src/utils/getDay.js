function getDayOfWeekFromNumber(number) {
    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date();
    date.setDate(date.getDate() + number);
    return dayOfWeek[date.getDay()];
  }
export default getDayOfWeekFromNumber