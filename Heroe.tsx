import React, { useEffect, useState } from "react";
import Bleach from "../assets/8150248.jpg";
import Button from "../ConmponentesB/Button";
import { FaSearch } from "react-icons/fa";
import { text } from "stream/consumers";
import { useSearchParams } from "react-router-dom";
import ListUser from "./ListUser";  
import ListaHistorial from "./Spiner/ListaHistorial";

export interface Root {
  abilities: string;
  base_experience: number;
  height: number;
  id: number;
  moves: string;
  name: string;
  stats: string;
  types: string;
  weight: number;
}

interface Detallecenter {
  name: string;
  lastname: string;
  objeto: boolean;
}

const Heroe = () => {
  const [Form, setForm] = useState<string>("");
  const [searchparamst, Setsearchparmts] = useSearchParams();
  
  //lista para drowpnow 
  const [PokemonFilter, setPokeFilter] = useState<Root[]>([]);
  //lista de Resultados
  const [FiltroDetalle, setFiltroDetalle] = useState<Root[]>([]);

   //lista para Hisotiral  
   const [  historial, setHistorial]  =  useState<string[]>([])
  
  const [estado, setestado] = useState(false);    

  //loader 

  const [  Loader , setLoader]  =  useState( false)


  const KeyUp: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      setPokeFilter([]);
      console.log(PokemonFilter);
      setTimeout(() => {
        setestado(!estado);
      }, 500);
    }
  };
  const onfocusDetalle = (e: React.FocusEvent<HTMLInputElement>) => {
    setestado(true);
  };

  const HandleChanuge = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(e.target.value);
    Setsearchparmts({
      busquedad: e.target.value,
    });
    console.log(e.target.value);
  };

  let parmaetro = searchparamst.get("busquedad") || Form


  const listado = [...PokemonFilter];
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(Form);
  };

  const pasarParaemter = ( item : string) =>{
        setForm(item)
        Setsearchparmts({
          busquedad: item
        })
        setestado(!estado)
  }  


  const Hacer_la_peticion = async () => {
    try {
      setLoader( true)
      let primero = await fetch(
        `http://localhost:5000/movie/datos/buscar?busquedad=${Form || searchparamst.get("busquedad")}`
      );
      let socondo = await primero.json();  

      setPokeFilter(socondo);
      setFiltroDetalle(socondo);  

    } catch (error) {
      console.log(error);
    } finally {
      setLoader( false)
    }
  };
  const ClikcMeDetails = async (item: Root) => {
    setPokeFilter([]);
    setestado(false);
    const local  = localStorage.getItem("buscar")  
    const obtener = JSON.parse(local!)
    obtener.push( item.name)
    localStorage.setItem("buscar", JSON.stringify(obtener))
    Setsearchparmts({
      busquedad: item.name,
    });
    try {
      let primero = await fetch("http://localhost:5000/movie/gainweigth", {
        method: "Post",
        body: JSON.stringify({ peso: 1, name: item.name }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      console.log("apagar lista");
      setPokeFilter([]);
    }
  }; 

  useEffect(() => {  
    const Deobunce = setTimeout(() => {
      if (Form.trim() != "") {
        Hacer_la_peticion();
      } else {
        setForm("");
      }
    }, 300);
    return () => {
      clearTimeout(Deobunce);
    };
  }, [Form]); 
  useEffect(()=>{
        Setsearchparmts({
          busquedad:""
        })   
        let obtener =  localStorage.getItem("buscar")
        if ( !obtener) { 
          localStorage.setItem("buscar", JSON.stringify([]))
        } 
        setHistorial(JSON.parse(obtener!))
      }, [ ])

  return (
    <>      <div
        className={`border min-h-screen `}
        >
        {/* <h1>{JSON.stringify(Form)}</h1> */}  



        
        <div className="bg-indigo-700  z-20  relative w-[95%] md:w-[80%] mx-auto p-4 rounded-md  h-[100px] mt-4 flex items-center justify-center">
          <FaSearch className="  cursor-pointer absolute  right-13 md:right-25"></FaSearch>
          <input
            value={Form}
            onFocus={onfocusDetalle}
            onKeyDown={KeyUp}
            onChange={HandleChanuge}
            placeholder="busquedad"
            className="w-[90%]    outline-none  focus:ring-blue-4002 bg-white mx-auto p-3 rounded-md "
          ></input>
        </div>
         
         {
          estado  && Form.length ===0   &&
            <ListaHistorial  pasarParaemter  ={pasarParaemter}  historial = { historial} ></ListaHistorial>
         } 
  
        <div className=" w-[95%] md:w-[80%]  bg-white mx-auto  shadow-2xl rounded-md">
          {FiltroDetalle.length === 0 && Form.length > 1 && <div className="p-2 text-start text-2xl" >No se encontraron Datos</div>}
          {listado.length > 0 &&
            searchparamst.get("busquedad") != "" &&
            PokemonFilter.map((item, index) => (
              <div
                key={index}
                onClick={() => ClikcMeDetails(item)}
                className="flex items-center p-1.5 hover:bg-[#f0f4f6] cursor-pointer transition duration-200 
             rounded-lg border-gray-50"
              >
                <FaSearch></FaSearch>
                <h1 className={`${item?.view > 3 ? "text-gray-400" :"text-black"} mx-4`}>{item.name}</h1>
              </div>
            ))}
        </div>

        {/* {PokemonFilter.length === 0 && ( */} 
        
          <div>
            <ListUser   estado={estado}FiltroDetalle={FiltroDetalle}></ListUser>
          </div>
        
      </div>

  
    </>
  );
};

export default Heroe;
