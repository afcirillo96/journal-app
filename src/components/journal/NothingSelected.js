import React from 'react'

export const NothingSelected = () => {
    return (
        <div className="nothing__main-content background-nothing">
            <p>
                Select Something...
                <br />
                or 
                <br />
                Create an Entry!
            </p>

            {/*<i className="far fa-star fa-4x mt-5"></i>*/}

            <img
                src="https://static.wikia.nocookie.net/darksouls/images/8/89/Item_Humanity.png"
                alt="image"
                width="100" height="100"
            />

        </div>
    )
}
