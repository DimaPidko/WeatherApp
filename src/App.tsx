import { useEffect, useState } from 'react'
import { useFetch } from './hooks/useFetch'

interface DataInfo {
  temp: string | null
  city: string | null
  weather: string | null
  weatherId: number | null
}

function App() {
  const [dataInfoState, setDataInfoState] = useState<DataInfo | object>({})
  const [loading, setLoading] = useState<boolean>(true)
  const [input, setInput] = useState<string>('Харьков')
  
  const fetchData = new useFetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&lang=ru&units=metric&appid=8571b5e13a5b6b0f637a73ac6678a8b4`)
  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const data = await fetchData.getData()
      const dataInfo: DataInfo = {
        temp: data?.main?.temp.toString(),
        city: data?.name,
        weather: data?.weather[0]?.description,
        weatherId: data?.weather[0]?.id,
      };
      setDataInfoState(dataInfo)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  };
  
  useEffect(() => {
    
    fetchWeatherData()
      .catch((error) => console.error(error))
    
  }, [input]);
  
  return (
    <div className="wrapper">
      {loading ?
        <div className='wrapper__box'>
          <h1 className='wrapper__box-title'>Weather</h1>
          <input
            placeholder='City...'
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
            }}
            className='wrapper__box-input'
          />
          <img src='/Spinner.gif' alt='loading...' className='wrapper__box-gif' />
          <div className='wrapper__box__info'>
            <h2>{'city' in dataInfoState ? dataInfoState?.city : ''}</h2>
            <h3>Temp: {Math.floor(dataInfoState?.temp)}</h3>
            <h3>Weather: {dataInfoState?.weather}</h3>
          </div>
        </div>
        :
        <div className='wrapper__box'>
          <h1 className='wrapper__box-title'>Weather</h1>
          <input
            placeholder='City...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="wrapper__box-input"
          />
          <div className='wrapper__box__info'>
            <h2>{'city' in dataInfoState ? dataInfoState?.city : ''}</h2>
            <h3>Temp: {Math.floor(dataInfoState?.temp)}</h3>
            <h3>Weather: {dataInfoState?.weather}</h3>
          </div>
        </div>
      }
    </div>
  );
}

export default App
