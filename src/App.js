
import { useEffect, useState } from 'react';
import axios from 'axios';
//todo va bien
function App() {
  const [personajes, setPersonajes] = useState([]);
  


  async function registerSW() {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/sw.js`);
        console.log('Service Worker registered successfully');
      } catch (error) {
        console.error('Error registering Service Worker:', error);
      }
    }
  }


  useEffect(() => {
    
  
    registerSW();

    axios
      .get('https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=9803ed889012f2c835d4fa6a264efc59&hash=86b757131896422f613e783ae43678f9')
      .then((res) => {
        setPersonajes(res.data.data.results);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(personajes);

  return (
    <div className='App'>
      <div className='row row-cols-1 row-cols-md-3 g-4'>
        {personajes.map((per) => (
          <div className='col' key={per.id}>
            <div className='card' style={{ width: '18rem', height: '18rem' }}>
              <img src={`${per.thumbnail.path}.${per.thumbnail.extension}`} className='card-img-top' style={{width:"80%", height:"80%"}}/>
              <div className='card-body'>
                <p className='card-text'>{per.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;



