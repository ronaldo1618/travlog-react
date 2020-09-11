import React from 'react';

// tomorrows to do list
// conditional rendering for itinerary card
// add to itinerary can be handled seperately. Direct them to the proper form depending on which they choose
// handle delete, edit functionality conditonally
//   - before edit or delete will need to decide which activity it is since they have the same id

export default function ItineraryCard(props) {
    return (
        <>
            <p>{props.activity.datetime}</p>
        </>
    )
}