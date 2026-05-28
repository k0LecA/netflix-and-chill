import { useState,useEffect } from "react";

export interface Genre {
    id: number;
    name: string;
}

export function useGenres() {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/genres')
            .then((res) => res.json())
            .then((data) => {
                setGenres(data);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, []);

    return { genres, isLoading };
}