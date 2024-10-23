import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'

const category = ["frontend", "backend", "datascience", "pull stack", "video editor"]

const CategoryCarousel = () => {
    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-2">
                <CarouselContent>
                    {category.map((cat, index) => {
                        return (
                            <CarouselItem className="md:basis:1/2 lg:basis-1/3">
                                <Button className=" rounded-full" variant="outline" >{cat}</Button>
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