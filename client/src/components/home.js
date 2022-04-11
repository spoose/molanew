import React, { useState } from "react";
import { useNavigate } from "react-router";
import {Badge, Button, Card, Container, Stack} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import '../home.css';
import data from "bootstrap/js/src/dom/data";

export default function Home() {

    const navigate = useNavigate();
    function exportCsv(){
        let password = prompt('Enter the password to download the file:');
        async function getCsv() {
            //http://localhost:5001/
            const response = await fetch('http://localhost:5001/csv?' + new URLSearchParams({
                password: password}))

            const blob = await response.blob()
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = 'answers.csv'
            link.click()
            setTimeout(() => URL.revokeObjectURL(link.href), 0)

            // console.log(response.json())
            // response.json().then(
            //     data =>{
            //         let link = document.createElement('a');
            //         link.href = encodeURI(data);
            //         link.download = 'my.csv';
            //         document.body.appendChild(link);
            //         link.click();
            //         document.body.removeChild(link);
            //         console.log(data)}
            // )



            // console.log(JSON.stringify(response))
            // console.log(encodeURI(response))


            if (!response.ok) {
                const message = `An error occured: ${response.statusText}`;
                window.alert(message);
                return;
            }
        }

        if(password && password.toLowerCase() === "molab"){
            // window.open("folder/history.zip")
            getCsv().then( ()=>{
                    alert("Downloaded!")
                }
            )
        }else if(password){
            alert("incorrect password!! please try again");
            exportCsv()
        }
    }

    return (
        <Stack>
            <Container id="welCard" className=" mx-auto" >
                <h1>
                    Welcome to <Badge id="badge" pill bg="info">YourMorals.org!</Badge>
                </h1>
                <p>
                    Welcome to YourMorals.org, where you can learn about your own morality, ethics, and/or values, moral values, ethical behaviors, personality, and political preferences
                    while also contributing to scientific research. We are a group of professors, researchers, and graduate students in social psychology.
                </p>
                <Button id="btnQues" className="col-4" onClick={()=>{
                    navigate("/ques")
                }}>
                   Survey
                </Button>

                <Button className="col-4 mx-2 my-4 " variant="secondary"  onClick={exportCsv}>
                    Export CSV
                </Button>
            </Container>
        </Stack>

     )


}