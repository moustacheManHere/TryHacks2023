"use client"
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import GetUser from './getUser';
import { useEffect, useState } from 'react';

interface drugList {
    uid: string;
    drugID: string;
    name: string;
    description: string;
}


function ListDrugsPage() {
    // Initial list of drugs
    const initialDrugs: drugList[] = [
        {
            uid: "",
            drugID: "",
            name: '',
            description: '',
        }
    ];
    const [drugs, setDrugs] = useState(initialDrugs);
    const [drugs2, setDrugs2] = useState(initialDrugs);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const smokeDrugs = async () => {
            setLoading(true);
            const freshCocaine: 0 | drugList[] | null = await GetUser()
            if (freshCocaine == 0 || freshCocaine == null) {
                return null
            }
            setDrugs(freshCocaine)
            setDrugs2(freshCocaine)
            setLoading(false);
        }
        smokeDrugs()
    }, [])



    // Function to handle search
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        // Filter drugs based on the search term
        const filteredDrugs = drugs2.filter((drug) =>
            drug.name.toLowerCase().includes(term)
        );

        setDrugs(filteredDrugs);
    };

    return (
        <div className="p-8">
            <div className="flex flex-col sm:flex-row justify-center items-center mb-4  p-12">
                <h1 className="text-3xl font-semibold mb-2 sm:mb-0">Drug List</h1>

            </div>
            <div className="flex justify-center mb-12 space-x-2">
                <SearchBar
                    placeholder="Search drugs..."
                    value={searchTerm}
                    onChange={handleSearch}
                />

            </div>
            <ul className="pl-4">
                {drugs.map((drug) => (
                    <li key={drug.uid} className="mb-4 p-4 border border-gray-300 rounded-lg">
                        <div className={`${loading ? "hidden" : "visible"}`}>
                            <h2 className="text-xl font-semibold">{drug.name}</h2>
                            <p className="text-gray-600">{drug.description}</p>
                            <Link href={`/info/${drug.drugID}`}>
                                <span className={`text-blue-600 hover:underline ${loading ? "hidden" : "visible"}`}>See Details</span>
                            </Link>
                        </div>
                        <div className={`${loading ? "visible" : "hidden"}`}>
                            <div>Loading...</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListDrugsPage;