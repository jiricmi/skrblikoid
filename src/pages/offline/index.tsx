import {Page} from "@/components/ui/MainPage/Page";

const Index = () => {
    return (
        <Page title="Offline">
            <div className="lg:w-full w-screen mx-auto lg:px-10 justify-center">\
                {/*Tato stranka slouzi pro serviceWorker jako fallback*/}
                OFFLINE
            </div>
        </Page>
    )
}

export default Index
