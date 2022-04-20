import React from 'react';

import TimelineDot from './TimelineDot';

/**
 * The markup Information for all the events on the horizontal timeline.
 *
 */
const Events: React.FC<{events: TimelineEvent[], selectedIndex?: number, styles?: object, handleDateClick?: (index: number)=>any, labelWidth: number}> = ({ events, selectedIndex, styles, handleDateClick, labelWidth }) => (
  <ol
    className='events-bar'
    style={{
      listStyle: 'none'
    }}
  >
    {events.map((event, index) =>
      <TimelineDot
        distanceFromOrigin={event.distance}
        label={event.label}
        date={event.date}
        index={index}
        key={index}
        onClick={handleDateClick}
        selected={selectedIndex}
        styles={styles}
        labelWidth={labelWidth}
      />
    )}
  </ol>
);
export interface TimelineEvent {
  distance: number;
  label: string;
  date: string;
}
/**
 * The styles that parent will provide
 * @type {Object}
 */
// EventsBar.propTypes = {
//   // Array containing the events
//   events: PropTypes.arrayOf(PropTypes.shape({
//     distance: PropTypes.number.isRequired,
//     label: PropTypes.string.isRequired,
//     date: PropTypes.string.isRequired,
//   })).isRequired,
//   // The index of the selected event
//   selectedIndex: PropTypes.number,
//   // a handler for clicks on a datapoint
//   handleDateClick: PropTypes.func,
//   // The width you want the labels to be
//   labelWidth: PropTypes.number.isRequired,
//   // Custom styling
//   styles: PropTypes.object,
// }


export default Events;