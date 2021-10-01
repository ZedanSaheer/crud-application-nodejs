import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [movie, setMovie] = useState("");
  const [review , setReview] = useState("");
  const [movieReviews,setMovieReviews] = useState([]);
  const [updatedReviews,setUpdatedReviews] = useState("");

  const submitReview = () => {
    axios.post('http://localhost:3001/api/insert',{movieName : movie,movieReview : review});
    alert("successfully updated review!");
  };

  const deleteReview = (movieName) =>{
    axios.delete(`http://localhost:3001/api/delete/${movieName}`);
  }
  const updateReview = (movie) =>{
    axios.put("http://localhost:3001/api/update",{
      movieName : movie,
      movieReview : updatedReviews,
    });
    setUpdatedReviews("");
  }

  useEffect(() => {
    axios.get('http://localhost:3001/api/get').then((response)=>{
      setMovieReviews(response.data);
    });
  }, []);

  return (
    <div className="App">
     <h1>MOVIE RATING APP</h1>
     <form className="form">
     <label htmlFor="movieName">Movie Name</label>
     <input type="text" name="movieName" onChange={(e)=>setMovie(e.target.value)} placeholder="Name of movie"/>
     <label htmlFor="review">Review</label>
     <input type="text" name="review" onChange={(e)=>setReview(e.target.value)} placeholder="Review"/>
     <button onClick={submitReview}>Submit</button>
     </form>
     <div className="reviews">
       {movieReviews.map((data)=>{
         return <div className="movieRow" key={data.id}>
           <h2>{data.movie_name}</h2>
           <p>{data.movie_review}</p>
           <div className="movieRow_actions">
           <input type="text" placeholder="Update review" className="input" onChange={(e)=>setUpdatedReviews(e.target.value)}/>
           <button className="btn"  onClick={()=>{updateReview(data.movie_name)}}>Update</button>
           <button className="btn"
            onClick={()=>{deleteReview(data.movie_name)}}>Delete</button>
           </div>
         </div>
       })}
     </div>
    </div>
  );
}

export default App;
