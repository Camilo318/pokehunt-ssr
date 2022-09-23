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

const pokemonEndPoint = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}`
const pokemonToken = `${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}`

const Home = ({
  pokefallback
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [pageIndex, setPageIndex] = useState<number>(1)
  const totalPokemons = pokefallback.pokemon_aggregated[0].count?.id
  const pageSize = 20
  const pageCount =
    totalPokemons && Math.ceil(totalPokemons / pageSize)

  const { data, isFetching, isPreviousData } = useQuery(
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

  const pagesArray = Array.from(
    { length: pageCount as number },
    (_, index) => index + 1
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

        <div className='pt-2 flex flex-col gap-2 bg-white shadow-inner fixed bottom-0 left-0 right-0'>
          <span>{`${pageIndex} of ${pageCount}`}</span>
          <div className='pb-8 px-4 flex justify-center gap-2 min-w-0 overflow-x-scroll'>
            <button
              className={`md:p-2 rounded py-2 text-gray-800 p-2 ${
                pageIndex === 1 || isPreviousData
                  ? 'bg-gray-300'
                  : 'bg-blue-400'
              }`}
              disabled={pageIndex === 1 || isPreviousData}
              onClick={() => setPageIndex(page => page - 1)}>
              Previous
            </button>
            {pagesArray.map(page => (
              <button
                key={page}
                className={`md:p-2 rounded py-2 text-gray-800 p-2 ${
                  page === pageIndex ? 'bg-blue-300' : 'bg-blue-200'
                }`}
                disabled={isPreviousData}
                onClick={() => setPageIndex(page)}>
                {page}
              </button>
            ))}
            <button
              className={`md:p-2 rounded py-2 text-gray-800 p-2 ${
                pageIndex === pageCount || isPreviousData
                  ? 'bg-gray-300'
                  : 'bg-blue-400'
              }`}
              disabled={pageIndex === pageCount || isPreviousData}
              onClick={() => setPageIndex(page => page + 1)}>
              Next
            </button>
          </div>

          {isFetching ? (
            <span className='absolute bottom-1 left-[50%] translate-x-[-50%]'>
              {' '}
              Loading...
            </span>
          ) : null}
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
