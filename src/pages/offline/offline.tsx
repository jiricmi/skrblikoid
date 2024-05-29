import {Page} from "@/components/ui/MainPage/Page";
import {getBudgets} from "@/components/localStorage/budget";

const Index = () => {
    const budgets = getBudgets();
    return (
        <Page title="Offline">
            <div className="lg:w-full w-screen mx-auto lg:px-10 justify-center">
                OFFLINE
            </div>
        </Page>
    )
}

export default Index
