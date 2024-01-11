'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
          <Paper elevation={3} square={false} style={paperStyle}>
              <h1 style={{color:'#1976D2'}}>Add an internship</h1>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, 
                   //width: '25ch'
                   },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField id="outlined-basic" label="Title" variant="outlined" fullWidth
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                />

                <DatePicker id="outlinedbasic" label="Date" variant="outlined" fullWidth 
                  selected={date} 
                  onChange={date => setDate(date)} 
                />

              </Box>
              <Button variant="contained" onClick={handleClick}>
                Submit
              </Button>
          </Paper>

          <h1 style={{color:'#1976D2'}}>Internships</h1>

          <Paper elevation={3} square={false} style={paperStyle}>
            {internships.map(internship=>(
              <Paper elevation={6} square={false} style={{margin:"10px", padding:"5px", textAlign:"left"}} key={internship.id}>
                Title: {internship.title}<br/>
                Date: {internship.date}<br/>
              </Paper>
            ))}
          </Paper>

      </Container>
  );
}