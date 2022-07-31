import React from 'react';

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import SearchIcon from '@mui/icons-material/Search';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Snackbar from '@mui/material/Snackbar';
import Slide, { SlideProps } from '@mui/material/Slide';
import Tooltip from '@mui/material/Tooltip';

import StockSelector from '../stockSelector/stockSelector';
import DateSelector from '../dateSelector/dateSelector';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { fetchPricesAsync } from './searchAccordionSlice';
import { selectedStockSymbols } from '../stockSelector/stockSelectorSlice';
import { fromDate, toDate, dateErrorMessage } from '../dateSelector/dateSelectorSlice';
import { getAPIKey } from "../../../../services/configManager";
import { loading } from './searchAccordionSlice';
import { formatDate } from '../../../../services/lineChartRegistry';

import './searchAccordion.css';

/** MUI Config -- Start **/

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (

    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', color: '#fff' }} />}
        {...props}
    />

))(({ theme }) => ({

    backgroundColor: '#002a5e',
    color: '#14e6f1',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },

}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({

    padding: theme.spacing(1),

    borderTop: '1px solid rgba(0, 0, 0, .125)',

}));

/** MUI Config -- End **/

const SearchAccordion = () => {

    const dispatch = useAppDispatch();

    const isLoading = useAppSelector(loading);

    const stockSymbolsSelected = useAppSelector(selectedStockSymbols);

    const dateErrMsg = useAppSelector(dateErrorMessage);

    const fromDt = useAppSelector(fromDate);

    const toDt = useAppSelector(toDate);

    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const [open, setOpen] = React.useState(false);

    type TransitionProps = Omit<SlideProps, 'direction'>;

    const [transition, setTransition] = React.useState<React.ComponentType<TransitionProps> | undefined>(undefined);

    const transitionToLeft = (props: TransitionProps) => {
        return <Slide {...props} direction="left" />;
    }

    const openNotification = (Transition: React.ComponentType<TransitionProps>) => () => {
        setTransition(() => Transition);
        setOpen(true);
    };

    const closeNotification = () => {
        setOpen(false);
    };

    const toggleAccordionPanel =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    const collapsedFilterLabel = () => {
        if (stockSymbolsSelected.length > 0 && fromDt !== 0 && toDt !== 0 && !expanded) {
            const filterContent: any = {
                stocknames: 'Stock Name(s):' + stockSymbolsSelected.map((obj) => obj.symbol).join(', '),
                fmDt: 'From Date:' + formatDate(fromDt),
                toDt: 'To Date:' + formatDate(toDt)
            }
            return (
                <span className='filterContainer'>
                    <label > Filtered By:</label>
                    <Tooltip title={filterContent.stocknames}>
                        <span className='filterContent'>
                            {filterContent.stocknames}
                        </span>
                    </Tooltip>
                    <Tooltip title={filterContent.fmDt}>
                        <span className='filterContent'>
                            {filterContent.fmDt}
                        </span>
                    </Tooltip>
                    <Tooltip title={filterContent.toDt}>
                        <span className='filterContent'>
                            {filterContent.toDt}
                        </span>
                    </Tooltip>
                </span>
            )
        }
        return
    }

    const onSearch = (notifiactionCallback: any) => {
        const apiKey = getAPIKey();
        let searchCriteria: any[] = stockSymbolsSelected.map((obj: any) => {
            const params = { symbol: obj.symbol, from: fromDt, to: toDt, resolution: 1, token: apiKey };
            return params;
        });

        if (stockSymbolsSelected.length > 0 && fromDt !== 0 && toDt !== 0 && !dateErrMsg) {
            dispatch(fetchPricesAsync(searchCriteria));
            //dispatch(onFilterChange(stockPricesData));
        } else {
            notifiactionCallback();
        }
    }

    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={toggleAccordionPanel('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <SearchIcon />
                    <Typography>Search Stocks Status</Typography>
                    <Typography>{collapsedFilterLabel()}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <StockSelector />
                    <DateSelector label="From Date" />
                    <DateSelector label="To Date" />
                    <hr />
                    <LoadingButton
                        size="large"
                        className='alignButton'
                        color="primary"
                        onClick={() => { onSearch(openNotification(transitionToLeft)); }}
                        loading={isLoading}
                        loadingPosition="start"
                        startIcon={<SearchIcon />}
                        variant="outlined"
                    >
                        Search
                    </LoadingButton>
                </AccordionDetails>
            </Accordion>
            <Snackbar
                open={open}
                sx={{ bottom: '100px !important' }}
                onClose={closeNotification}
                TransitionComponent={transition}
                message={dateErrMsg || "Please fill all fields with valid input for search."}
                key={transition ? transition.name : ''}
            />
        </div>
    );
}

export default SearchAccordion;
