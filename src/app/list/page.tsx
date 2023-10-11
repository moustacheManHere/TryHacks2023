"use client"

import { useState } from 'react';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import { Button } from "@/components/ui/button";
import GetUser from './getUser';
import { useEffect } from 'react';

interface drugList {
    id:string;
    name: string;
    description: string;
}


function ListDrugsPage()  {
    // Initial list of drugs
    //const initialDrugs = GetUser()
    const initialDrugs:drugList[] = [
        {
            id: "",
            name: '',
            description: '',
        }
    ];
    const [drugs, setDrugs] = useState(initialDrugs);
    const [drugs2, setDrugs2] = useState(initialDrugs);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(()=>{
        const smokeDrugs = async () => {
            const freshCocaine:0|drugList[]|null = await GetUser()
            if (freshCocaine==0 || freshCocaine == null){
                return null
            }
            setDrugs(freshCocaine)
            setDrugs2(freshCocaine)
        }
        smokeDrugs()
    },[])
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