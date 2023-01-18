import Link from 'next/link'

function Header() {
  return (
    <header className='w-full h-16 shadow-md relative z-10'>
      <div className='px-4 flex justify-between items-center h-full bg-white'>
        <h2 className='text-2xl font-medium'>
          <Link href={'/'}>
            <a>Poke Hunt</a>
          </Link>
        </h2>
      </div>
    </header>
  )
}

export default Header
