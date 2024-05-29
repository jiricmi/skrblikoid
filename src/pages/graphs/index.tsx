import {Page} from "@/components/ui/MainPage/Page";
import {getBudgets} from "@/components/localStorage/budget";
import {Graph} from "@/components/ui/GraphPage/GraphPage";

const Index = () => {
    const budgets = getBudgets();
    return (
        <Page title="Graphs">
            <div className="lg:w-full w-screen mx-auto lg:px-10 justify-center">
                {budgets.map((budget) => (
                    <Graph key={budget.key} budgetId={budget.key}/>
                ))}
            </div>
        </Page>
    )
}

export default Index
