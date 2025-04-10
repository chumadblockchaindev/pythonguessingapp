import { useNavigate } from "react-router-dom"

const Hero = () => {
  const navigate = useNavigate()
  return (
    <div>
            <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>

      <div className='flex justify-center mt-12'> 
        <div className='flex flex-col md:flex-row justify-around md:items-center space-y-8 md:space-x-8'>
          <div className='md:w-xl flex flex-col space-y-4'>
            <h2 className='text-2xl md:text-3xl text-amber-700 font-medium'>Python Guessing <br className='block md:hidden' /> Game </h2>
            <p className='w-[200px] md:w-full'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor iure alias quod ad repellat amet, quo, saepe explicabo rem non minima delectus maiores quisquam atque nihil.</p>
            <div>
              <button onClick={() => navigate("/login")} type="button" className='p-4 bg-amber-700 text-white rounded-full cursor-pointer shadow-black drop-shadow-lg'>Play Game</button>
            </div>
          </div>
          <div>
            <img src="game-image.jpg" alt="" className='w-3xs md:w-xs shadow-black drop-shadow-lg'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero