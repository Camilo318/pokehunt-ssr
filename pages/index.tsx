import { useState } from 'react'
import { useQuery } from 'react-query'
import type { InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import {
  GetPokemonsQuery,
  GetPokemonsDocument
} from '../service/graphql'
import { request } from 'graphql-request'
import PokemonCard from '../components/PokemonCard'
import SearchBox from '../components/SearchBox'
import Pagination from '../components/Pagination'
import ListResults from '../components/ListResults'
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

  // const { data: searchResult } = useQuery(
  //   ['searchResult', debouncedSearchQuery],
  //   async () => {
  //     const response = await request<SearchPokemonsQuery>(
  //       `${pokemonEndPoint}/graphql`,
  //       SearchPokemonsDocument,
  //       { name: debouncedSearchQuery },
  //       {
  //         authorization: `Bearer ${pokemonToken}`
  //       }
  //     )

  //     return response
  //   },
  //   {
  //     enabled: Boolean(debouncedSearchQuery),
  //     refetchOnWindowFocus: false
  //   }
  // )

  return (
    <>
      <Head>
        <title>PokeHunt</title>
        <link rel='icon' href='/pikachu.png' />
      </Head>

      <div className='flex w-full flex-col text-center h-screen'>
        <Header />

        <main className='px-5 py-6 flex-1 overflow-y-auto sm:px-10 xl:px-20'>
          <div className='max-w-5xl mx-auto sticky top-0 z-10'>
            <SearchBox
              name='q'
              handleSearch={(event, query) => {
                event.preventDefault()
                router.push({
                  pathname: '/',
                  query: { q: query }
                })
              }}
              onChange={setSearchQuery}
            />
            {/* {searchResult && (
              <div className='mt-1 absolute inset-x-0 z-10'>
                <ListResults
                  items={searchResult.pokemon}
                  renderItem={item => (
                    <Link href={`/pokemon/${item.id}`}>
                      <a className='py-2 px-4 block'>{item.name}</a>
                    </Link>
                  )}
                />
              </div>
            )} */}
          </div>

          <div className='mt-6 mx-auto flex max-w-5xl flex-wrap gap-6 items-center justify-center'>
            {data?.gen3_species.map(poke => (
              <PokemonCard
                key={poke.id}
                id={String(poke.id).padStart(3, '0')}
                name={poke.name}
              />
            ))}
          </div>
        </main>

        <footer className='py-2 flex flex-col gap-2 bg-white shadow-inner'>
          <Pagination
            total={totalPokemons}
            pageSize={pageSize}
            onPageChange={setPageIndex}
            disabled={isPreviousData}
          />
        </footer>
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
