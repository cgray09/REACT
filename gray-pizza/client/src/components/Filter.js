import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterPizzas } from "../actions/pizzaActions";
export default function Filter() {
    const dispatch = useDispatch()
    const[searchkey , setsearchkey] = useState('')
    const[category , setcategory] = useState('all')
    return (
        <div className='container'>
            <div className="filter-container">
                <div className="form-style col-md-3 w-50">
                    <input
                    onChange={(e)=>{setsearchkey(e.target.value)}}
                    value={searchkey} type="text" className="form-control w-100" placeholder="search pizzas"/>
                </div>
                <div className="col-md-3 w-50">
                    <select className="form-control w-100 mt-2 c" value={category} onChange={(e)=>setcategory(e.target.value)}>
                        <option value="all">All</option>
                        <option value="veg">Veg</option>
                        <option value="nonveg">Non Veg</option>
                    </select>
                </div>
                <div className="col-md-3 w-50 x">
                    <button className='btn w-40 mt-2 x' onClick={()=>{dispatch(filterPizzas(searchkey , category))}}>FILTER</button>
                </div>
            </div>
        </div>
    )
}
