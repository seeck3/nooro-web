import React from 'react'

export const Header = () => {
  return (
    <div className="bg-[#0D0D0D] min-w-full sm:h-[200px] h-[150px] max-w-3xl w-full flex flex-col items-center">
                <div className="sm:mt-20 mt-10 flex space-x-4 items-baseline">
          <img src="/rocket.svg" alt="rocket_logo" />
          <h1 className="text-5xl font-extrabold text-white">
            <span className="text-[#4EA8DE]">Todo</span>{" "}
            <span className="text-[#8284FA]">App</span>
          </h1>
        </div>
    </div>
  )
}
