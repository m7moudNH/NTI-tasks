let bookedSlots=[];
function bookAppointment(appointmentDetails , bookedSlots) {
    return new Promise((resolve, reject) => {
        if(appointmentDetails.slot === "a1" || appointmentDetails.slot === "b3" || bookedSlots.includes(appointmentDetails.slot)){
            reject("Slot is not available");
        }
        else{
            setTimeout(() => {
                resolve("Appointment booked successfully");
                bookedSlots.push(appointmentDetails.slot);
            },1000);
        }
    });
}
bookAppointment({slot: "a1"}, bookedSlots).then((message) => {
    console.log(message);
}).catch((error) => {
    console.log(error);
})
.finally(() => {
    console.log(bookedSlots);
});