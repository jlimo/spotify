import { useState, useEffect } from 'react'
import useAuth from './useAuth';
import { Container, Form } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyWebApi = new SpotifyWebApi ({
    clientId: '162a5fdfd17f4bce92ffe132f4aecdec',
})

export default function Dashboard({ code }) {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
// setting spotify api to use access token for all queries and if no access token to return
    useEffect(() => {
        if(!accessToken) return
        spotifyWebApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
    if (!search) return setSearchResults([])
    if(!accessToken) return

    let cancel = false
    spotifyWebApi.searchTracks(search).then(res => {
        if (cancel) return
        setSearchResults(res.body.tracks.items.map(track => {
            const smallestAlubmImage = track.album.images.reduce(
                (smallest, image) => {
                    if (image.height < smallest.height) return image 
                    return smallest
                }, track.album.images[0])

            return {
                artist: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                genre: track.genre,
                albumUrl: smallestAlubmImage.url
            }
        })
        )
    }) 
        return () => cancel = true
    }, [search, accessToken])

  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
        <Form.Control type="search" placeholder="Search Songs/Artists" value={search} onChange={e => setSearch(e.target.value)} />
        <div className=" flex-grow-1" style={{ overflowY: "auto" }}> Songs </div>
        <div>Bottom</div> 
        </Container>
  )
}
