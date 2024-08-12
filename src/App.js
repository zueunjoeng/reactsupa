import React, { useEffect, useState } from 'react'
import { supabase } from './db/supabaseClient'

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      let { data: petopiaForm, error } = await supabase
        .from('petopiaform')
        .select('*');

      if (error) console.error('Error fetching data:', error)
      else{
        //console.log(petopiaForm);
        setData(petopiaForm)
      } 
    
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>PetopiaForm Data</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            {item.w_name} - {item.w_address} - {item.w_time}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
