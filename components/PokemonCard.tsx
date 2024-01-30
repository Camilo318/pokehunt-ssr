import Link from 'next/link'
import Image from 'next/image'
import { getPokemonImage } from '../lib/utils'

const PokemonCard = ({
  id,
  name = 'Pokemon'
}: {
  id: string
  name?: string | null
}) => {
  const imageSrc = getPokemonImage(id)
  return (
    <Link href={`/pokemon/${id}`}>
      <a className='flex-1 max-w-[350px] basis-64 shrink-0 rounded-xl border p-6 text-left'>
        <h3 className='mb-3 text-2xl text-slate-900 font-bold hover:text-blue-600 focus:text-blue-600'>
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
