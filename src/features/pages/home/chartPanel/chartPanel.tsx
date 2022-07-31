import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Card from '@mui/material/Card';
import { Line } from "react-chartjs-2";

import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { stockPrices } from '../searchAccordion/searchAccordionSlice';
import { filterValue, chartDataMap, onFilterChange, selectedFilterOption } from './chartPanelDataSlice';
import { fromDate, toDate } from '../dateSelector/dateSelectorSlice';
import './chartPanel.css';


const ChartPanel = () => {

    const dispatch = useAppDispatch();

    const stockPricesData = useAppSelector(stockPrices);

    const fromDt = useAppSelector(fromDate);

    const toDt = useAppSelector(toDate);

    const filterby = useAppSelector(filterValue);

    const chartData = useAppSelector(chartDataMap);

    const onFilterOptionChange = (option: string) => {
        dispatch(selectedFilterOption(option.charAt(0).toLocaleLowerCase()));
    }

    const wrapper = () => {
        if (stockPricesData.length > 0) {
            const noDataCount = stockPricesData.reduce((prevValue: number, currValue: any) => {
                if (currValue.s === 'no_data') {
                    prevValue += 1;
                }

                return prevValue;
            }, 0)
            if (noDataCount === stockPricesData.length) {
                return (
                    <Card sx={{ margin: "10px 0", padding: "0 10px" }}>
                        <h5>No data to display for seleted date and time.</h5>
                    </Card>
                )
            } else {
                return (
                    <Card sx={{ margin: "10px 0", padding: "0 10px" }}>
                        <div>
                            <h4 className='chartHeaderLabel'> Stock Price Report </h4>
                            <span className='chartFilterPanel'>
                                <SplitButton onFilterOptionChange={(option: string) => onFilterOptionChange(option)} />
                            </span>
                        </div>
                        <hr />
                        <div>
                            <Line options={chartData.options} data={chartData.data} />
                        </div>
                    </Card>
                )
            }
        }
        return;
    }

    useEffect(() => {
        const params: any = { filteredBy: filterby, fromToDate: { fromDt, toDt }, stockPricesData };
        dispatch(onFilterChange(params));
    }, [filterby, stockPricesData])

    return (
        <>
            {wrapper()}
        </>
    );
}

export default ChartPanel;

const options = ['Close Prices', 'High Prices', 'Low Prices', 'Open Prices',];

const SplitButton = (props: any) => {
    const [open, setOpen] = React.useState(false);

    const anchorRef = React.useRef<HTMLDivElement>(null);

    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleMenuItemClick = (
        index: number,
        option: string
    ) => {
        setSelectedIndex(index);
        setOpen(false);
        props.onFilterOptionChange(option);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    return (
        <React.Fragment>
            <ButtonGroup variant="outlined" ref={anchorRef} aria-label="split button">
                <Button onClick={handleToggle}>{options[selectedIndex]}</Button>
                <Button
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                >
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    {options.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            selected={index === selectedIndex}
                                            onClick={() => handleMenuItemClick(index, option)}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    );
}