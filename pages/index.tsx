import { useState } from 'react'
import { useQuery } from 'react-query'
import type { InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import {
  GetPokemonsQuery,
  GetPokemonsDocument,
  GetPokemonByQuerySearchQuery,
  GetPokemonByQuerySearchDocument
} from '../service/graphql'
import { request } from 'graphql-request'
import PokemonCard from '../components/PokemonCard'
import Pagination from '../components/Pagination'
import { MyItem } from '../components/ListBox'
import { MyComboBox } from '../components/ComboBox'
import Header from '../components/Header'

import { useDebounce } from '../hooks/index'

const pokemonEndPoint = `${process.env.NEXT_PUBLIC_POKEMON_URL}`

const Home = ({
  pokeFallback
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [pageSize] = useState<number>(24)

  const offset = (pageIndex - 1) * pageSize
  const totalPokemons = pokeFallback.total.aggregate?.count ?? 0
  const pageCount = Math.ceil(totalPokemons / pageSize) // number of pages
  const lastItem = pageIndex * pageSize
  const firstItem = lastItem - pageSize + 1

  const router = useRouter()

  const { data, isPreviousData } = useQuery(
    ['pokemons', pageIndex],
    async () => {
      const pokeInfo = await request<GetPokemonsQuery>(
        `${pokemonEndPoint}`,
        GetPokemonsDocument,
        {
          limit: pageSize,
          offset: offset
        }
      )
      return pokeInfo
    },
    {
      initialData: pokeFallback,
      keepPreviousData: true,
      refetchOnWindowFocus: false
    }
  )

  const [searchQuery, setSearchQuery] = useState<string>()

  const debouncedSearchQuery = useDebounce<typeof searchQuery>(
    searchQuery,
    600
  )

  const { data: searchResult } = useQuery(
    ['searchResult', debouncedSearchQuery],
    async () => {
      const response = await request<GetPokemonByQuerySearchQuery>(
        `${pokemonEndPoint}`,
        GetPokemonByQuerySearchDocument,
        { query: debouncedSearchQuery }
      )

      return response
    },
    {
      enabled: Boolean(debouncedSearchQuery),
      refetchOnWindowFocus: false
    }
  )

  return (
    <>
      <Head>
        <title>PokeHunt</title>
        <link rel='icon' href='/pikachu.png' />
      </Head>

      <div className='flex w-full flex-col text-center h-screen overflow-hidden'>
        <Header />

        <main className='py-6 flex-1 overflow-y-auto'>
          <div className='px-5 sm:px-10 xl:px-20'>
            <div className='max-w-5xl mx-auto sticky top-0 z-10'>
              <MyComboBox
                className='w-full'
                aria-label='Search Pokemon'
                items={searchResult?.pokemonSearch}
                onInputChange={setSearchQuery}
                placeholder='Search Pokemon'>
                {item => (
                  <MyItem
                    textValue={item.name}
                    aria-label={item.name}
                    href={`/pokemon/${item.id}`}>
                    {item.name}
                  </MyItem>
                )}
              </MyComboBox>
            </div>

            <div className='mt-6 mx-auto max-w-5xl gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
              {data?.pokemon_species.map(poke => (
                <PokemonCard
                  key={poke.id}
                  id={String(poke.id)}
                  name={poke.name}
                  type={
                    poke.pokemon_v2_pokemons[0]
                      .pokemon_v2_pokemontypes[0].pokemon_v2_type
                      ?.name as string
                  }
                />
              ))}
            </div>
          </div>

          <div className='pt-3 mt-4 flex flex-col gap-2 bg-white shadow-inner'>
            <p className='text-sm text-gray-700'>
              Showing
              <> </>
              <span className='font-semibold text-gray-900'>
                {firstItem} - {Math.min(lastItem, totalPokemons)}
              </span>
              <> </>
              of
              <> </>
              <span className='font-semibold text-gray-900'>
                {totalPokemons}
              </span>
              <> </>
              entries
            </p>
            <Pagination
              pageCount={pageCount}
              onPageChange={setPageIndex}
              isDisabled={isPreviousData}
            />
          </div>
        </main>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const pokeData = await request<GetPokemonsQuery>(
    `${pokemonEndPoint}`,
    GetPokemonsDocument,
    {
      limit: 24,
      offset: 0
    }
  )

  return {
    props: {
      pokeFallback: pokeData // fallback data
    }
  }
}

export default Home
