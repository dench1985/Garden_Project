import Footer from "../components/footer";
import Header from "../components/header";
import Image_404 from "../images/NotFound.svg";

export default function NotFound() {
    return (
        <>
          
    <Header classs={"small"}/>
    <main >
    <section className ="error">
        <img src={Image_404} alt=""/>
    </section>
    </main>
    <Footer/>
 
        </>
    );
}
