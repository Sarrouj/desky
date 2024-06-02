import { useEffect, useState } from "react";

const CategoryBtnCard = ({value} : {value : string}) => {
  let [category, setCategory] = useState('');
  useEffect(() => {
      const maxLength: number = 20;
      const length: number = value.length;
      if (length > maxLength) {
        setCategory(value.substring(0, maxLength) + "...");
      }else{
        setCategory(value);
      }
  }, [value]);
  return (
    <li className="bg-orange-300 text-white py-1 px-3 rounded-full cursor-pointer">{category}</li>
  )
}

export default CategoryBtnCard
