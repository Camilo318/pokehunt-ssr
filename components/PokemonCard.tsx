import Link from 'next/link'
import Image from 'next/image'

const PokemonCard = ({
  id,
  name = 'Pokemon',
  imageSrc
}: {
  id: string
  name?: string | null
  imageSrc: string
}) => {
  return (
    <Link href={`/pokemon/${id}`}>
      <a className='flex-1 max-w-[350px] basis-64 shrink-0 rounded-xl border p-6 text-left'>
        <h3 className='mb-3 text-2xl text-slate-900 font-bold hover:text-blue-600 focus:text-blue-600'>
          {name} &rarr;
        </h3>

        <Image
          src={imageSrc}
          layout='intrinsic'
          width={400}
          height={300}
        />
      </a>
    </Link>
  )
}

export default PokemonCard
