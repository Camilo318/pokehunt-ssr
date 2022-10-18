import { request } from 'graphql-request'
import {
  GetPokemonByIdQuery,
  GetPokemonByIdDocument,
  Pokemon
} from '../../service/graphql'

import Image from 'next/image'
import Head from 'next/head'

import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType
} from 'next'

const pokemonEndPoint = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}`
const pokemonToken = `${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}`

const PokemonInfo = ({
  pokemon
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className='max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'>
      <Head>
        <title>PokeHunt | {pokemon.name}</title>
        <link rel='icon' href='/pikachu.png' />
      </Head>
      <div className='p-5'>
        <Image
          src={`${pokemonEndPoint}/assets/${pokemon?.image?.id}?access_token=${pokemonToken}`}
          layout='intrinsic'
          width={400}
          height={300}
        />

        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {pokemon?.name}
        </h5>

        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
          {pokemon?.attack}
        </p>
        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
          {pokemon?.defense}
        </p>
        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
          {pokemon?.hp}
        </p>
        <button className='inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
          Read more
        </button>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({
  params
}: GetServerSidePropsContext) => {
  const { id } = params as Record<string, string | number>

  const pokeInfo = await request<GetPokemonByIdQuery>(
    `${pokemonEndPoint}/graphql`,
    GetPokemonByIdDocument,
    {
      id
    },
    {
      authorization: `Bearer ${pokemonToken}`
    }
  )
  return {
    props: {
      pokemon: pokeInfo['pokemon_by_id'] as Pokemon
    }
  }
}

export default PokemonInfo
