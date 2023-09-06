import React, { useContext, useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/singletrip.css";
import ShareComponent from "../component/shareComponent.js";
import { Context } from "../store/appContext";
import Carousel from "react-multi-carousel";
import Swal from 'sweetalert2';
import "react-multi-carousel/lib/styles.css";
import CarouselCard from "../component/carouselcard";

const SingleTrip = () =>{
    const params = useParams()
    const [singleTrip, setSingleTrip] = useState("")
    const [weather, setWeather] = useState("")
    const [city,setCity] = useState("")
    const [image,setImage] = useState("")
    const {store,actions} = useContext(Context)
    const [allDescriptions, setAllDescriptions] = useState([]);
    const [description, setDescription] = useState("");
    const [date,setDate]= useState("");
    const author=localStorage.getItem("username")
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;


    const responsive = {        
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    const user_id=localStorage.getItem("userId")
    const userName=store.userName;
    const review_id= params.id;

    useEffect(()=>{
        get_single_trip()
        getCityFromApi()
        fetchComments();                           

    },[])

    useEffect(() => {
        getWeather()
    },[city])


//   const getCoordinatesFromLocation = ()=>{
//     fetch(`https://nominatim.openstreetmap.org/ui/search.html?q=${city}`)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((error) => {
//       console.error("Error al obtener las coordenadas:", error);
//     });
// }

    const map = `https://maps.googleapis.com/maps/api/staticmap?center=${city}&zoom=10&size=300x300&key=${process.env.API_KEY}`

    const get_single_trip = () =>{
        const token = localStorage.getItem('jwt-token');
        if(token) {
        fetch(process.env.BACKEND_URL + 'api/review/' + params.id ,{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
                "Authorization" : "Bearer " + token
			}
		})
		.then(res => res.json())
		.then(data => {
            setSingleTrip(data)
		})
		.catch(err => console.error(err))
    }
    }

    const getCityFromApi = () =>{
        const token = localStorage.getItem('jwt-token');
        if(token) {
        fetch(process.env.BACKEND_URL + 'api/review/' + params.id ,{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
                "Authorization" : "Bearer " + token
			}
		})
		.then(res => res.json())
		.then(data => {
            console.log(data);
            setImage(data.image)
            setCity(data.location)
		})
		.catch(err => console.error(err))
    }
}

    const getWeather = () =>{
		fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=331b322b5b7b3278dc6b42817399e72f&units=metric`, {
			method: "GET",
	
		})
		.then(resp => {
			return resp.json();
		})
		.then(data=> {
			setWeather(data.main.temp);
		})
		.catch(error => {
			console.log(error);
			console.log('Oops something went wrong'+ error);
		})
	}

     const fetchComments =() =>{        
        const token = localStorage.getItem('jwt-token');        
        if(token) {        
        fetch(process.env.BACKEND_URL + 'api/comments/' + review_id,{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer " + token
            }
        })
        .then(resp => {								
            return resp.json();
        })
        .then(data=> {		
        setAllDescriptions(data);
        console.log(data);            
        })
        .catch(err => console.log(err))
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'            
            })
        }}

        const createComment = () => {
            const token = localStorage.getItem('jwt-token');
            if(token) {
            fetch(process.env.BACKEND_URL + 'api/create-comment', {
              method: "POST",          
              headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer " + token
              },
              body: JSON.stringify({description, user_id, review_id, author, date:formattedDate }) 
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {  
                setDescription(data.description);
                setDate(data.date);
                Swal.fire(
                    'Good job!',
                    'You POSTed a comment!',
                    'success'
                )
                setDescription("")
                fetchComments();            
            })
            .catch(err => console.log(err))
            } else {       
                console.log(error)
                }
        }

    const showComments = () =>{
        return allDescriptions.map((comment, index) => {
            return(
                <CarouselCard key={index} id={comment.id} description={comment.description} author={comment.author} image={comment.testImage} fetchComments={fetchComments} date={comment.date}/>                      
            )
        }			
    )}



    return(

    <div className="container-fluid mt-5 mb-5" >
			{ singleTrip ? (
           <div className="card m-0 border-0 mx-auto p-0"   id="containerSingle">                    
           <div className="row g-0 h-100 w-100">
               <div className="col-sm-12 col-md-3" id="imageContainer">
                   <img id="singleActivityPicture"src={singleTrip.image} className="rounded-start h-100 w-100 col-sm-12" alt="picture chosen by the user"/>
               </div>
               <div className="col-sm-12 col-md-6">
                   <div className="card h-100 border-0 px-3">
                       <h4 className="card-title fs-3 ms-3 mt-4 mb-4 text-center">{singleTrip.title}</h4>                                
                           <div className="d-flex flex-row mt-2 justify-content-center" id="singleRow1">
                               <p className="col-sm-3 card-text ms-2"><i class="fas fa-heart fa-xs me-2"></i>{singleTrip.reviewOwner}</p>
                               <p className="col-sm-4 card-text text-center ms-2"><i class="fas fa-info-circle fa-sm me-2"></i>{singleTrip.type} activity</p>
                               <p className="col-sm-4 card-text text-center ms-2"><i class="fas fa-calendar-alt fa-sm me-2"></i>{singleTrip.publishing_date}</p>   
                           </div>
                       <div className="row">
                           <p className="col-sm-12 card-text ms-2 my-2"><i>" {singleTrip.description} " </i></p>
                       </div>
                           <div className="d-flex flex-row mt-3 justify-content-center" id="singleRow2">                                        
                               <p className="col-sm-3 card-text ms-2"><i class="fas fa-money-bill-wave me-2"></i>{singleTrip.price}</p>
                               <p className="col-sm-4 card-text ms-2 text-center"><i class="fas fa-thermometer-half fa-sm me-2"></i>{weather}</p>
                               <p className="col-sm-4 card-text ms-2 text-center"><i class="fas fa-map-marker-alt fa-sm me-2"></i>{singleTrip.location}</p> 
                           </div>                                             
                       <div className="card-text mt-1 bottom-0 pb-5" id="activityRow">
                           <div className="row">
                               {/* <div className="col-sm-12">
                                   <a
                                   href={singleTrip.link}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="card-link ms-2 me-3 pb-3 d-flex justify-content-center"
                                   >
                                       <small className="text-center w-100">{activity.link}</small>
                                   </a>
                               </div> */}
                               <div className="col-sm-12">
                                   <ShareComponent />
                               </div>
                           </div>
                       </div>                                                            
                   </div>
               </div>
               <div className="col-sm-12 col-md-3 border-0">
                   <div className="container-fluid h-100">
                       <img className="img-fluid rounded-start" id="mapSingleActivity" src={map}/>
                   </div>
               </div>                        
           </div>                    
       </div>  
            ):(
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
            <div>
            </div>
            <div className="container-fluid" id="commentSectionTrip">
                <h4 className="my-5">Comments</h4>
                <div className="container-fluid">
                    <Carousel showDots={true} arrows={false} responsive={responsive} >
                        {showComments()}
                    </Carousel>
                </div>               
                <div className="input-group mt-5" id="comment">
                    <span className="input-group-text rounded me-2" id="commentWrite">Write your comment:</span>
                    <textarea className="form-control" id="commentBox" value={description} onChange={(e)=> setDescription(e.target.value)} aria-label="With textarea"></textarea>
                </div>
                <button 
                    type="button" className="btn btn-dark mt-5" 
                    onClick={createComment}
                    id="sumbitButtonSingle"> Send 
                </button>                
            </div>          
        </div>

    )
}

export default SingleTrip 