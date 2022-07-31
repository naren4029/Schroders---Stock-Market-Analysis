import DateSelectorSliceReducer, { DateSelector, onFromDateChange, onToDateChange, setDateErrorMessage } from './dateSelectorSlice';

describe("Date Selector Slice Reducer", () => {
    const initialState: DateSelector = {
        fromDate: 0,
        toDate: 0,
        minToDate: -19800000,
        maxFromDate: 4102424940000,
        dateErrorMessage: ''
    };

    it("should handle initial state", () => {
        expect(
            DateSelectorSliceReducer(undefined, { type: "unknown" }),
        ).toEqual({
            fromDate: 0,
            toDate: 0,
            minToDate: -19800000,
            maxFromDate: 4102424940000,
            dateErrorMessage: ''
        });
    });

    it('should handle on From Date Change', () => {
        const param = new Date().getTime();
        const actual = DateSelectorSliceReducer(initialState, onFromDateChange(param));
        expect(actual.fromDate).toEqual(param);
        expect(actual.minToDate).toEqual(param);
    });

    it('should handle set Date Error Message', () => {
        const param = 'InvalidDate';
        const actual = DateSelectorSliceReducer(initialState, setDateErrorMessage(param));
        expect(actual.dateErrorMessage).toEqual(param);
    });

    it('should handle on To Date Change', () => {
        const param = new Date().getTime();
        const actual = DateSelectorSliceReducer(initialState, onToDateChange(param));
        expect(actual.toDate).toEqual(param);
        expect(actual.maxFromDate).toEqual(param);
    });
})