import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import firebase from '../firebase';

const ContactsForm = () => {
    const [name, setName] = useState(''); //kiekvienam po state
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); //uzstabdom persikrovima, kad nedingtu duomenys
    
        if(name.length < 3){
            alert('Užpildykite savo vardą');
            return
        }
        if(email===""){
            alert('Užpildykite savo el. paštą');
            return
        }
        if(message.length < 10 && message.length > 400){
            alert('Įveskite ilgenę žinutę');
            return
        }

         //cia rasome firebase funkcionaluma
        firebase
        .firestore() //issaugok i duombaze
        .collection('contacts').add({ //duomenu paketas, kuri siusim. add - irasyti
            name: name, //sukuriu kas atsiras duombazeje
            email:  email,
            message: message,
            created: firebase.firestore.FieldValue.serverTimestamp() //kada buvo sukurta forma
        }) 
        .then(() =>{
            alert('Žinutė nusiųsta')
        })
        .catch((err)=>{
            alert(err.message) //jei klaida, kazkas nesueina, isprintinamas error
        })

        setName(''); //issivalome reiksmes, kitam vartotojui - svari forma
        setEmail('');
        setMessage('');    
    }

    return (
        <div>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Jūsų vardas</Form.Label>
                <Form.Control
                type="text" 
                placeholder="Įveskite vardą"
                value={name}
                onChange={(e)=> setName(e.target.value)}/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Jūsų el. paštas</Form.Label>
                <Form.Control
                type="email" 
                placeholder="Įveskite el. paštą"
                value={email}
                onChange={(e)=> setEmail(e.target.value)} />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Jūsų klausimas man</Form.Label>
                <Form.Control 
                as="textarea" rows={3} 
                placeholder="Įveskite savo klausimą"
                value={message}
                onChange={(e)=> setMessage(e.target.value)} />
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Siųsti
            </Button>
        </Form>
        </div>
    )
}

export default ContactsForm;