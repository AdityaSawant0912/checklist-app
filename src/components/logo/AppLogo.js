import React from 'react'
import Link from 'next/link'

export const AppLogo = () => {
  return (
    <Link className='flex-grow flex justify-center text-2xl mr-8' href={'/app'}>
    Do Deck
    </Link>
  )
}
