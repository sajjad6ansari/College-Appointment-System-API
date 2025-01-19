# College Appointment System API

This project enables students to book appointments with professors. Professors can specify their availability, and students can view available time slots and book appointments. The system also supports user authentication for both students and professors. It allows professors to manage their appointments, and students can check the status of their appointments.


---

### `API Documentation`

```markdown
# API Documentation
This API provides a set of endpoints for managing appointments between students and professors. It allows students to authenticate, view available time slots, book appointments, and professors to manage and cancel appointments.



```

## Authentication
All requests require authentication using a JWT (JSON Web Token) that must be passed in the **Authorization** header.

Example:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Endpoints

### 1. **POST /auth/login**
#### Description:
Authenticates a user (either student or professor) and returns a JWT token.

#### Request:
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "userpassword"
  }
  ```

#### Response:
- **200 OK**:
  ```json
  {
    "token": "YOUR_JWT_TOKEN"
  }
  ```

---

### 2. **POST /professor/time-slots**
#### Description:
Professor can set their available time slots for appointments.

#### Request:
- **Body**:
  ```json
  {
    "timeSlots": [
      "2025-01-20T10:00:00",
      "2025-01-20T14:00:00"
    ]
  }
  ```

#### Response:
- **200 OK**:
  ```json
  {
    "message": "Time slots set successfully"
  }
  ```

---

### 3. **GET /student/appointments**
#### Description:
Student can view available appointments for a specific professor.

#### Request:
- **Headers**:
  ```json
  {
    "Authorization": "Bearer YOUR_JWT_TOKEN"
  }
  ```

#### Response:
- **200 OK**:
  ```json
  {
    "appointments": [
      {
        "appointmentId": "12345",
        "professorName": "Professor P1",
        "time": "2025-01-20T10:00:00"
      }
    ]
  }
  ```

---

### 4. **POST /student/appointments/book**
#### Description:
Student can book an appointment with a professor for a specified time slot.

#### Request:
- **Body**:
  ```json
  {
    "professorId": "professor_id",
    "timeSlot": "2025-01-20T10:00:00"
  }
  ```

#### Response:
- **200 OK**:
  ```json
  {
    "appointmentId": "12345",
    "message": "Appointment booked successfully"
  }
  ```

---

### 5. **DELETE /professor/appointments/cancel/{appointmentId}**
#### Description:
Professor can cancel a specific appointment with a student.

#### Request:
- **Params**:
  - `appointmentId`: The unique identifier of the appointment to be canceled.

#### Response:
- **200 OK**:
  ```json
  {
    "message": "Appointment canceled successfully"
  }
  ```

---

### 6. **GET /student/appointments/status**
#### Description:
Student can view the status of their booked appointment.

#### Request:
- **Headers**:
  ```json
  {
    "Authorization": "Bearer YOUR_JWT_TOKEN"
  }
  ```

#### Response:
- **200 OK**:
  ```json
  {
    "appointmentId": "12345",
    "professorId": "professor_id",
    "status": "canceled"
  }
  ```

---

```





