"use client"

import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { useRouter } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import { useDebounceValue } from 'usehooks-ts'
import qs from 'query-string';

export const SearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useState("");
    const debouncedValue: any = useDebounceValue(value, 500);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: "/diary",
            query: {
                search: debouncedValue,
            },
        }, { skipEmptyString: true, skipNull: true});

        router.push(url);
    }, [debouncedValue, router])

    return (
        <div className="flex items-center">
            <div className="w-full relative mt-2 mb-2">
                <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4"/>
                <Input className="w-full pl-9 bg-black/15 border-none rounded-lg" placeholder="검색" onChange={handleChange} value={value}/>
            </div>
        </div>
    )
}