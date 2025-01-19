# College Appointment System API

This project enables students to book appointments with professors. Professors can specify their availability, and students can view available time slots and book appointments. The system also supports user authentication for both students and professors. It allows professors to manage their appointments, and students can check the status of their appointments.

## Table of Contents
1. [API Endpoints](#api-endpoints)
2. [Database Schema](#database-schema)
3. [E2E Automated Test](#e2e-automated-test)
4. [Technologies Used](#technologies-used)

---

## API Endpoints

1. **POST /api/v1/login**
  
2. **GET /api/v1/student/appointments/slots/:professorId**


3. **POST /api/v1/student/appointments/book**
   

4. **GET /api/v1/student/appointments/status**
   
5. **POST /api/v1/professor/appointments/slots**
   

### Appointment Management
6. **PATCH /api/v1/professor/appointments/:appointmentId**
   
   

---

## Database Schema

### **Student**
- **_id**: Unique identifier for each student.
- **name**: Full name of the student.
- **email**: Email address of the student.
- **password**: Hashed password for the student.

### **Professor**
- **_id**: Unique identifier for each professor.
- **name**: Full name of the professor.
- **email**: Email address of the professor.
- **password**: Hashed password for the professor.

### **Appointment**
- **_id**: Unique identifier for each appointment.
- **status**: Current status of the appointment (e.g., "Booked", "Cancelled").
- **professorId**: The ID of the professor for the appointment.
- **studentId**: The ID of the student for the appointment.
- **slot**: The time slot for the appointment.

---

## E2E Automated Test

### **Test Case**: Booking an Appointment for a Student

We will write an E2E test case that simulates the entire process from student authentication to booking an appointment.

### **Test Case Scenario**:
1. **Authenticate as Student A1**.
2. **Authenticate as Professor P1**.
3. **Professor P1 specifies available slots**.
4. **Student A1 views available slots for Professor P1**.
5. **Student A1 books an appointment for time slot T1**.
6. **Student A1 checks their appointment status**.



