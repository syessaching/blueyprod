import React from 'react'


function Nav({ currentView, setCurrentView}) {
    return (
        <nav className='nav'>
            <button
                onClick={() => setCurrentView('cards')} 
                className={currentView== 'cards'? 'active' : ''}
            >
                Home
            </button>
            <button
                onClick={() => setCurrentView('form')}
                className={currentView== 'form' ? 'active' : ''}
            >
                Add Card
            </button>
        </nav>
    )
}

export default Nav