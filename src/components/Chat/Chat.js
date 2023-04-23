import React,{useState,useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';
// import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';
let socket;
const Chat=()=>{
    const [searchParams]=useSearchParams();
    const [name,setName]=useState('');
    const [room,setRoom]=useState('');
    const [users,setUsers]=useState('');
    const [message,setMessage]=useState('');
    const[messages,setMessages]=useState([]);
    const ENDPOINT='localhost:5001';
   
    useEffect(()=>{
        const n=searchParams.get('name');
        const r=searchParams.get('room');
        socket=io(ENDPOINT);

        setName(n);
        setRoom(r);

        socket.emit('join',{name:n,room:r},(error)=>{
              if(error){
                alert(error);
              }
        });

        // return ()=>{
        //   socket.emit('disconnect');
        //   socket.off();
        // }

    },[ENDPOINT,searchParams]);
    useEffect(()=>{
      socket.on('message',(message)=>{
        setMessages([...messages,message]);
      })
      socket.on('roomData',({users})=>{
        setUsers(users);
      })
    },[]);

    const sendMessage=(event)=>{
      event.preventDefault();

      if(message){
        socket.emit('sendMessage',message,()=>setMessage(''));
      }
    }

    console.log(message,messages);

    return(
        <div className="outerContainer">
          <div className="container">
            <InfoBar room={room}/>
            <Messages messages={messages} name={name}/>
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
          </div>
          <TextContainer users={users}/>
        </div>
    )
}
export default Chat;