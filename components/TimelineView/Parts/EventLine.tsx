import React from "react";


/**
 * The markup Information for an event Line. You can stack multiple lines on top of eachother
 *
 * @param  {object} props The props from parent, styling and positioning
 */

export interface EventLineProps {
  left: number;
  width: number;
  backgroundColor: string;
}
const EventLine: React.FC<EventLineProps> = ({left, width, backgroundColor}) => (<span
  aria-hidden='true'
  className='timeline-eventline'
  style={{
    transition: "left 0.2s ease-in-out, width 0.2s ease-in-out",
    position: 'absolute',
    left: `${left}px`,
    top: 0,
    height: '100%',
    width: `${width}px`,
    transformOrigin: 'left center',
    backgroundColor
  }}
/>)

;

//
// EventLine.propTypes = {
//   // Location and dimension
//   left: PropTypes.number,
//   width: PropTypes.number,
//   // how the filling motion will look like when in action
//   fillingMotion: PropTypes.shape({
//     stiffness: PropTypes.number,
//     damping: PropTypes.number,
//   }),
//   // What color the line should have
//   backgroundColor: PropTypes.string,
// }


export default EventLine;
