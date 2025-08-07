export default function Search(){
  return(
    <div className="w-2/3 relative max-sm:w-full">
      <input
        className="w-full h-full bg-white rounded px-2 py-1.5 focus:outline-none text-black text-sm"
        placeholder="Search a Product..."
      />
    </div>
  )
}