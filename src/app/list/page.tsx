"use client"

import { FC, useState } from 'react';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import { Button } from "@/components/ui/button";

const ListDrugsPage: FC = () => {
    // Initial list of drugs
    const initialDrugs = [
        {
            id: 1,
            name: 'Drug 1',
            description: 'Description of Drug 1',
        },
        {
            id: 2,
            name: 'Drug 2',
            description: 'Description of Drug 2',
        },
        {
            id: 3,
            name: 'Drug 3',
            description: 'Description of Drug 3',
        },
        {
            id: 4,
            name: 'Drug 4',
            description: 'Description of Drug 4',
        },
        {
            id: 5,
            name: 'Drug 5',
            description: 'Description of Drug 5',
        },
        {
            id: 6,
            name: 'Drug 6',
            description: 'Description of Drug 6',
        }
    ];

    const [drugs, setDrugs] = useState(initialDrugs);
    const [searchTerm, setSearchTerm] = useState('');

    // Function to handle search
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        // Filter drugs based on the search term
        const filteredDrugs = initialDrugs.filter((drug) =>
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
                <Button variant="medical" size="icon">
                    <Link href='/add' className="flex flex-col justify-center items-center">
                        <span className="bg-white h-0.5 w-5 rounded-sm translate-y-[0.2rem] p-0.5"></span>
                        <span className="bg-white h-0.5 w-5 rounded-sm rotate-90  p-0.5"></span>
                    </Link>
                </Button>
            </div>
            <ul className="pl-4">
                {drugs.map((drug) => (
                    <li key={drug.id} className="mb-4 p-4 border border-gray-300 rounded-lg">
                        <h2 className="text-xl font-semibold">{drug.name}</h2>
                        <p className="text-gray-600">{drug.description}</p>
                        <Link href="/info">
                            <span className="text-blue-600 hover:underline">See Details</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListDrugsPage;