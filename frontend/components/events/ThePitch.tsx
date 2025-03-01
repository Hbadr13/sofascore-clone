const ThePitch = () => {
    return <div className='flex  w-full h-full  absolute z-10 top-0 overflow-hidden'>
        {
            Array.from({ length: 14 }, (_, i) => i + 1).map((item, index) => <div key={index} className={` h-[400px] w-[8.14%] ${item % 2 == 1 ? 'bg-[#cbedbf]' : 'bg-[#c1e1b6]'} `} />
            )
        }
        <div className=' w-full h-full  absolute z-10 top-0'>
            <div className="w-full  h-full items-center flex justify-center absolute z-10 ">
                <div className=" h-[120px] w-[120px]  border-2 border-white rounded-full" />
                <div className="w-[2px] h-full absolute bg-white" />
            </div>
            <div className=" relative h-full  z-10  left-0 flex items-center">
                <div className="  flex justify-center absolute z-10  -left-[2px]">
                    <div className=" h-[150px] w-[53px] border-2 border-white" />
                </div>
                <div className="   flex justify-center absolute z-10 -left-[2px]">
                    <div className=" h-[80px] w-[30px] border-2 border-white" />
                </div>
                <div className="  w-[100px] left-[50px] overflow-hidden flex justify-center absolute z-0">
                    <div className=" h-[80px] w-[80px]  right-[70px]  border-2 border-white rounded-full  relative" />
                </div>
                <div className="  flex justify-center absolute z-10  -right-[2px]">
                    <div className=" h-[150px] w-[53px] border-2 border-white" />
                </div>
                <div className="   flex justify-center absolute z-10 -right-[2px]">
                    <div className=" h-[80px] w-[30px] border-2 border-white" />
                </div>
                <div className="  w-[100px] right-[50px] overflow-hidden flex justify-center absolute z-0">
                    <div className=" h-[80px] w-[80px]  left-[70px]  border-2 border-white rounded-full  relative" />
                </div>
            </div>
            <div className=" absolute z-10 -bottom-[25px] -right-[25px] h-[37px] w-[37px]  border-2 border-white rounded-full" />
            <div className=" absolute z-10 -top-[25px] -right-[25px] h-[37px] w-[37px]  border-2 border-white rounded-full" />
            <div className=" absolute z-10 -bottom-[25px] -left-[25px] h-[37px] w-[37px]  border-2 border-white rounded-full" />
            <div className=" absolute z-10 -top-[25px] -left-[25px] h-[37px] w-[37px]  border-2 border-white rounded-full" />
        </div>
    </div>
}
export default ThePitch