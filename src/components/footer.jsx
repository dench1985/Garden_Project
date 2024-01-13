import WatsupSvg from "../images/watsup.svg";
import InstaIconSvg from "../images/insta.svg";

export default function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="left">
                    <div className="kontackt">Contact</div>
                    <div className="phone">+49 999 999 99 99</div>
                    <div className="social-netrwork">
                        <div className="social-netrwork-item">
                            <img className="item-inst" src={InstaIconSvg} alt="" />
                            <p className="item-instag">instagram</p>
                        </div>
                        <div className="social-netrwork-item">
                            <img src={WatsupSvg} alt="" />
                            <p className="item-whatsapp">WhatsApp</p>
                        </div>
                    </div>
                </div>
                <div className="rigth">
                    <div className="adress">Address</div>
                    <div className="city">
                        <a href="https://www.google.com/search?q=telranDE">
                            Linkstraße 2, 8 OG, 10785,
                            <p>Berlin, Deutschland</p>
                        </a>
                    </div>
                    <div className="work-regim">
                        Working Hours:
                        <p className="work-regim2">24 hours a day</p>
                    </div>
                </div>
            </div>

            <div className="map">
                <iframe
                    title="map"
                    width="100%"
                    height="500"
                    src="https://maps.google.com/maps?width=100%25&amp;height=300&amp;hl=en&amp;q=Stacijas laukums 4, Kfc, USA&amp;t=&amp;z=20&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                ></iframe>
            </div>
        </footer>
    );
}
