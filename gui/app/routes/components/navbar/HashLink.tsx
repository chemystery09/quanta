import { Link } from "react-router";
import { SelectedPage } from "../../shared/types.ts";

type Props = {
    page: string;
    selectedPage: SelectedPage;
    setSelectedPage: (value: SelectedPage)=> void;
}

export default function HashLink({
    page,
    selectedPage,
    setSelectedPage,
}: Props) {
    const lowerCasePage = page.toLowerCase().replace(/ /g, "") as SelectedPage;
    return (
        <Link className={`${selectedPage === lowerCasePage} ? "text-purple-500" : ""
            transition duration-500 hover: text-black-500
            `}
            to={`#${lowerCasePage}`} 
            onClick={() => setSelectedPage(lowerCasePage)}>
            {page}
        </Link>
    );
}
