import {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./course_page.css" ;

const InstructorCourses =()=>{
  const navigate = useNavigate();

  const [message,setMessage] = ("");
  const [courses,setCourses] = ([]);
  const [loading,setLoading] = (true);

  useEffect(()=>{
    const fetchCourses = ()=>{
      try {
        
      } catch (error) {
        
      }
    }
  })
}