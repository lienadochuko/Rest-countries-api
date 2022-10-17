import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import FullInfo from '../components/FullInfo';

function Home() {
    const [countries, setCountries] = useState([]);
    const [theme, setTheme] = useState(true);
    const [btnswitch, setBtnswitch] = useState('<i class="fas fa-sun"></i> Light Mode')
  
  
    // eslint-disable-next-line
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
    <div className="lg:w-full bg-white-100 dark:bg-gray-900 dark:text-white">
      <div className='w-100% shadow-md py-6 px-3 bg-white dark:bg-gray-700 dark:text-whit mb-16'>
        <div className="flex container mx-auto">
            <h1 className='font-bold -sm md:text-textbase lg:text-xl'>Where in the world?</h1>
            <div className='ml-auto font-medium text-sm md:text-textbase lg:text-xl'>
                <button onClick={() => toggleMode()} dangerouslySetInnerHTML={{__html:btnswitch}}></button>
            </div>
        </div>
      </div>
      <div className='w-full flex flex-col md:flex-row lg:flex-row md:justify-between lg:justify-between container mb-16 mx-auto'>
        <i class='fas fa-search absolute my-auto ml-2 z-10 pr-3 py-3  text-gray-400 rounded-md'></i>
        <input type="text" placeholder="Search for a country..." className='shadow-sm ml-1 pl-10 p-2 rounded-md w-1/2 mb-2 md:w-1/3 lg:w-1/3 dark:bg-grey-700'
        onChange={(word) => searchCountry(word.target.value)}
        />
        <select className="p-2 shadow-md rounded-md font-medium dark:bg-gray-700 mr-1 w-1/2 md:w-1/5 lg:w-40 ml-1 md:ml-0 lg:ml-0" 
        onChange={ val => filterByRegion(val.target.value)}>
            <option value=" ">Filter By Region</option>
            <option value="africa">Africa</option>
            <option value="americas">America</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="Oceania">Oceania</option>
        </select>
      </div>
      <div className='container w-full pl-2 grid grid-cols-2 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-10 mx-auto'>
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
