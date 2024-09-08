import { Link } from "react-router-dom";

interface HeaderProps {
    headingText: string;
    buttonText: string;
    buttonIcon?: string;
    redirectRoute: string;
}

const PageHeader = ({
    headingText,
    buttonText,
    buttonIcon,
    redirectRoute,
}: HeaderProps) => {
    return (
        <div className="flex-between">
            <h1 className="text-2xl font-bold">{headingText}</h1>

            <Link
                to={redirectRoute}
                className="bg-blue-1 flex gap-2 p-2 rounded-md max-sm:rounded-full"
            >
                {buttonIcon && (
                    <img
                        src={buttonIcon}
                        alt="new notice"
                        width={20}
                        height={20}
                    />
                )}
                <p className="text-lg max-sm:hidden">{buttonText}</p>
            </Link>
        </div>
    );
};

export default PageHeader;
