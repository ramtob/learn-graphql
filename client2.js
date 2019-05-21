function do_request() {
    fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({query: "{ hello }"})
    })
        .then(r => r.json())
        .then(data => console.log('data retured:', data))
        .catch((err) => console.warn(err))
}
