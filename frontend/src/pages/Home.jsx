import React from 'react'

export const Home = () => {
return (
    <div>
        <Appbar />
        <div className='m-8'>
            <Balance value={"10,000"} />
            <Users />
        </div>
    </div>
)
}
