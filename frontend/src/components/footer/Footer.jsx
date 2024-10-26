
const Footer = () => {
  return (
    <div className='py-3 bg-black  relative text-white'>
        <div className=" bg-black  text-white absolute   w-full  py-10 z-50  md:py-10  ">
         <div className=' container flex gap-3 items-center'>
            <h1 className='text-md text-gray-400'>Built by <span className='underline font-medium'> Dipesh </span> </h1>
            <span className='flex text-sm text-gray-400'>The source code is available on  <span className='hover:underline ml-1'> Github </span></span>
         </div>
        </div>
    </div>
  )
}

export default Footer