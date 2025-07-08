import { useState, useEffect } from 'react';
import { useAuth } from "../../context_rout";
import { Chat } from '../chat';
export const Home = () => {
  const { socketRef } = useAuth();
  const [mymsg, setmymsg] = useState([]);
  const [msg, setmsg] = useState('');
  const [incoming, setincoming] = useState([]);
  const [users, setUsers] = useState([]);
  const [connection, setconnection] = useState('');
  const [req, setreq] = useState([]);

  useEffect(() => {
    if (!socketRef.current) return;

    // Incoming messages
    const handleIncoming = (msg) => {
      setincoming(prev => [...prev, msg]);
    };
    socketRef.current.on("incoming", handleIncoming);

    // Users list
    const handleUsers = (usersList) => {
      setUsers(usersList);
    };
    socketRef.current.on("users", handleUsers);

    // Connection requests
    const handleConnectionRequest = ({ from }) => {
      setreq(prev => [...prev, from]);
    };
    socketRef.current.on("connection-request", handleConnectionRequest);

    // Cleanup listeners on unmount
    return () => {
      socketRef.current.off("incoming", handleIncoming);
      socketRef.current.off("users", handleUsers);
      socketRef.current.off("connection-request", handleConnectionRequest);
    };
  }, [socketRef]);

  const onmsgChange = (e) => {
    setmsg(e.target.value);
  };

  const onSendClick = () => {
    if (!socketRef.current) return;
    if (msg.trim() === '') return;
    setmymsg(prev => [...prev, msg]);
    socketRef.current.emit("chat message", msg);
    setmsg('');
  };

  const onConnectionClick = () => {
    if (!socketRef.current) return;
    socketRef.current.emit("request-connection", { to: connection });
  };

  return (
    <div className="App">
      <h1>This is chat app</h1>
      <input onChange={onmsgChange} value={msg} placeholder='Enter your message' />
      <button onClick={onSendClick}>Send</button>
      <input placeholder='Enter Username of the person you want to connect to' onChange={(e) => {setconnection(e.target.value);console.log(connection)}} />
      <button onClick={onConnectionClick}>Connect</button>
      <div className='Users'>
        {users.map((user) => (
          <div onClick={<Chat/>} key={user.userID}>{user.username}{user.self ? " (You)" : ""}</div>
        ))}
      </div>
      <div>
        {req.length > 0 ? req.map((r, i) => (
          <div key={i}>
            <h2>Request From:</h2>
            <h4>{r}</h4>
          </div>
        )) : <>No req</>}
      </div>
      <div className='Messages'>
        <div className='sent'>
          <h3>Sent</h3>
          {mymsg.map((msg, idx) => <li key={idx}>{msg}</li>)}
        </div>
        <div className='recived'>
          <h3>Recived</h3>
          {incoming.map((msg, idx) => <li key={idx}>{msg}</li>)}
        </div>
      </div>
    </div>
  );
};