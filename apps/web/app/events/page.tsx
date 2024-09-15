import ProductList from "../components/product-list";
import Footer from "../components/section/footer/Footer";
import NavigationBar from "../components/section/navigation/NavBar";

export default function Page() {
    return (
        <>
            <NavigationBar />
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <ProductList limitDefault={4} category="" />
            </div>
            <Footer />
        </>
    );
}
