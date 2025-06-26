import React from 'react'
import { Root } from '../Heroe' 

interface PropsHistorial {
            historial :  string[]  , 
            pasarParaemter:  ( item : string) => void  
}

const ListaHistorial = ( { historial  ,pasarParaemter}  : PropsHistorial) => {       


    const handelClime =  ( item  : string) =>{
        pasarParaemter( item)  
        console.log("hacer la peticon "  , item)


    }



return (
    <>
      <div className="w-[95%] md:w-[80%] rounded-md border z-100  relative border-gray-300 mx-auto p-2 ">
        <h1 className="mx-3 p-2 border bg-blue-500 text-white font-bold rounded-md">
          Historial busquedad
        </h1>
        {historial.length > 0 &&
          historial.slice(0,5).map((item, index) => (
            <div
              key={index}
              onClick={() => handelClime(item)}
              className="border p-2 border-gray-200 rounded-md m-2 hover:bg-blue-500 hover:text-white"
            >
              <p className="cursor-pointer">{item}</p>
            </div>
          ))}
      </div>
    </>
  );
};



export default ListaHistorial