import React from 'react'
import TeamBox from './TeamBox'
import { style } from '@/styles'
import { teamData } from '@/data'

const TeamComponent = () => {
    return (
        <div className='py-20 w-[80%] mx-auto flex flex-col justify-center min-h-[95vh] items-center'>
            <div className='text-center'>
                <h1 className={`${style.minHeader.fontSize} ${style.minHeader.lineHeight} ${style.minHeader.fontWeight}`}>Our Leadership Team</h1>
            </div>
            <div className='flex justify-between w-full py-10'>
                {
                    teamData.map((member, index) => (
                        <TeamBox key={index} data={member} />
                    ))
                }
            </div>
        </div>
    )
}

export default TeamComponent