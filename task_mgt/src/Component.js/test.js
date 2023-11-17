const today = new Date();
const formattedDate = today.toISOString().slice(0, 10);

const date1= new Date(formattedDate)
const date2 = new Date("2023-11-16");

console.log(date1.getTime()<date2.getTime())