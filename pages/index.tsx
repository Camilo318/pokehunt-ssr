import type { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import { useQuery } from 'react-query'
import {
  GetPokemonsQuery,
  GetPokemonsDocument,
  Pokemon
} from '../service/graphql'
import { request } from 'graphql-request'
import PokemonCard from '../components/PokemonCard'

const pokemonEndPoint = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}`
const pokemonToken = `${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}`

const Home = ({
  pokefallback
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data } = useQuery(
    'pokemons',
    async () => {
      const pokeInfo = await request<GetPokemonsQuery>(
        `${pokemonEndPoint}/graphql`,
        GetPokemonsDocument,
        {
          limit: 20
        },
        {
          authorization: `Bearer ${pokemonToken}`
        }
      )

      return pokeInfo
    },
    {
      initialData: pokefallback
    }
  )

  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-2'>
      <Head>
        <title>PokeHunt</title>
        <link rel='icon' href='/pikachu.png' />
      </Head>

      <main className='flex w-full flex-1 flex-col items-center justify-center px-5 sm:px-10 xl:px-20 text-center'>
        <h1 className='mt-6 text-2xl md:text-6xl font-bold'>
          Welcome to<> </>
          <span className='inline-block text-blue-600'>
            PokeHunt!
          </span>
        </h1>

        <p className='mt-4 text-lg md:text-2xl'>
          Gotta catch 'em all
        </p>

        <div className='my-6 flex max-w-5xl flex-wrap gap-6 items-center justify-center sm:w-full'>
          {data?.pokemon.map(poke => (
            <PokemonCard
              key={poke.id}
              pokemon={poke as Pokemon}
              endpoint={pokemonEndPoint}
              token={pokemonToken}
            />
          ))}
        </div>
      </main>

      <footer className='flex h-24 w-full items-center justify-center border-t'>
        <a
          className='flex items-center gap-2'
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'>
          Powered by<> </>
          <Image
            src='/vercel.svg'
            alt='Vercel Logo'
            width={72}
            height={16}
          />
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const pokeInfo = await request<GetPokemonsQuery>(
    `${pokemonEndPoint}/graphql`,
    GetPokemonsDocument,
    {
      limit: 20
    },
    {
      authorization: `Bearer ${pokemonToken}`
    }
  )

  return {
    props: {
      pokefallback: pokeInfo // fallback data
    }
  }
}

export default Home
