"use client"
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import GetUser from './getUser';
import { useEffect, useState } from 'react';
import { InformationIcon } from '@/components/SVGIcon';

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
        <div>
            <div className="flex flex-col sm:flex-row justify-center items-center mb-4  pb-6 p-12 pt-24">
                <div className="flex flex-col items-center space-y-3 mb-6">
                    <h1 className="font-bold text-6xl text-medical-dark/90">Drug List</h1>
                    <h2>Search through drugs from your list here</h2>
                </div>
            </div>

            <div className="flex justify-center mb-12 space-x-2">
                <SearchBar
                    placeholder="Search drugs..."
                    value={searchTerm}
                    onChange={handleSearch}
                />

            </div>
            <ul className="pl-4 flex flex-col items-center">
                {drugs.map((drug) => (
                    <li key={drug.uid} className="mb-4 p-4 border border-gray-300 rounded-lg bg-medical-light w-3/4">
                        <div className={`${loading ? "hidden" : "visible"}`}>
                            <div className="flex gap-x-2">
                                <h2 className="text-xl font-semibold">{drug.name}</h2>
                                <Link href={`/list/${drug.drugID}`} className="self-center">
                                    <div className={`${loading ? "hidden" : "visible"}`}><InformationIcon /></div>
                                </Link>
                            </div>

                            <p className="text-gray-600">{drug.description}</p>
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