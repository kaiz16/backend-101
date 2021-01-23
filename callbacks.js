function logUserIn(callback, errorCallback){
    const data = {
        user: 'foo',
        id: 'bar'
    }
    if ( data.id == 'bar'){
        callback(data)
    }else{
        errorCallback('Error while logging user in')
    }
}

function fetchVideosForUser(userData, callback, errorCallback){
    if (userData.user !== 'foo'){
        errorCallback('Error while fetching videos')
    }else{
        let videos = ['Video 1', 'Video 2', 'Video 3']
        callback(videos)
    }
}

function fetchVideoDetails(video, callback, errorCallback){
    if (video == 'Video 1'){
        let details = {
            name: 'Video 1',
            date: (new Date).toISOString()
        }
        callback(details)
    }else{
        errorCallback('Error while fetching a video details')
    }
}

// callback hell
logUserIn( (userData) => { 
    console.log('User details', userData)
    fetchVideosForUser(userData, (videos) => {
        console.log('Videos', videos)
        fetchVideoDetails(videos[0], (videoDetails) => {
            console.log('Video detail', videoDetails)
        })
    }, (error) => {
        console.log(error)
    })
}, (error) => {
    console.log(error)
})