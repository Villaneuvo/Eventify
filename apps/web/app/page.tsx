// import Jumbotron from "./components/Jumbotron-beta";

import Footer from "./components/section/footer/Footer";
import Jumbotron from "./components/section/jumbotron/jumbotron";
import NavigationBar from "./components/section/navigation/NavBar";
import PopularEvent from "./components/section/popular-event-overview/popular-event";
import ProductList from "./components/section/product-lists/product-lists";

export default function Page() {
    return (
        <>
            <NavigationBar />
            <Jumbotron />
            <PopularEvent />
            <ProductList />
            <Footer />
        </>
    );
}
