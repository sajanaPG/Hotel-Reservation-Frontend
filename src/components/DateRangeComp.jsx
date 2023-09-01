import { useEffect, useRef, useState } from 'react'
import { DateRange } from 'react-date-range'

import {Form, FloatingLabel } from "react-bootstrap";

import format from 'date-fns/format'
import { addDays } from 'date-fns'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const DateRangeComp = ({updateSelectedDateRange}) => {

    // date state
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 2),
            key: 'selection'
        }
    ])

    // open close
    const [open, setOpen] = useState(false)

    // get the target element to toggle 
    const refOne = useRef(null)

    useEffect(() => {
        // event listeners
        document.addEventListener("keydown", hideOnEscape, true)
        document.addEventListener("click", hideOnClickOutside, true)
    }, [])

    // hide dropdown on ESC press
    const hideOnEscape = (e) => {
        if (e.key === "Escape") {
            setOpen(false)
        }
    }

    // Hide on outside click
    const hideOnClickOutside = (e) => {
        if (refOne.current && !refOne.current.contains(e.target)) {
            setOpen(false)
        }
    }

    // Handle date range
    const handleDateRange = (item) => {
        setRange([item.selection]);
        updateSelectedDateRange([item.selection]);
    }

    return (
        <div className="calendarWrap">

            <FloatingLabel controlId="floatingInput" label="Check in Date - Check out Date" className="mb-3">
                <Form.Control
                    value={`${format(range[0].startDate, "dd/MM/yyyy")} - ${format(range[0].endDate, "dd/MM/yyyy")}`}
                    readOnly
                    onClick={() => setOpen(true)}
                />
            </FloatingLabel>

            <div ref={refOne}>
                {open &&
                    <DateRange
                        //onChange={item => setRange([item.selection])}
                        onChange={item => handleDateRange(item)}
                        editableDateInputs={true}
                        moveRangeOnFirstSelection={false}
                        ranges={range}
                        months={2}
                        direction="horizontal"
                        className="calendarElement"
                    />
                }
            </div>
        </div>
    )
}

export default DateRangeComp