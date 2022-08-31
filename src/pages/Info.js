import React, { useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom';

function Info() {
  const [theme, setTheme] = useState(true);
  const [btnswitch, setBtnswitch] = useState('<i class="far fa-sun"></i> Light Mode')

  const toggleMode = () => {
    if(theme){
        document.documentElement.classList.add('dark')
        setBtnswitch('<i class="far fa-moon"></i> Dark Mode')
        setTheme(current => current = !current)
    }
    if(!theme){
        document.documentElement.classList.remove('dark')
        setTheme(current => current = !current)
        setBtnswitch('<i class="far fa-sun"></i> Light Mode')
    }
}

let {state} = useLocation()
let history = useHistory()


const goback = () => history.push('/')

  return (
    <div className='bg-white-100 dark:bg-gray-800 dark:text-white'>
      <div className='w-screen shadow-md py-6 px-3 bg-white dark:bg-gray-700 dark:text-white mb-16'>
      <div className="flex container mx-auto">
      <h1 className='font-bold text-xl'>Where in the world?</h1>
            <div className='ml-auto font-medium'>
                <button onClick={() => toggleMode()} dangerouslySetInnerHTML={{__html:btnswitch}}></button>
            </div>
      </div>
      </div>
      <div className='container mx-auto mb-16'>
        <button className='px-8 py-2 bg-white text-gray-600 shadow-md 
        rounded-lg tracking-wide dark:bg-gray-700 dark:text-white'
        onClick={() => goback()}
        >
        <i class='fas fa-arrow-left text-gray fs-1 mr-2'></i>Back
        </button>
      </div>
      <div className='container flex mx-auto p-8 pl-0 pr-0'>
        <img src={state.flag} className='w-1/3 h-1/5 pr-10 ' alt={state.name}></img>
        <div className='p-8 pl-10 mt-3 ml-14'>
          <h2 className='font-bold text-2xl mb-8'>{state.name}</h2>
          <div className='flex'>
          <div className='space-y-2 text-base'>
            <p><b>Native Name: </b>{state.nativeName}</p>
            <p><b>Population: </b>{state.population}</p>
            <p><b>Region: </b> {state.region}</p>
            <p><b>Sub Region: </b>{state.subregion}</p>
            <p><b>Capital: </b>{state.capital}</p>
          </div>
          <div className='space-y-2 text-base ml-28'>
            <p><b>Top Level Domain: </b>{state.topLevelDomain}</p>
            <p><b>Currencies: </b>{state.currencies.map(cur => cur.name)}</p>
            <p><b>Languages: </b>{state.languages.map(lang => lang.name+', ')}</p>
            
            </div>
          </div>
          <div className="flex mt-16 ml-0">
            <b className='mt-1'>Border Countries: </b> <p className=' text-xs ml-3 px-8 py-2 bg-white text-gray-600 shadow-md 
        rounded-lg tracking-wide dark:bg-gray-700 dark:text-white'>{state.borders+' ,'} </p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Info
