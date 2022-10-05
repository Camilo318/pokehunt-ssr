import type { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'

import { useQuery } from 'react-query'
import {
  GetPokemonsQuery,
  GetPokemonsDocument,
  Pokemon
} from '../service/graphql'
import { request } from 'graphql-request'
import PokemonCard from '../components/PokemonCard'
import SearchBox from '../components/SearchBox'
import { useState } from 'react'
import Pagination from '../components/Pagination'

const pokemonEndPoint = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}`
const pokemonToken = `${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}`

const Home = ({
  pokefallback
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [pageSize] = useState<number>(24)
  const totalPokemons =
    pokefallback.pokemon_aggregated[0].count?.id ?? 0

  const { data, isPreviousData } = useQuery(
    ['pokemons', pageIndex],
    async () => {
      const pokeInfo = await request<GetPokemonsQuery>(
        `${pokemonEndPoint}/graphql`,
        GetPokemonsDocument,
        {
          limit: pageSize,
          page: pageIndex
        },
        {
          authorization: `Bearer ${pokemonToken}`
        }
      )
      return pokeInfo
    },
    {
      initialData: pokefallback,
      keepPreviousData: true,
      refetchOnWindowFocus: false
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

        <p className='my-4 text-lg md:text-2xl'>
          Gotta catch 'em all
        </p>

        <SearchBox
          name='q'
          handleSearch={e => {
            e.preventDefault()
            const target = e.target as typeof e.target & {
              q: { value: string }
            }
            target.q.value
          }}
        />

        <div className='my-6 pb-24 flex max-w-5xl flex-wrap gap-6 items-center justify-center sm:w-full'>
          {data?.pokemon.map(poke => (
            <PokemonCard
              key={poke.id}
              pokemon={poke as Pokemon}
              endpoint={pokemonEndPoint}
              token={pokemonToken}
            />
          ))}
        </div>

        <div className='py-5 flex flex-col gap-3 bg-white shadow-inner fixed bottom-0 inset-x-0'>
          <Pagination
            total={totalPokemons}
            pageSize={pageSize}
            onPageChange={setPageIndex}
            disabled={isPreviousData}
          />
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const pokeInfo = await request<GetPokemonsQuery>(
    `${pokemonEndPoint}/graphql`,
    GetPokemonsDocument,
    {
      limit: 20,
      page: 1
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
