import React from 'react'

const Contact = () => {
  return (
    <div>
    <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
      <div className='flex flex-row items-center p-12 bg-[url(/customer-care.jpg)] bg-origin-border bg-left-top bg-no-repeat md:bg-none -z-0'>
        <div className='md:basis-1/3 mt-12 rounded-2xl'>
          <div className='space-y-4 drop-shadow-2xl shadow-black'>
          <h2 className='text-2xl font-semibold text-amber-700'>Contact Us</h2>
              <form className='space-y-4'>
                <div>
                  <label htmlFor="emailid">Email:</label>
                  <input type="text" name='emailid' placeholder='email' className='border-1 rounded-3xl p-2 w-full'/>
                </div>
                <div>
                  <label htmlFor="address">Address:</label>
                  <input type="address" name='address' placeholder='address' className='border-1 rounded-3xl p-2 w-full'/>
                  </div>
                <div>
                  <label htmlFor="contact">Contact:</label>
                  <input type="tel" name='contact' placeholder='contact' className='border-1 rounded-3xl p-2 w-full'/>
                  </div>
                <div>
                  <label htmlFor="Message">Message us:</label>
                  <textarea id="w3review" placeholder='write a message...' name="w3review" rows={4} cols={50} className='border-2 rounded-2xl w-full p-4'/>
                  </div>
                  <button type="button" className='p-4 bg-amber-700 text-white rounded-full cursor-pointer shadow-black drop-shadow-lg'>Submit</button>
                </form>
          </div>
        </div>
        <div className='hidden md:block md:basis-2/3'>
          <img src="/customer-care.jpg" alt="#" className='place-self-end' />
        </div>
      </div>
    </div>
  )
}

export default Contact