import { useState } from 'react'
import { useQuery } from 'react-query'
import type { InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import {
  GetPokemonsQuery,
  GetPokemonsDocument,
  SearchPokemonsQuery,
  SearchPokemonsDocument
} from '../service/graphql'
import { request } from 'graphql-request'
import PokemonCard from '../components/PokemonCard'
import SearchBox from '../components/SearchBox'
import Pagination from '../components/Pagination'
import ListResults from '../components/ListResults'
import Header from '../components/Header'

import { useDebounce } from '../hooks/index'

const pokemonEndPoint = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}`
const pokemonToken = `${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}`

const Home = ({
  pokeFallback
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [pageSize] = useState<number>(24)
  const totalPokemons =
    pokeFallback.pokemon_aggregated[0].count?.id ?? 0

  const router = useRouter()

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
      const response = await request<SearchPokemonsQuery>(
        `${pokemonEndPoint}/graphql`,
        SearchPokemonsDocument,
        { name: debouncedSearchQuery },
        {
          authorization: `Bearer ${pokemonToken}`
        }
      )

      return response
    },
    {
      enabled: !!debouncedSearchQuery,
      refetchOnWindowFocus: false
    }
  )

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
            {searchResult && (
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
            )}
          </div>

          <div className='mt-6 mx-auto flex max-w-5xl flex-wrap gap-6 items-center justify-center'>
            {data?.pokemon.map(poke => (
              <PokemonCard
                key={poke.id}
                id={poke.id}
                name={poke.name}
                imageSrc={`${pokemonEndPoint}/assets/${poke.image?.id}?access_token=${pokemonToken}`}
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
    `${pokemonEndPoint}/graphql`,
    GetPokemonsDocument,
    {
      limit: 24,
      page: 1
    },
    {
      authorization: `Bearer ${pokemonToken}`
    }
  )

  return {
    props: {
      pokeFallback: pokeData // fallback data
    }
  }
}

export default Home
