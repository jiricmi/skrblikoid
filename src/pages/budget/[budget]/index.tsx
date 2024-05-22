import {NextRouter, useRouter} from "next/router";

const Budget = () => {
    const router: NextRouter & {query: {budget ?: string}} = useRouter();
    return <div>{router.query.budget}</div>;
}

export default Budget;