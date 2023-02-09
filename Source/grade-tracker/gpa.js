import * as React from 'react'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, ButtonGroup, Button, Row, Col, Nav, Navbar, Dropdown, Badge, Modal, Form, FormGroup } from 'react-bootstrap';
import CoffeeCard from '../../components/CoffeeCard';
import CSData from "../../content/cs-2019.json"
import ITData from "../../content/it-2019.json"
import { useLocalStorage } from 'react-use';



function GradePage(){

    const dummyPrice = 59
    //Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    //Input
    const [yearState, setYearState] = useState("")
    const [termState, setTermState] = useState("")
    const [codeState, setCodeState] = useState("")
    const [nameState, setNameState] = useState("")
    const [groupState, setGroupState] = useState("")
    const [subjectState, setSubjectState] = useState("")
    const [gradeState, setGradeState] = useState("")
    const [scoreState, setScoreState] = useState("")
    const [gpaState, setgpaState] = useState()

    // Course
    //let [subCourse, setCourse] = React.useState('iced')
    let courseData = CSData
    let [subjectList, setSubjectList] = useLocalStorage('list',[])
    let [totScore, setTotScore] = useLocalStorage('totalScore',[])
    let [GPA,setGPA] = useLocalStorage('GPA',0)
    console.log(totScore)
    
    
    

    const [coffee, setCoffee] = useLocalStorage('coffee', 'Latte')
    let [coffeeTitles, setCoffeeTitles] = React.useState([])
    let [subMenu, setSubMenu] = React.useState('iced')
    let [cart, setCart] = useLocalStorage('cart',[])


    function AddSubject(year, term, group, name, grade, score) {

        if (year, term, group, name, grade, score != ''){
            
            let productObj = {
                year: (year),
                term: (term),
                group: (group),
                name: (name),
                grade: (grade),
                
            }

            totScore.push(Number(score))
            console.log(score)
            console.log(totScore)
            console.log(productObj)
            subjectList.push(productObj)
            console.log(subjectList)
            setSubjectList([...subjectList])
            setTotScore([...totScore])

        }
        else {
            setShow(true)
        }
           
    }

    function ClearData(){
        console.log("DELETE")
        setSubjectList([])
        setTotScore([])
        setGPA(0)
      
    }

    function CalcGPA(){
        if (totScore != []){
            let GPATemp = totScore.reduce((result,number)=> result+number) / ((totScore.length) * 3)
            console.log(GPATemp)
            setGPA(GPATemp)
        }
        else {
            setGPA(0.0)
        }
        
    }

    


    function SubjectListFromGroup(group) {
        
       if (group === "Language Courses"){
            return 0;
       }
       else if (group === "Humanities Courses"){
            return 1;
       }
       else if (group === "Social Science Courses"){
            return 2;   
       }
       else if (group === "Science and Mathemetics Courses"){
            return 3;
       }
       else if (group ==="General Education Courses"){
            return 4;
       }
       else if (group === "Core Courses"){
            return 5;
       }
       else if (group === "Major Required Courses"){
            return 6;
       }
       else if (group === "Major Elective Courses"){
            return 7;
       }
       else{
            return 0;
       }
        
    }

    function convertGradeToNumber(grade) {
        if (grade === "A"){
            return 4;
        }
        else if (grade === "A-"){
            return 3.75;
        }
        else if (grade === "B+"){
            return 3.25;   
        }
        else if (grade === "B"){
            return 3;
        }
        else if (grade ==="B-"){
            return 2.75;
        }
        else if (grade === "C+"){
            return 2.25;
        }
        else if (grade === "C"){
            return 2;
        }
        else if (grade === "C-"){
            return 1.75;
        }
        else if (grade === "D"){
            return 1;
        }
        else if (grade === "F"){
            return 0;
        }
        else if (grade === "W"){
            return 0;
        }

        
        
    }


    return (
    <>
        {/*Navation*/}
        <Navbar bg="danger" variant="dark">
            <Container>
            <Navbar.Brand href="">Low Int Sage</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="">Home</Nav.Link>
                <Nav.Link href="">Grade Tracker</Nav.Link>
                <Nav.Link href="">Readme</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
        <br/>

        {/*Modal*/}
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Unselected Field</Modal.Title>
            </Modal.Header>
            <Modal.Body>Please fill all the unselected field!</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>

        <Container>
            {/*Header*/}
            <div className="text-center mt-5 col-md-12">
                <h1>GPA Tracker</h1>
                
            </div>
            <div >
                <ButtonGroup aria-label="Basic Example">
                        <Button variant="primary" onClick={courseData = CSData}>CS Course</Button> {/*Set Course To CS */}
                        <Button variant="warning" onClick={courseData = ITData}>IT Course</Button> {/*Set Course To IT */}
                </ButtonGroup>
            </div>
            
            <br/>

            <div className='bg-light'>
            {/*Content*/}
            <Row>

                {/*Field select */} 
                <Col sm={3}>
                    <Row>
                        <h4 className="text-center mt-3">
                            Subject <Badge bg="danger">Form</Badge>
                        </h4>
                        <div className="row mt-3 mr-2 col-md-12">
                            <label  className="form-label">Semester</label>
                            <div className="col-5">
                                <Form.Group controlId='year'>
                                    <Form.Select id="year" aria-label="Year" onChange={(e) =>{
                                        const selectedYear = e.target.value;
                                        setYearState(selectedYear)
                                    }}>
                                        <option key='blankChoice' hidden value />
                                        <option value="2019">2019</option>
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>
                                        <option value="2021">2022</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        
                            <div className="col-5">
                                <Form.Group controlId='term'>
                                    <Form.Select id="term" aria-label="Term" onChange={(eTerm) =>{
                                        const selectedTerm = eTerm.target.value;
                                        setTermState(selectedTerm)
                                    }}>
                                        <option key='blankChoice' hidden value />
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </Form.Select>
                                </Form.Group>
                         
                            </div>
                        
                        </div>
                    
                        <div className="mb-3">
                            <label  className="form-label">Group Subjects</label>
                            <div className="col-12">
                                <Form.Select id="groupSubject" aria-label="Group Subject" onChange={(eGroup) =>{
                                        const selectedGroup = eGroup.target.value;
                                        setGroupState(selectedGroup)
                                    }}>
                                    <option key='blankChoice' hidden value />
                                    {CSData.curriculum.courses.map((data, index) => {
                                        return <option key={`content_item_${index}`} value={`${data.groupName}`}>{data.groupName}</option>
                                    })}
                                </Form.Select>

                            </div>
                                
                        </div>
                    
                        <div className="mb-3">
                            <label className="form-label">Subject</label>
            
                            <div className="col-12">
                                <Form.Select value={nameState} aria-label="Subject" onChange={(eName) =>{
                                        const selectedName = eName.target.value;
                                        setNameState(selectedName)
                                    }}>
                                    <option key='blankChoice' hidden value/>
                                    {CSData.curriculum.courses[SubjectListFromGroup(groupState)].subjects.map((data, index) => {
                                        return <option key={`content_item_${index}`} value={`${data.name}`}> {data.name}</option>
                                    })}
                                </Form.Select>
                            </div>
                                
                        </div>

                        <div className="mb-3">
                            <label  className="form-label">Grade</label>
                            <div className="col-12">
                                <Form.Select id="grade" aria-label="Grade" onChange={(eGrade) =>{
                                        const selectedGrade = eGrade.target.value;
                                        const selectedScore = convertGradeToNumber(eGrade.target.value) * 3;
                                        setGradeState(selectedGrade)
                                        setScoreState(selectedScore)
                                        
                                    }}>
                                    <option key='blankChoice' hidden value />
                                    <option value="A">A</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B">B</option>
                                    <option value="B-">B-</option>
                                    <option value="C+">C+</option>
                                    <option value="C">C</option>
                                    <option value="C-">C-</option>
                                    <option value="D">D</option>
                                    <option value="F">F</option>
                                    <option value="W">W</option>
                                </Form.Select>
                                
                            </div>
                        </div>
                        
                        <div>
                            <Button variant="success" onClick={() => AddSubject(yearState, termState, groupState, nameState, gradeState, scoreState)}> Add Subject </Button>
                        </div>

            
                    </Row>
                </Col>
            

                {/*Grade Table*/}  
                <Col>
                    
                    <table  id="data-table" className="table table-bordered table-striped mt-2 col-md-12  bg-white"   >
                        <thead>
                            <tr className="table-dark text-center">
                                <th></th>
                            </tr>
                            <tr className="table-dark text-center">
                                <th>Subject ID</th>
                                <th>Subject</th>
                                <th>Grade</th>
                            </tr>
                        </thead>

                        <tbody className="text-center" >
                            <td>
                            {subjectList.map((item, i) => {
                                return <Row key={i}>
                                    <Col>{item.group}</Col>
                                </Row>
                                
                            })}
                            </td>
                            <td>
                                {subjectList.map((item, i) => {
                                    return <Row key={i}>
                                        <Col>{item.name}</Col>
                                    </Row>
                                    
                                })}
                            </td>
                            <td>
                                {subjectList.map((item, i) => {
                                    return <Row key={i}>
                                        <Col>{item.grade}</Col>
                                    </Row>
                                    
                                })}
                            </td>
                        </tbody >
                        <tfoot  className="text-center">
                            <td className="text-left">
                                <Row>
                                    Total GPA: {GPA}
                                </Row>
                            </td>

                            
                        </tfoot>
                        
                    </table>

             

                    <div className="row mt-3 col-md-12">
                        <div className="col-9">
                            <Button variant="outline-danger" onClick={() => ClearData()} > Clear All Subjects </Button>{' '}
                        </div>

                        <div className="col-3">
                                <Button variant="outline-success" onClick={() => CalcGPA()} > Clalculate GPA </Button>{' '}
                        </div>
                    </div>

              
                
                </Col>

            </Row>
            </div>                    
        </Container>
    </>
    );

    

}



export default GradePage