import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/triipcard.css";
import ViewMore from "./viewmore.jsx";
import { Context} from "../store/appContext";


const TriipCard = (props)=>{
    const { store, actions } = useContext(Context);

    return(
            <div className="card-body">
                <div class="image-container">
                    <img src={props.img} class="card-img-top" alt="..."/>
                <div class="image-overlay">
                    <i class="far fa-heart fa-1x" onClick={()=> actions.addFavourite()}></i>
                    <h1>hola</h1>
                </div>
</div>
             <div class="card-body mx-3">
            <div class="d-flex flex-column align-items-center justify-content-center ">
                <div className=" col-11">
                    <div className="d-flex flex-row">
                        <img src={props.profile} class="profile-image" alt="..."/>
                            <div className="d-flex flex-column mx-3">
                                <p class="card-text"><small class="text-muted publishing-date">{props.trip.publishing_date}</small></p>
                            </div>
                        
                    </div>
                    
                    <h3 class="card-title text-center mt-4">{props.trip.title}</h3>
                    <div className="text-center">
                        <i class="fas fa-star fa-sm text-warning text-center"></i>
                        <i class="fas fa-star fa-sm text-warning text-center"></i>
                        <i class="fas fa-star fa-sm text-warning text-center"></i>
                    </div>
                    <div className="card-description">
                        <p class="card-text"><i class="fas fa-quote-left mt-2 me-2"></i> <i> {props.trip.description}</i></p>
                        <p class="card-text"><i>{props.trip.price}</i></p>
                    </div>
                   
                    <div className="btn-container">
                        <ViewMore item={props.item.id}/>
                    </div>
                 </div>
            </div>
        </div>
        </div>


    )
}

export default TriipCard