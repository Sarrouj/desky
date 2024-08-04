

const CategoryBtn = ({value} : {value : string}) => {
  return (
    <li className="bg-orange-400 text-white py-1 px-3 rounded-full cursor-pointer text-xs lg:text-sm">{value}</li>
  )
}

export default CategoryBtn
