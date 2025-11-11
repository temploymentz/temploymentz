import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const Accord = ({ data, index }) => {
    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem
                value="item-1"
                className="border rounded-2xl p-6 mb-4 hover:bg-gray-50 transition-colors"
            >
                <AccordionTrigger className="flex items-center gap-7 w-full">
                    <span className="text-orange-500 text-3xl">{index + 1}</span>
                    <div className="flex-1 text-left">
                        <h3 className="text-2xl font-semibold mb-2">{data.title}</h3>
                        <p className="text-gray-600 font-normal text-xl pr-8">
                            {data.desc}
                        </p>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="flex-1 text-left">
                        <h3 className="text-2xl font-semibold mb-2">{data.title}</h3>
                        <p className="text-gray-600 font-normal text-xl pr-8">
                            {data.desc}
                        </p>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default Accord