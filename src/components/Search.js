import { useState } from "react";
import { Song } from "./Song";

export function Search() {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]);

    const handleSearch = () => {
        const encoded = encodeURIComponent(query.trim());
        const url = `https://itunes.apple.com/search?term=${encoded}&entity=song&limit=50`;
        fetch(url).then(response => response.json()).then(data => setResult(data.results || []));
    };

    return (
        <div>
            <input type="search"
                className="search"
                value={query}
                placeholder="Поиск"
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSearch() }} />
            <div><button className="btn">Найти</button></div>
            <div className="list">
                {
                    result.length ? result.map(item => {
                        return <Song key={item.trackID} {...item} />
                    }) : <h4>Nothing Found</h4>
                }
            </div>
        </div>
    )
}