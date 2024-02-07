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
import {
  formatId,
  getPokemonImage,
  heightInMeter,
  weightInKg
} from '../../lib/utils'
import { Item, Value, Name } from '../../components/DataComponets'
import Blur from '../../components/Blur'

const pokemonEndPoint = `${process.env.NEXT_PUBLIC_POKEMON_URL}`

const PokemonInfo = ({
  pokemon
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [{ id, name, pokemon_v2_pokemons, pokemon_v2_generation }] =
    pokemon
  const [
    {
      pokemon_v2_pokemonstats,
      pokemon_v2_pokemontypes,
      pokemon_v2_pokemonabilities,
      height,
      weight
    }
  ] = pokemon_v2_pokemons

  const imageSrc = getPokemonImage(id)
  return (
    <>
      <Head>
        <title>PokeHunt | {name}</title>
        <link rel='icon' href='/pikachu.png' />
      </Head>

      <Header />

      <main className='p-5 flex flex-col items-center md:flex-row md:items-start max-w-5xl mx-auto gap-4'>
        <div className='max-w-sm flex-initial rounded-xl relative'>
          <Blur
            bgColor={
              pokemon_v2_pokemontypes[0].pokemon_v2_type
                ?.name as string
            }
          />
          <h5 className='text-2xl tracking-tight text-gray-900 dark:text-white capitalize'>
            {name}{' '}
            <span className='ml-2 text-gray-600'>
              #{formatId(String(id))}
            </span>
          </h5>
          <Image
            src={imageSrc}
            layout='intrinsic'
            width={512}
            height={512}
            alt={`Image of ${name}`}
          />
          <div className='flex flex-col gap-2'>
            <h4 className='uppercase text-gray-700'>
              {pokemon_v2_generation?.name}
            </h4>
          </div>
        </div>

        <div className='md:mx-auto grid grid-cols-2 gap-7 justify-between sm:mt-8 relative'>
          <Blur
            bgColor={
              pokemon_v2_pokemontypes[0].pokemon_v2_type
                ?.name as string
            }
          />
          {pokemon_v2_pokemonstats.map(stat => (
            <Item
              key={stat.id}
              name={stat.pokemon_v2_stat?.name}
              value={stat.base_stat}
            />
          ))}
          <Item
            name='Types'
            value={pokemon_v2_pokemontypes.map(type => (
              <span key={type.pokemon_v2_type?.id}>
                {type.pokemon_v2_type?.name ?? ''}
              </span>
            ))}
          />

          <Item
            name='Height'
            value={heightInMeter(height as number)}
          />
          <Item name='Weight' value={weightInKg(weight as number)} />

          <div>
            <Name>Abilities:</Name>
            <ul>
              {pokemon_v2_pokemonabilities.map(
                ({ pokemon_v2_ability }) => (
                  <li key={pokemon_v2_ability?.name}>
                    <Value>{pokemon_v2_ability?.name}</Value>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </main>
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
