import { useNavigate } from "react-router-dom"

const About = () => {
    const navigate = useNavigate()

  return (
    <div className='bg-gradient-to-r from-pink-100 via-white to-pink-500 p-8' id="about">
      <div className='mt-12 space-y-4'>
            <div className='flex flex-col items-center space-y-4'>
                <h1 className='font-medium text-2xl text-amber-700 drop-shadow-2xl shadow-black'>About PyGuess Game</h1>
                <p className='md:w-3xl leading-7'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum delectus quas, repudiandae deserunt nostrum omnis repellendus dolore animi minima? Eligendi animi corporis beatae cumque odio adipisci, aliquam voluptate tempora unde mollitia at non dignissimos sint explicabo quo sit voluptates. Maiores?</p>
                <button onClick={() => navigate("/login")} type="button" className='p-4 bg-amber-700 text-white rounded-full cursor-pointer shadow-black drop-shadow-lg'>Start Playing</button>
            </div>
            <div className='space-y-4'>
                <div className='md:grid md:grid-cols-3 gap-4'>
                <div className='p-8 leading-7'>
                <h2 className='font-medium text-xl text-amber-700 drop-shadow-2xl shadow-black'>How to Play</h2>
                    <div>
                        <h3 className='font-medium text-amber-500'>Step 1:</h3>
                        <p>Register to play Game</p>
                    </div>
                    <div>
                        <h3 className='font-medium text-amber-500'>Step 2:</h3>
                        <p>After Registeration, Login into your account</p>
                    </div>
                    <div>
                        <h3 className='font-medium text-amber-500'>Step 3:</h3>
                        <p>Fill the Game form, by choosing difficulity level</p>
                    </div>
                    <div>
                        <h3 className='font-medium text-amber-500'>Step 4:</h3>
                        <p>Challenge people all around the world</p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About