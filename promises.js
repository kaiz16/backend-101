function logUserIn(){
    return new Promise( (ok, error ) => {
        const data = {
            user: 'foo',
            id: 'bar'
        }
        if ( data.id == 'bar'){
            ok(data)
        }else{
            error('Error while logging user in')
        }
    })
}

function fetchVideosForUser(userData){
    return new Promise( (resolve, reject) => {
        if (userData.user !== 'foo'){
            reject('Error while fetching videos')
        }else{
            let videos = ['Video 1', 'Video 2', 'Video 3']
            resolve(videos)
        }
    })
}

function fetchVideoDetails(video){
    return new Promise( (resolve, reject) => {
        if (video == 'Video 1'){
            let details = {
                name: 'Video 1',
                date: (new Date).toISOString()
            }
            resolve(details)
        }else{
            reject('Error while fetching a video details')
        }
    })
}

// promise hell

logUserIn().then((userData) => {
    console.log('User details', userData)
    fetchVideosForUser(userData).then( ( videos ) => {
        console.log('Videos', videos)
        fetchVideoDetails(videos[0]).then( ( videoDetails ) => {
            console.log('Video detail', videoDetails)
        }).catch( (error) => {
            console.log(error)
        })
    }).catch( (error) => {
        console.log(error)
    })
}).catch((error) => {
    console.log(error)
})