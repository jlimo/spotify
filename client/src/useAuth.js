import React from 'react'

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()


    useEffect(() => {
        axios.post('http://localhost3001/login', {
            code,
        }).then(res => {
            console.log(res.data)
        })
    }, [code])
}
