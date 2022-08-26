import './App.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import DetailsModals from './components/Modal';


const schema=yup.object().shape({
firstName:yup.string().required("First Name is required"),
lastName:yup.string().required("Last Name is required"),
email:yup.string().email().required() ,
age: yup.number().typeError("Enter number only").required(),
showDetails:yup.boolean(),
details:yup.string().when('showDetails',{is:true,
then:yup.string().required("Details are required")
})
})
function App() {
  const [formState,setFormState]=useState({
    firstName:"maheen",
    lastName:"unzeelah",
    email:"abc@gmail.com",
    age:23,
  })
  const [number,setNumber]=useState();
  const {register,trigger,watch,reset,handleSubmit,setValue, formState:{ errors,isDirty,isValid }}=useForm({  
    mode: 'onChange',
    resolver:yupResolver(schema),
    // defaultValues:formState
    
  });
  const watchShowDetails = watch("showDetails", false);
  const submitForm=(data)=>{console.log(data)};
  const allowOnlyNumber=(value)=>{

    if(/^[0-9]*$/.test(value) )
         setValue('age',value,{shouldValidate:true})
    return value.replace(/[^0-9]/g, '')
      
    
 }
  return (
    <div className="App">
     <h1>React Hooks Form Practice</h1>
     <DetailsModals />
     <form onSubmit={handleSubmit(submitForm)}>
          <input
            type="text"
            name="firstName"
            {...register("firstName")} 
            placeholder="First Name..."
          />
          <p>{errors.firstName?.message}</p>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name..."
            {...register("lastName")} 
        
          />
          <p> {errors.lastName?.message} </p>
          <input
            type="text"
            name="email"
            placeholder="Email..."
            {...register("email")} 
       
          />
          <p> {errors.email?.message}</p>
        <input

           name="age"
           placeholder="Age..."  
           {...register("age", {
            onChange:(e)=>{
              const value=e.target.value.replace(/[^0-9]/g,'')
              console.log(value)
              setValue('age',value,{shouldValidate:true})
            }
           })}
           
           />
          <p>{errors.age?.message} </p>
          <div>
          <label htmlFor="show-details">
            <input
              {...register('showDetails')}
              type="checkbox"
              name="showDetails"
              value={true}
              id="show-details"
            />{' '}
            Show Details
          </label>
        </div>
      
          {watchShowDetails &&<><input
            type="text"
            name="details"
            placeholder="Enter Details..."
            {...register("details")} 
        
          />
          <p>{errors.details?.message}</p></>}
             
          <button type="button" onClick={()=>reset({ firstName: "",lastName:"",email:"",age:"",details:"",showDetails:false })}>Clear All</button>
          <button type="button"  onClick={async () => {
          const result = await trigger(["firstName", "lastName"]);
        }}>Validate Name</button>
          <button type="submit" id="submit" disabled={!isValid} >Submit</button>

        </form>
    </div>
  );
}

export default App;
