import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import FullInfo from '../components/FullInfo';

function Home() {
    const [countries, setCountries] = useState([]);
    const [theme, setTheme] = useState(true);
    const [btnswitch, setBtnswitch] = useState('<i class="fas fa-sun"></i> Light Mode')

    useEffect(async () => {
        const response = await fetch('https://restcountries.com/v2/all')
        const data = await response.json()
        await setCountries(data)
    }, [])

    const toggleMode = () => {
        if(theme){
            document.documentElement.classList.add('dark')
            setBtnswitch('<i class="fas fa-moon"></i> Dark Mode')
            setTheme(current => current = !current)
        }
        if(!theme){
            document.documentElement.classList.remove('dark')
            setTheme(current => current = !current)
            setBtnswitch('<i class="fas fa-sun"></i> Light Mode')
        }
    }

    const searchCountry = async word => {
        if(word.length<3 || word === '') return
          const response = await fetch (`https://restcountries.com/v2/name/${word}`)
          const data = await response.json()
          await setCountries(data)
    }

    const filterByRegion = async region => {
        if(region === "" ) return
        const response = await fetch(`https://restcountries.com/v2/region/${region}`)
        const data = await response.json()
        await setCountries(data)
    }
    
  return (
    <div className="bg-white-100 dark:bg-gray-900 dark:text-white">
      <div className='w-screen shadow-md py-6 px-3 bg-white dark:bg-gray-700 dark:text-whit mb-16'>
        <div className="flex container mx-auto">
            <h1 className='font-bold text-xl'>Where in the world?</h1>
            <div className='ml-auto font-medium'>
                <button onClick={() => toggleMode()} dangerouslySetInnerHTML={{__html:btnswitch}}></button>
            </div>
        </div>
      </div>
      <div className='flex container mx-auto mb-16'>
        <i class='fas fa-search my-auto -mr-9 z-10 pr-3 py-5 text-gray-400 rounded-md'></i>
        <input type="text" placeholder="Search for a country..." className='pl-10 p-2 rounded-md w-1/3 dark:bg-grey-700'
        onChange={(word) => searchCountry(word.target.value)}
        />
        <select className="ml-auto my-2 p-2 shadow-md rounded-md font-medium dark:bg-gray-700" 
        onChange={ val => filterByRegion(val.target.value)}>
            <option value=" ">Filter By Region</option>
            <option value="africa">Africa</option>
            <option value="americas">America</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="Oceania">Oceania</option>
        </select>
      </div>
      <div className='container grid grid-cols-4 gap-16 mx-auto'>
        { countries.map( (country, index ) => <Link to={{ pathname:'Info', state:country}} key={index}>
        <FullInfo 
            title={country.name}
            image_url={country.flag}
            population={country.population}
            region={country.region}
            capital={country.capital}
        />
        </Link>)}
        
      </div>
    </div>
  )
}

export default Home
