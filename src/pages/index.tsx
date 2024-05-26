import {Page} from "@/components/ui/MainPage/Page";
import {BudgetPage} from "@/components/ui/BudgetPage/BudgetPage";

const Index = () => {
    return (
        <Page title="Dashboard">
            <BudgetPage />
        </Page>
    )
}

export default Index