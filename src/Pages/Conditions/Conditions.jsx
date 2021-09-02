import { useRouteMatch } from "react-router";
import { Breadcrum } from "../../Components/Breadcrum/Breadcrum";
import { ProductNav } from "../../Components/ProductNav/ProductNav";

import Style from './Conditions.module.scss';

const Conditions = () => {
    const {url} = useRouteMatch();
    const passedBReadcrum = url.replace('/', '');

    return (
        <main className={`content_container`}>
            <Breadcrum route={passedBReadcrum} />
            <ProductNav />
            <section className={Style.conditions}>
                <header><h1>Handelsbetingelser</h1></header>
                <h2>Betaling</h2>
                <p>
                    Strings-Online modtager betaling med Dankort/VISA-Dankort, VISA, VISA Electron, Mastercard og JCB. Betaling vil først blive trukket på din konto, når varen afsendes. <br />
                    Alle beløb er i DKK. Danske kroner og er incl. moms. <br />
                    Strings-Online bruger en godkendt betalingsserver, der krypterer alle dine kortoplysninger med SSL (Secure Socket Layer) protokol. Det betyder, at man ikke kan aflæse dine informationer. <br />
                </p>

                <h2>Levering</h2>
                <p>
                    Strings-Online leverer på alle hverdage, med ordre indgået inden kl. 12.00
                </p>

                <h2>Reklamationsret</h2>
                <p>
                    Der gives 2 års reklamationsret i henhold til købeloven. Vores reklamationsret gælder for fejl i materiale og/eller fabrikation.<br />
                    Reklamationen gælder ikke fejl eller skader begået ved forkert betjening af produktet / ydelsen.<br />
                    Strings-Online vil dække returneringsomkostninger i et rimeligt omfang.<br /><br />

                    Ved returnering rettes henvendelse til og reklamationer sendes til:<br /><br />

                    Strings-Online<br />
                    ADRESSEVEJ 4<br />
                    9999 BYNAVN<br /><br />

                    Der modtages ikke pakker sendt på efterkrav.
                </p>

                <h2>Refusion</h2>
                <p>
                    Hvis der er aftalt refusion, så bedes I sende jeres bankoplysninger, så vi kan overføre det aftalte beløb.
                </p>

                <h2>Fortrydelsesret</h2>
                <p>
                    Der gives 14 dages fuld returret på varer købt i vores Webshop.<br />
                    Perioden regnes fra den dag, hvor du modtager ordren.<br /><br />

                    Returneringsomkostninger skal du selv afholde.<br /><br />

                    Fortrydelse skal anmeldes til os senest 14 efter købet og fra fortrydelsen skal I senest 14 dage efter returnere forsendelsen.<br /><br />

                    Meddelelsen skal gives pr. mail på info@domæne.dk. I meddelelsen skal du gøre os tydeligt opmærksom på, at du ønsker at udnytte din fortrydelsesret. Du kan også vælge at benytte vores standard fortrydelsesformular og sende med retur. Den finder du her "link her"<br /><br />

                    Varens stand, når du sender den retur<br />
                    Du hæfter kun for eventuel forringelse af varens værdi, som skyldes anden håndtering, end hvad der er nødvendigt for at fastslå varens art, egenskaber og den måde, den fungerer på. Med andre ord – du kan prøve varen på samme måde, som hvis du prøvede den i en fysisk butik.<br /><br />

                    Hvis varen er prøvet udover, hvad der er beskrevet ovenfor, betragter vi den som brugt, hvilket betyder, at du ved fortrydelse af købet kun får en del eller intet af købsbeløbet retur, afhængig af varens handelsmæssige værdi.<br /><br />

                    For at modtage hele købsbeløbet retur må du altså gøre det samme, som man kan i en fysisk butik. Du må afprøve varen, men ikke tage den i egentlig brug.
                </p>
            </section>
        </main>
    )
}

export {Conditions};