import React, { Fragment, useState } from 'react'
import './Search.css'
import { useNavigate } from 'react-router-dom'
import MetaData from '../layout/Header/MetaData'
const Search=({history}) =>{
    const Navigate=useNavigate()
    const [keyword,setKeyword]=useState("")
    const handleSearch=(e)=>
    {
        console.log(keyword);
        e.preventDefault();
        if(keyword.trim())
        {
            Navigate(`/products/${keyword}`)
        }
        else
        {
            Navigate("/products")
        }
    }
  return (
    <Fragment>
        <MetaData title={'ShopBuzz : Search'}></MetaData>
        <form className='searchBox' onSubmit={handleSearch}>
            <input type='text' placeholder='Search a Product' onChange={(e)=>setKeyword(e.target.value)}/>
            <input type='submit' value="Search"></input>

        </form>
    </Fragment>
    
  )
}

export default Search