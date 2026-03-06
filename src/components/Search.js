import { useState } from "react";
import { Song } from "./Song";

export function Search() {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleSearch = () => {
        const encoded = encodeURIComponent(query.trim());
        const url = `https://itunes.apple.com/search?term=${encoded}&entity=song&limit=50`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setResult(data.results || []);
                setCurrentPage(1);
            });
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedResults = result.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(result.length / itemsPerPage);

    return (
        <div>
            <input
                type="search"
                className="search"
                value={query}
                placeholder="Поиск"
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSearch() }}
            />
            <div><button className="btn" onClick={handleSearch}>Найти</button></div>

            {totalPages > 1 && (
                <div>
                    <button
                        className="btn"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Назад
                    </button>

                    <span style={{ margin: '0 10px' }}>
                        Страница {currentPage} из {totalPages}
                    </span>

                    <button
                        className="btn"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Вперёд
                    </button>
                </div>
            )}

            <div className="list">
                {paginatedResults.length ? (
                    paginatedResults.map(item => (
                        <Song key={item.trackID} {...item} />
                    ))
                ) : (
                    <h4>Nothing Found</h4>
                )}
            </div>
        </div>
    );
}
