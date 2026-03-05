
export function Song({ trackID, artistName, collectionName, trackName, artworkUrl100, releaseDate, primaryGenreName }) {
    return (
        <div className="card">
            <img src={artworkUrl100} alt={trackID}></img>
            <h3>{trackName} - {artistName}</h3>
            <h4>Альбом: {collectionName}</h4>
            <h4>Жанр: {primaryGenreName}</h4>
            <h5>Дата релиза: {releaseDate}</h5>
        </div>
    )
}