import { useState } from 'react';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
    onSearchInput: (searchInput: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchInput }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        const delay = setTimeout(() => {
            onSearchInput(e.target.value)
        }, 200);

        return () => clearTimeout(delay);
    };
    return (
        <div className={styles.searchBar}>
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder="Поиск..."
                className={styles.input}
            />
        </div>
    );
};

export default SearchBar;