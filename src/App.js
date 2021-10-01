import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [movie, setMovie] = useState("");
  const [review , setReview] = useState("");

  const submitReview = () => {
    axios.post('http://localhost:3001/api/insert',{movieName : movie,movieReview : review}).then(()=>{
      alert("successfully updated review!")
    })
  }

  return (
    <div className="App">
     <h1>Hello</h1>
     <form className="form">
     <label htmlFor="movieName">Movie Name</label>
     <input type="text" name="movieName" onChange={(e)=>setMovie(e.target.value)}/>
     <label htmlFor="review">Review</label>
     <input type="text" name="review" onChange={(e)=>setReview(e.target.value)}/>
     <button onClick={submitReview}>Submit</button>
     </form>
    </div>
  );
}

export default App;
