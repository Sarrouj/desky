

const CategoryBtn = ({value} : {value : string | number}) => {
  return (
    <li className="bg-orange-300 text-white py-1 px-3 rounded-full">{value}</li>
  )
}

export default CategoryBtn
