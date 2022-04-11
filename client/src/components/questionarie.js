import React, {useEffect, useState} from 'react';
import {Formik, useField, useFormik} from 'formik';
import * as Yup from 'yup';
import {useNavigate} from "react-router";
import {Badge, Button, Col, Container, Form, FormControl, Row, Stack} from "react-bootstrap";
import '../question.css';
import {string} from "yup";
import {forEach} from "react-bootstrap/ElementChildren";
import { nanoid } from 'nanoid'
import {NavLink} from "react-router-dom";

export default function Questionnaire() {
    // const navigate = useNavigate();
    const [entryTime, setEntryTime] = React.useState(Date.now());
    const navigate = useNavigate();
    // const [form, setForm] = useState({
    //     time: 0,
    //     ip: "",
    //     qMap:new Map,
    // });

    const formik = useFormik({
        initialValues: {
            question0:{
                name:' ',
                ans:' '
            },
            question1:{
                name:' ',
                ans:' '
            },
            question2:{
                name:' ',
                ans:' '
            },
            question3:{
                name:' ',
                ans:' '
            },
            question4:{
                name:' ',
                ans:' '
            },
            question5:{
                name:' ',
                ans:' '
            },
            question6:{
                name:' ',
                ans:' '
            },
            question7:{
                name:' ',
                ans:' '
            },
            question8:{
                name:' ',
                ans:' '
            },
            question9:{
                name:' ',
                ans:' '
            },
        },
        validationSchema: Yup.object({
            question0: Yup.object({
                name:Yup.string().required("xxx"),
                ans: Yup.string().min(3,"Q1sss").required("Q1 unchecked"),
            }).required("Q1xxx"),

            question1: Yup.object({
                name:Yup.string().required("xxx"),
                ans: Yup.string().min(3).required("Q2 unchecked"),
            }),
            question2: Yup.object({
                name:Yup.string().required("xxx"),
                ans: Yup.string().min(3).required("Q3 unchecked"),
            }),
            question3: Yup.object({
                name:Yup.string().required("xxx"),
                ans: Yup.string().min(3).required("Q4 unchecked"),
            }),
            question4: Yup.object({
                name:Yup.string().required("xxx"),
                ans: Yup.string().min(3).required("Q5 unchecked"),
            }),
            question5: Yup.object({
                name:Yup.string().required("xxx"),
                ans: Yup.string().min(3).required("Q6 unchecked"),
            }),
            question6: Yup.object({
                name:Yup.string().required("xxx"),
                ans: Yup.string().min(3).required("Q7 unchecked"),
            }),
            question7: Yup.object({
                name:Yup.string().required("xxx"),
                ans: Yup.string().min(3).required("Q8 unchecked"),
            }),
            question8: Yup.object({
                name:Yup.string().required("xxx"),
                ans: Yup.string().min(3).required("Q9 unchecked"),
            }),
            question9: Yup.object({
                name:Yup.string().required("xxx"),
                ans: Yup.string().min(3).required("Q10 unchecked"),
            }),
        }),
        onSubmit: async values => {
            let millis = Date.now() - entryTime
            let temMap = new Map()

            for (let i =0; i<10; i++){
                temMap.set(values["question"+i].name,values["question"+i].ans)//assign value
                // console.log(temMap.get(values["question"+i].name))
                formik.touched["question"+i]= false;//reset formik values
            }
            temMap.set("id",nanoid(11))
            temMap.set("time",millis/1000)
            // setForm({time:millis,ip:"8.8.8.8", qMap:temMap});

            Object.keys(formik.initialValues).forEach(//reset formik values
                function(key){
                    formik.initialValues[key].ans = " "
                    formik.initialValues[key].name = " "
                }
            );

            //http://localhost:5001
            await fetch("/question/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Object.fromEntries(temMap)),
            })
                .catch(error => {
                    window.alert(error);
                    return;
                });

            alert("Thank you, we have received your answer!")
            alert(JSON.stringify(Object.fromEntries(temMap), null, 2));//

            // alert(JSON.stringify(form, null, 2));

            setFuns.forEach(func => {
                func('')
            })

            navigate("/")//back to home page after submit
        },
    });

    let [selectedID0, setID0] = React.useState("");
    let [selectedID1, setID1] = React.useState("");
    let [selectedID2, setID2] = React.useState("");
    let [selectedID3, setID3] = React.useState("");
    let [selectedID4, setID4] = React.useState("");
    let [selectedID5, setID5] = React.useState("");
    let [selectedID6, setID6] = React.useState("");
    let [selectedID7, setID7] = React.useState("");
    let [selectedID8, setID8] = React.useState("");
    let [selectedID9, setID9] = React.useState("");

    let setFuns = [setID0, setID1, setID2, setID3,setID4,setID5,setID6,setID7,setID8,setID9]
    let selectedIDs = [selectedID0, selectedID1, selectedID2, selectedID3,selectedID4,selectedID5,selectedID6,selectedID7,selectedID8,selectedID9]

    function Question(props) {
        return (
            <Form.Group  controlId="formBasicEmail">
                <Form.Label className="qTitle" >
                    Q{props.qId+1}: {props.descri}
                    { (formik.values["question"+props.qId].ans<3) && formik.touched["question"+props.qId] ? (
                        <Badge pill bg="danger">
                            Q{props.qId+1} unchecked
                            {/*{formik.errors.question0.ans}*/}
                        </Badge>
                    ) : null}
                </Form.Label>

                <Container className="qCard">
                    <Row  sm={4} md={4}>
                        {['Strongly Agree','Agree','Slightly Agree' , 'Neutral', 'Slightly Disagree', 'Disagree', 'Strongly Disagree'].map((ques) => (
                            <Col key={`${ques}+${props.qId}`} >
                                <Form.Check
                                    type="radio"
                                    id={`${ques}+${props.qId}`}
                                    name={`${ques}+${props.qId}`}
                                    label={`${ques}`}//+${props.selectId}
                                    checked={ques+props.qId === props.selectId}
                                    onChange={ () => {
                                        // formik.values["sq"+props.qId]= ques;
                                        formik.values["question"+props.qId].name = props.qName//+props.qId
                                        formik.values["question"+props.qId].ans = ques
                                        setFuns[props.qId](ques+props.qId);
                                    }}
                                />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </Form.Group>
        )
    }

    const [questions, setQuestions] = useState([]);
    let firstLoad = true;
    // This method fetches the records from the database.
    useEffect(() => {
        if(!firstLoad){
            return;
        }
        setEntryTime(Date.now())
        firstLoad = false;
        async function getQuestions() {
            const response = await fetch(`/questionlist/`);//http://localhost:5001
            if (!response.ok) {
                const message = `An error occured: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const records = await response.json();
            shuffleArray(records);
            // console.log("records:"+records)
            setQuestions(records.slice(0,10));
        }
        getQuestions();

        return;
    }, [questions.length]);

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    function QuestionList() {
        return questions.map((question,index) => {
            return (
                <Question
                    descri={question.questiontext}
                    key={question._id}
                    qId={index}
                    qName={question.varname}
                    selectId = {selectedIDs[index++]}
                />
            );
        });
    }

    function uncheckedQues({}){
        return(
            <Container>
                {[0,1,2,3,4,5,6,7,8,9].map((index)=>{
                    return formik.values["question"+index].ans.length < 3 && formik.touched["question"+index] ? (
                        <Badge key={index+1} pill className="col mx-1 " pill bg="danger">
                            Q{index+1} unchecked
                        </Badge>
                    ) : null
                })}
            </Container>
        )
    }

    return(
        <div>
            <Button  className="btnBack" variant="outline-success" onClick={()=> navigate("/")}> Back Home</Button>
            <Form  className="col-sm-12 col-md-12 mx-2" onSubmit={formik.handleSubmit}>
              <Stack gap={2}>
                  {QuestionList()}
                  {uncheckedQues({formik})}
                  <Button variant="outline-success" className="col-4 mx-auto my-4 "  type="submit">Submit</Button>
            </Stack>
            </Form>
        </div>
    )


}