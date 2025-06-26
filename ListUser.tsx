import React from "react";
import { Root } from "./Heroe";
import Spiner from "./Spiner/Spiner";
interface ListaItem {
  FiltroDetalle: Root[];
  estado: boolean;
}


const ListUser = ({ FiltroDetalle, estado }: ListaItem) => {
  const HandleClick = (item: string) => {
    console.log(item);  
  };

  return (
    <> 
      <h1 className="text-3xl mx-5   absolute top-0  md:mx-25 lg:mx-50 my-5">Resultados :</h1>
      <div className="w-[95%]  md:w-[80%] mx-auto  grid   grid-cols-1 md:grid-cols-2 lg:grid-cols-3  cursor-pointer ">
        {FiltroDetalle.map((item, index) => (
          <div
            key={index}
            className={`flex p-2  ${
              !estado && "border  border-gray-50 hover:border-amber-200"
            }  rounded-md m-2 shadow-2xl`}
          >
            <div className="flex flex-col items-center p-2">
              <div className="flex justify-around  w-full p-2 border border-gray-100 rounded-md text-black">
                <h1>{item.name}</h1>

                <h1>{item.base_experience}</h1>
              </div>
              <div className="border border-gray-100 rounded-md p-2 mt-3">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                  fuga tempora mollitia atque rem consequuntur iusto quod ipsum,
                  odio ratione exercitationem officiis blanditiis! Itaque
                  voluptatibus repellendus eos molestiae placeat! Tenetur.
                </p>
              </div>
              <button
                onClick={() => HandleClick(item)}
                className="p-2 border w-full m-2  rounded-md bg-black/80 text-white border-none cursor-pointer "
              >
                Go
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListUser;
