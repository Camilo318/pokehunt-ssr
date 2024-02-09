import Link from 'next/link'
import Image from 'next/image'
import { getPokemonImage } from '../lib/utils'
import Blur from './Blur'

const PokemonCard = ({
  id,
  name = 'Pokemon',
  type
}: {
  id: string
  name?: string | null
  type: string
}) => {
  const imageSrc = getPokemonImage(id)
  return (
    <Link href={`/pokemon/${id}`}>
      <a className='card md:p-6 text-left'>
        <Blur bgColor={type} />
        <h3 className='mb-3 text-2xl text-slate-900 font-bold hover:text-blue-600 focus:text-blue-600 capitalize'>
          {name} &rarr;
        </h3>

        <Image
          src={imageSrc}
          layout='intrinsic'
          width={512}
          height={512}
          alt={`Image of ${name}`}
        />
      </a>
    </Link>
  )
}

export default PokemonCard
