import React, {useState, useEffect} from 'react';
import {Table} from 'react-bootstrap';
import firebase from '../firebase';

const Questions = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(()=>{
        let unsubscribe = firebase
                        .firestore()
                        .collection('contacts')
                        .onSnapshot((snap)=>{ //pasiimsim dokumento kopija
                                const newQuestions = snap.docs.map((doc)=>(
                                    {
                                        id: doc.id, //vieno dokumento id. snap metodas bega per contacts
                                        ...doc.data() //kopija visu esanciu duomenu tame dokumente
                                    }
                                ))
                                setQuestions(newQuestions); //kai turim duomenu kopia, uzsetiname
                        });
        return()=>unsubscribe(); 
    }, []) //pirmo psl uzkrovimo metu
    console.log(questions);
    
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Question</th>
                </tr>
                </thead>
            <tbody>
                {
                   questions.map((question, index)=>(
                        <tr key={index}>
                        <td>{index+1}</td>
                        <td>{question.name}</td>
                        <td>{question.email}</td>
                        <td>{question.message}</td>
                        </tr>
                   ))
                    }
            </tbody>
        </Table>
    </div>
    )
}

export default Questions
