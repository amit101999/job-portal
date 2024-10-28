import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'

const category = ["frontend", "backend", "datascience", "pull stack", "video editor"]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query))
        navigate("/browse")
    }
    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-2">
                <CarouselContent>
                    {category.map((cat, index) => {
                        return (
                            <CarouselItem className="md:basis:1/2 lg:basis-1/3" key={index}>
                                <Button onClick={() => searchJobHandler(cat)}
                                    className=" rounded-full" variant="outline" >{cat}</Button>
                            </CarouselItem>
                        )
                    })}

                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div >
    )
}

export default CategoryCarousel