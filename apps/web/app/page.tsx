// import Jumbotron from "./components/Jumbotron-beta";

import Footer from "./components/section/footer/Footer";
import Jumbotron from "./components/section/jumbotron/jumbotron";
import NavigationBar from "./components/section/navigation/NavBar";
import PopularEvent from "./components/section/popular-event-overview/popular-event";
import ProductCategoryList from "./components/section/product-category-lists/product-category-lists";

export default function Page() {
    return (
        <>
            <NavigationBar />
            <Jumbotron />
            <PopularEvent />
            <ProductCategoryList />
            <Footer />
        </>
    );
}
