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

async function loadData(){
    try {
        let userData = await logUserIn()
        console.log('User details', userData)
        let videos = await fetchVideosForUser(userData)
        console.log('Videos', videos)
        let videoDtl = await fetchVideoDetails(videos[0])
        console.log('Video detail', videoDtl)
    } catch (error) {
        throw error
    }
}

loadData()