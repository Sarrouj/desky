import { useEffect, useState } from "react";

const CategoryBtnCard = ({value} : {value : string}) => {
  let [category, setCategory] = useState('');
  useEffect(() => {
      if(value.includes(" ")){
        let parts = value.split(" ");
        setCategory(`${parts[0]}`);
      }else{
        setCategory(value);
      }
  }, [value]);
  return (
    <li className="bg-orange-400 text-white py-1 px-3 rounded-full cursor-pointer
      text-xs 
    ">{category}</li>
  )
}

export default CategoryBtnCard
