'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import '../styles/Internship.css'; 

export default function Internship() {
  const paperStyle = {padding:"10px" , width:600, margin:'20px auto'}
  const[title, setTitle]=React.useState('')
  const[date, setDate]=React.useState('')

  const[internships, setInternships]=React.useState([])

  const url = "http://localhost:8080/internship/add"
  const handleClick = (e)=>{
    e.preventDefault()
    const Famille = {title, date}
    console.log(Famille)
    fetch(url, {
      method:'POST',
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(Famille)
    }).then(()=>{
      console.log("New Internship Added")
    })
  }

React.useEffect(()=>{
  fetch("http://localhost:8080/internship/getAll")
  .then(res=>res.json())
  .then((result)=>{
    setInternships(result);
  })
})
  return (
    <Container>
      <Paper elevation={3} square={false} className="form-container">
        <h1 className="form-title">Add an Internship</h1>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-field"
          />

          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="MM/dd/yyyy"
            isClearable
            placeholderText="Select Date"
            showYearDropdown
            showMonthDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={15}
            dropdownMode="select"
            className="form-field"
          />

          <Button variant="contained" onClick={handleClick} className="submit-button">
            Submit
          </Button>
        </Box>
      </Paper>

      <h1 className="internship-title">Internships</h1>

      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {internships.map(internship => (
              <TableRow key={internship.id}>
                <TableCell>{internship.id}</TableCell>
                <TableCell>{internship.title}</TableCell>
                <TableCell>{internship.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
