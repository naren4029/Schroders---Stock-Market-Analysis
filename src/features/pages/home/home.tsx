import SearchAccordion from "./searchAccordion/searchAccordion";
import ChartPanel from "./chartPanel/chartPanel";

const Home = () => {
    return (
        <div className="page-container">
            <SearchAccordion />
            <ChartPanel />
        </div>
    )
};

export default Home;