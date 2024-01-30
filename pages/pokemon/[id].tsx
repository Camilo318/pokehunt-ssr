import { request } from 'graphql-request'
import {
  GetPokemonByIdQuery,
  GetPokemonByIdDocument
} from '../../service/graphql'

import Image from 'next/image'
import Head from 'next/head'

import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType
} from 'next'

import Header from '../../components/Header'
import { formatId, getPokemonImage } from '../../lib/utils'

const pokemonEndPoint = `${process.env.NEXT_PUBLIC_POKEMON_URL}`

const PokemonInfo = ({
  pokemon
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [{ id, name, pokemon_v2_pokemons, pokemon_v2_generation }] =
    pokemon
  const [{ pokemon_v2_pokemonstats, pokemon_v2_pokemontypes }] =
    pokemon_v2_pokemons

  const imageSrc = getPokemonImage(id)
  return (
    <>
      <Header />
      <div className='max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'>
        <Head>
          <title>PokeHunt | {name}</title>
          <link rel='icon' href='/pikachu.png' />
        </Head>
        <div className='p-5'>
          <Image
            src={imageSrc}
            layout='intrinsic'
            width={512}
            height={512}
            alt={`Image of ${name}`}
          />

          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
            {name}
          </h5>
          <h4>{pokemon_v2_generation?.name}</h4>
          {pokemon_v2_pokemonstats.map(stat => (
            <p
              key={stat.id}
              className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
              {stat.pokemon_v2_stat?.name}: {stat.base_stat}
            </p>
          ))}

          <button className='inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
            Read more
          </button>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async ({
  params
}: GetServerSidePropsContext) => {
  const { id } = params as Record<string, string | number>

  const pokeInfo = await request<GetPokemonByIdQuery>(
    `${pokemonEndPoint}`,
    GetPokemonByIdDocument,
    {
      id
    }
  )
  return {
    props: {
      pokemon: pokeInfo.pokemon
    }
  }
}

export default PokemonInfo
