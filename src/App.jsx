import { useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import Spinner from './Spinner'
import './App.css';
import Avatar from './Avatar';


function App() {
  const [name, setName] = useState("")
  const [findCharacter, { data, loading, error }] = useLazyQuery(
    gql`
      query ($id: ID!){
          character(id: $id) {
          name
            image
            episode {
              name
              episode
              id
            }
          }
      }
  `
  )


  const generateID = () => {
    const id = ((name.length % 826) * 20) + 10

    findCharacter({ variables: { id: id } })

    console.log({ data, error, loading })

  }

  const handleChange = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }

  return (
    <div className="App">

      {/*CREDITS https://codepen.io/tommysmall92/pen/oPjaNW */}
      <main>

        <div className="container">
          <h1>Know Your Rick N Morty</h1>
          <h2>Enter your full name to reveal your character from Rick N Morty</h2>
          <div className="search-box">
            <div className="search-icon"><i className="fa fa-search search-icon"></i></div>
            <input type="text" onChange={(e) => handleChange(e)} value={name} placeholder="Enter full name" id="search" autoComplete="off" />
            <svg className="search-border" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnsa="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" x="0px" y="0px" viewBox="0 0 671 111" style={{ enableBackground: "new 0 0 671 111" }}
              xmlSpace="preserve">
              <path className="border" d="M335.5,108.5h-280c-29.3,0-53-23.7-53-53v0c0-29.3,23.7-53,53-53h280" />
              <path className="border" d="M335.5,108.5h280c29.3,0,53-23.7,53-53v0c0-29.3-23.7-53-53-53h-280" />
            </svg>
            <div onClick={generateID} className="go-icon"><i className="fa fa-arrow-right"></i></div>
          </div>
        </div>


        {
          loading && <Spinner />
        }

        {
          !loading && error && <h1>An Error Occurred. Please try again</h1>
        }

        {
          !loading && !error && data && <div>
            <br />
            <Avatar url={data.character.image} name={data.character.name} />
            <h1>Episodes</h1>
            <ul>
              {
                data.character.episode.map(
                  (e) => <li style={{ textAlign: 'center' }} key={e.id} >{e.name} - {e.episode}</li>
                )
              }
            </ul>
          </div>
        }

      </main>

    </div>
  );
}

export default App;
