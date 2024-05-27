'use client';
import {NextRouter, useRouter} from "next/router";
import {getBudgetByKey} from "@/components/localStorage/budget";
import {Page} from "@/components/ui/MainPage/Page";


const Budget = () => {
    const router: NextRouter & {query: {budget ?: string}} = useRouter();
    return (
        <Page title={`Budget - ${getBudgetByKey(parseInt(router.query.budget as string))?.name}`}>
        </Page>
    );
}

export default Budget;